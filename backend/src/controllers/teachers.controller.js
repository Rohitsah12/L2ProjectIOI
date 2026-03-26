




import prisma from "../db/prisma";
import bcrypt from "bcrypt";

// All response messages use "msg" key (standardised; was mixed error/message before).

export const getTeachers = async(req, res) => {
  const collegeId = req.user?.id;
  if(!collegeId) {
    return res.status(401).json({
      msg : "Authentication Failed"
    })
  }

  try {
    // CHANGED: was prisma.teacher.findMany but schema has User model (teachers are User with role TEACHER). Also added id to select for frontend keys/navigation.
    const teachers = await prisma.user.findMany({
      where: { collegeId, role: "TEACHER" },
      select: {
        id: true,
        name: true,
        email: true,
        collegeId: true,
        teacherEnrollmentId: true,
      },
    })
    return res.status(201).json({msg : "Teacher fetched successfully!", teachers})
    
  } catch (error) {
     return res.status(500).json({msg : "Error in fetching teacher"});
    }
}

export const addTeacher = async(req, res) =>  {
  const collegeId = req.user?.id;
  if(!collegeId) {
   return res.status(401).json({
     msg : "Authentication Failed"
   })
 }

  const {name, email, password, teacherEnrollmentId } = req.body;

  if (!name || !email || !password || !teacherEnrollmentId) {
      return res.status(400).json({ msg: 'Name, email, password, and teacherEnrollmentId are required.' });
    }
   try {


    const isExisting = await prisma.user.findFirst({
      where: {
        OR:[
          {teacherEnrollmentId}, 
          {email}
        ]
      }
    })

    if(isExisting) {
            return res.status(409).json({ msg: `Teacher with email ${email} or enrollment ID ${teacherEnrollmentId} already exists.` });


    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        teacherEnrollmentId,
        role: 'TEACHER',
        collegeId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        collegeId: true,
        teacherEnrollmentId: true,
        role: true,
      },
    });
    return res.status(201).json({
      msg: "Teacher created successfully!",
      teacher,
    });
    
  } catch (error) {
     return res.status(500).json({msg : "Error in creating teacher"});
    }
}


export const getTeacherById= async(req, res) => {
  const collegeId = req.user?.id;
  
  if(!collegeId) {
    return res.status(401).json({
      msg : "Authentication Failed"
    })
  }
  const teacherId = req.params.id;

  try {
    const teacher = await prisma.user.findFirst({
      where: { id: teacherId, collegeId, role: "TEACHER" },
      select: {
        id: true,
        name: true,
        email: true,
        teacherEnrollmentId: true,
        collegeId: true,
      },
    });

    if (!teacher) {
      return res.status(404).json({ msg: 'Teacher not found.' });
    }

    const teacherBatch = await prisma.teacherBatch.findMany({
      where: { teacherId },
      select: { batchId: true },
    });
    const batches = teacherBatch.map((tb) => tb.batchId);

    return res.status(200).json({
      msg: "Fetched teacher by id",
      teacher: { ...teacher, batches },
    });


     
  } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Internal server error.' });
    
  }
}


