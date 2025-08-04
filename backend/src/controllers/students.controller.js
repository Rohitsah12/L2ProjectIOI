import prisma from "../db/prisma.js";
import bcrypt from "bcrypt"

export const addStudents = async (req, res) => {
  try {
    const collegeId = req.user?.id;
    if (!collegeId) {
      return res.status(401).json({ error: 'College authentication failed.' });
    }

    let students = req.body.students;
    const batchId = req.body.batchId; 

    if (!students || !Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ error: 'Students array is required and cannot be empty.' });
    }

    if (batchId) {
      const batch = await prisma.batch.findUnique({ where: { id: batchId } });
      if (!batch || batch.collegeId !== collegeId) {
        return res.status(400).json({ error: 'Invalid batch ID or batch does not belong to your college.' });
      }
    }

    const createdStudents = [];

    for (const student of students) {
      const {
        name,
        email,
        password,
        studentEnrollmentId,
        platformAccounts,
        batchIds,
      } = student;

      if (!name || !email || !password || !studentEnrollmentId) {
        return res.status(400).json({
          error: 'Name, email, password, and studentEnrollmentId are required for each student.',
        });
      }

      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { studentEnrollmentId }],
        },
      });
      if (existingUser) {
        return res.status(409).json({
          error: `User with email ${email} or studentEnrollmentId ${studentEnrollmentId} already exists.`,
        });
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const createdStudent = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: 'STUDENT',
          collegeId,
          studentEnrollmentId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          studentEnrollmentId: true,
          collegeId: true,
        },
      });

      const batchesToAssign =
        Array.isArray(batchIds) && batchIds.length > 0
          ? batchIds
          : batchId
          ? [batchId]
          : [];

      if (batchesToAssign.length > 0) {
        const validBatches = await prisma.batch.findMany({
          where: {
            id: { in: batchesToAssign },
            collegeId,
          },
          select: { id: true },
        });

        if (validBatches.length !== batchesToAssign.length) {
          return res.status(400).json({
            error:
              'One or more batch IDs are invalid or do not belong to your college.',
          });
        }

        const studentBatchData = validBatches.map((batch) => ({
          studentId: createdStudent.id,
          batchId: batch.id,
        }));

        await prisma.studentBatch.createMany({
          data: studentBatchData,
          skipDuplicates: true,
        });
      }

      if (Array.isArray(platformAccounts) && platformAccounts.length > 0) {
        for (const { platformName, handle } of platformAccounts) {
          if (!platformName || !handle) {
            return res.status(400).json({
              error:
                'Each platform account must have both platformName and handle.',
            });
          }

          const normalizedHandle = handle.toLowerCase();

          let platform = await prisma.platform.findUnique({
            where: { name: platformName },
            select: { id: true, name: true },
          });

          if (!platform) {
            platform = await prisma.platform.create({
              data: { name: platformName },
              select: { id: true, name: true },
            });
          }

          await prisma.studentPlatformAccount.upsert({
            where: {
              userId_platformId: {
                userId: createdStudent.id,
                platformId: platform.id,
              },
            },
            update: { handle: normalizedHandle },
            create: {
              userId: createdStudent.id,
              platformId: platform.id,
              handle: normalizedHandle,
            },
          });
        }
      }

      createdStudents.push(createdStudent);
    }

    return res.status(201).json({
      message: `${createdStudents.length} student(s) added successfully.`,
      students: createdStudents,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

async function verifyStudentOwnership(studentId, collegeId) {
  const student = await prisma.user.findUnique({ where: { id: studentId } });
  return student && student.collegeId === collegeId && student.role === 'STUDENT' ? student : null;
}

export const updateStudentById = async (req, res) => {
  try {
    const collegeId = req.user?.id;
    const studentId = req.params.id;
    const {
      name,
      email,
      password,
      studentEnrollmentId,
      batchIds,
      platformAccounts,
      studentStreak,
    } = req.body;

    const student = await verifyStudentOwnership(studentId, collegeId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found or access denied.' });
    }

    if (email || studentEnrollmentId) {
      const conflict = await prisma.user.findFirst({
        where: {
          AND: [
            { id: { not: studentId } },
            {
              OR: [
                email ? { email } : undefined,
                studentEnrollmentId ? { studentEnrollmentId } : undefined,
              ].filter(Boolean),
            },
          ],
        },
      });
      if (conflict) {
        return res.status(409).json({ error: 'Email or studentEnrollmentId already in use.' });
      }
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (studentEnrollmentId) updateData.studentEnrollmentId = studentEnrollmentId;
    if (typeof studentStreak === 'number') updateData.studentStreak = studentStreak;
    if (password) updateData.passwordHash = await bcrypt.hash(password, 10);

    const updatedStudent = await prisma.user.update({
      where: { id: studentId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        studentEnrollmentId: true,
        collegeId: true,
        studentStreak: true,
      },
    });

    if (Array.isArray(batchIds)) {
      const validBatches = await prisma.batch.findMany({
        where: { id: { in: batchIds }, collegeId },
        select: { id: true },
      });
      if (validBatches.length !== batchIds.length) {
        return res.status(400).json({ error: 'One or more batch IDs are invalid or not owned by your college.' });
      }

      await prisma.studentBatch.deleteMany({ where: { studentId } });
      const studentBatchData = validBatches.map(batch => ({ studentId, batchId: batch.id }));
      await prisma.studentBatch.createMany({ data: studentBatchData, skipDuplicates: true });
    }

    if (Array.isArray(platformAccounts)) {
      await prisma.studentPlatformAccount.deleteMany({ where: { userId: studentId } });

      for (const { platformName, handle } of platformAccounts) {
        if (!platformName || !handle) continue;
        const normalizedHandle = handle.toLowerCase();

        let platform = await prisma.platform.findUnique({ where: { name: platformName.toLowerCase() } });
        if (!platform) {
          platform = await prisma.platform.create({ data: { name: platformName.toLowerCase() } });
        }

        await prisma.studentPlatformAccount.create({
          data: { userId: studentId, platformId: platform.id, handle: normalizedHandle },
        });
      }
    }

    return res.status(200).json({ message: 'Student updated successfully.', student: updatedStudent });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export const deleteStudentById = async (req, res) => {
  try {
    const collegeId = req.user?.id;
    const studentId = req.params.id;

    const student = await verifyStudentOwnership(studentId, collegeId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found or access denied.' });
    }

    await prisma.studentBatch.deleteMany({ where: { studentId } });
    await prisma.studentPlatformAccount.deleteMany({ where: { userId: studentId } });

    await prisma.user.delete({ where: { id: studentId } });

    return res.status(200).json({ message: 'Student deleted successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const collegeId = req.user?.id;
    const students = await prisma.user.findMany({
      where: { collegeId, role: 'STUDENT' },
      select: {
        id: true,
        name: true,
        email: true,
        studentEnrollmentId: true,
        collegeId: true,
        studentStreak: true,
        studentBatch: { select: { batchId: true,
            batch:{
                select:{name:true}
            }
         } },
        platformAccounts: {
          select: {
            id: true,
            handle: true,
            platform: { select: { name: true } },
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    return res.status(200).json({ students });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getAllStudentsByBatch = async (req, res) => {
  try {
    const collegeId = req.user?.id;
    const batchId = req.params.batchId;

    const batch = await prisma.batch.findUnique({ where: { id: batchId } });
    if (!batch || batch.collegeId !== collegeId) {
      return res.status(404).json({ error: 'Batch not found or access denied.' });
    }

    const studentBatches = await prisma.studentBatch.findMany({
      where: { batchId },
      select: { studentId: true },
    });
    const studentIds = studentBatches.map(sb => sb.studentId);

    const students = await prisma.user.findMany({
      where: { id: { in: studentIds }, role: 'STUDENT' },
      select: {
        id: true,
        name: true,
        email: true,
        studentEnrollmentId: true,
        collegeId: true,
        studentStreak: true,
        platformAccounts: {
          select: {
            id: true,
            handle: true,
            platform: { select: { name: true } },
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    return res.status(200).json({ students });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const collegeId = req.user?.id;
    const studentId = req.params.id;

    const student = await prisma.user.findUnique({
      where: { id: studentId },
      select: {
        id: true,
        name: true,
        email: true,
        role:true,
        studentEnrollmentId: true,
        collegeId: true,
        studentStreak: true,
        studentBatch: {
          select: { batchId: true ,
            batch:{
                select:{
                    name:true
                }
            }
          },
        },
        platformAccounts: {
          select: {
            id: true,
            handle: true,
            platform: { select: { name: true } },
          },
        },
      },
    });

    if (!student || student.collegeId !== collegeId || student.role !== 'STUDENT') {
      return res.status(404).json({ error: 'Student not found or access denied.' });
    }

    return res.status(200).json({ student });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};