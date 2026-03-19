import bcrypt from "bcrypt";
import prisma from "../db/prisma";

export async function createStudent(req, res) {
  const collegeId = req.user?.id;
  if (!collegeId) {
    return res.status(400).json({ msg: "College authentication failed!" });
  }

  const { name, email, password, batchId } = req.body;

  const trimmedName = typeof name === "string" ? name.trim() : "";
  const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!trimmedName || !trimmedEmail || !password || !collegeId || !batchId) {
    return res.status(400).json({ msg: "name, email, password, batchId is required!" });
  }
  if (password.length < 6) {
    return res.status(400).json({ msg: "Password length should be atleast of length 6" });
  }

  try {
    const batch = await prisma.batch.findFirst({
      where: { id: batchId, collegeId },
    });
    if (!batch) {
      return res.status(404).json({
        msg: "Batch not found or doesn't belong to your college.",
      });
    }

    const existing = await prisma.user.findUnique({
      where: { email: trimmedEmail },
    });
    if (existing) {
      return res.status(409).json({ msg: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await prisma.$transaction(async(tx) => {
      const user = await tx.user.create({
        data:{
          name : trimmedName,
          passwordHash: hashedPassword,
          collegeId,
          email: trimmedEmail,
          role: "STUDENT"
        },

        select: {
          id: true,
          name: true,
          email: true,
          collegeId: true,
          role: true,
        }

      })

      await tx.studentBatch.create({data:{batchId, studentId: user.id}});
      return user;
    })
    return res.status(201).json({
      msg: "Student created Successfully!",
      student,
    });
  } catch (error) {
    console.error("[createStudent]", error);
    return res.status(500).json({ msg: "Error in creating the student" });
  }
}


export async function getBatchStudent(req, res){
  const collegeId = req.user?.id;
  if(!collegeId){
    return res.status(400).json({ msg: "College authentication failed!" });

  }

  const batchId = req.params.id;
  if(!batchId){
    return res.status(400).json({ msg: "Batch authentication failed!" });

  }
  let batchName ;
  try {
    const batch = await prisma.batch.findFirst({
      where: { id: batchId, collegeId },
      select: { id: true , name: true},
    });

    if(!batch) return res.status(404).json({
      msg : "Batch doesn't exist in college"
    })
    batchName = batch.name;
    
  } catch (error) {
    console.error("[getBatchStudent] batch lookup:", error);
    return res.status(400).json({
      msg: "Error occurred while searching batch in college",
      ...(process.env.NODE_ENV !== "production" && { error: error?.message }),
    });
  }
  
  try {
    const students = await prisma.studentBatch.findMany({
      where: {batchId},
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            studentEnrollmentId: true,
          },
        }
      }
    })
    return res.status(200).json({
      msg: "Students fetched successfully",
      students,
      batchName,
    });

    
    
  } catch (error) {
       return res.status(500).json({ msg: "Error in fetching the student" });
  }
}