export const updateTeacherById = async (req, res) => {
  try {
    const collegeId = req.user?.id;
    const teacherId = req.params?.id;
    const { name, email, teacherEnrollmentId, batches, password } = req.body;

    // Mistake: no check for missing collegeId/teacherId. Corrected: return 401/400 so auth and params are validated.
    if (!collegeId) {
      return res.status(401).json({ msg: 'College authentication failed.' });
    }
    if (!teacherId) {
      return res.status(400).json({ msg: 'Teacher ID is required.' });
    }

    // Mistake: where: { collegeId, teacherId, role } – User has id, not teacherId; and if(!teacher) was empty. Corrected: where: { id: teacherId, collegeId, role }, and return 404 when not found.
    const teacher = await prisma.user.findFirst({
      where: { id: teacherId, collegeId, role: 'TEACHER' },
      select: { id: true },
    });
    if (!teacher) {
      return res.status(404).json({ msg: 'Teacher not found or access denied.' });
    }

    // Mistake: hashedPassword = bcrypt.hash(password) (no await, no salt); updatedUser.password = updatedPassword (undefined, and User has passwordHash). Corrected: only set fields when provided; use updateData.passwordHash = await bcrypt.hash(password, 10).
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (teacherEnrollmentId !== undefined) updateData.teacherEnrollmentId = teacherEnrollmentId;
    if (password) {
      updateData.passwordHash = await bcrypt.hash(password, 10);
    }

    // Mistake: AND: { ... } (object; Prisma expects array); OR had wrong spread { ...expr }; findMany then if(faultyUpdate) and return with no body. Corrected: AND: [ ... ], OR: [ ...(email !== undefined ? [{ email }] : []), ... ]; findFirst; if(conflictTeacher) return 409 with message.
    if (email !== undefined || teacherEnrollmentId !== undefined) {
      const conflictTeacher = await prisma.user.findFirst({
        where: {
          AND: [
            { id: { not: teacherId } },
            {
              OR: [
                ...(email !== undefined ? [{ email }] : []),
                ...(teacherEnrollmentId !== undefined ? [{ teacherEnrollmentId }] : []),
              ],
            },
          ],
        },
      });
      if (conflictTeacher) {
        return res.status(409).json({ msg: 'Email or teacher enrollment ID already in use by another user.' });
      }
    }

    // Mistake: where: { teacherId } (User PK is id); data: updatedUser (had .password). Corrected: where: { id: teacherId }, data: updateData with valid fields only.
    const updatedTeacher = await prisma.user.update({
      where: { id: teacherId },
      data: updateData,
      select: { id: true, name: true, email: true, role: true, collegeId: true, teacherEnrollmentId: true },
    });

    // Mistake: findFirst({ where: { collegeId } }) gives one batch; batches.map(batch => batch.batchId in allBatch) wrong (batches are IDs; allBatch one object); return res. incomplete. Corrected: findMany({ where: { id: { in: batches }, collegeId } }); validBatches.length !== batches.length then 400.
    if (Array.isArray(batches)) {
      const validBatches = await prisma.batch.findMany({
        where: { id: { in: batches }, collegeId },
        select: { id: true },
      });
      if (validBatches.length !== batches.length) {
        return res.status(400).json({ msg: 'One or more batch IDs are invalid or do not belong to your college.' });
      }
      // Mistake: allBatch.map(...) (allBatch single object); shape { batchId, collegeId } wrong for TeacherBatch; createMany without await. Corrected: batches.map(batchId => ({ teacherId, batchId })); await createMany.
      await prisma.teacherBatch.deleteMany({ where: { teacherId } });
      const teacherBatchData = batches.map((batchId) => ({ teacherId, batchId }));
      await prisma.teacherBatch.createMany({ data: teacherBatchData, skipDuplicates: true });
    }

    // Mistake: no success return; empty catch. Corrected: return 200 with teacher; catch logs and returns 500.
    return res.status(200).json({ msg: 'Teacher updated successfully.', teacher: updatedTeacher });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Internal server error.' });
  }
}

export const getBatchByTeacherId = async (req, res) => {
 try {
   const teacherId = req.user?.id;
  if(!teacherId) {
      return res.status(401).json({ msg: "Teacher authentication failed." });
  }

  const batches = await prisma.teacherBatch.findMany( {
    where : {teacherId},
    include : {
      batch:{
        select:{
          id : true,
          name: true,
        }

      }
    }
  })

  const plainBatches = batches.map((b)=>b.batch).filter(Boolean);

  
  return res.status(200).json({
    msg : "Batch fetched successfully",
    batches : plainBatches
  })
  
 } catch (error) {
    console.error("[getBatchByTeacherId]", error);
    return res.status(500).json({ msg: "Error fetching batches." });
  }
};
