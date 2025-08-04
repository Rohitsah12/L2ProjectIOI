import prisma from '../db/prisma.js';
import bcrypt from 'bcrypt';


export const addTeacher = async (req, res) => {
  try {
    const collegeId = req.user?.id;
    if (!collegeId) {
      return res.status(401).json({ error: 'College authentication failed.' });
    }

    let teachers = req.body;
    if (!Array.isArray(teachers)) {
      teachers = [teachers];
    }

    const createdTeachers = [];

    for (const teacher of teachers) {
      const { name, email, password, teacherEnrollmentId, batches } = teacher;

      if (!name || !email || !password || !teacherEnrollmentId) {
        return res.status(400).json({ error: 'Name, email, password, and teacherEnrollmentId are required for each teacher.' });
      }

      const existingTeacher = await prisma.user.findFirst({
        where: {
          OR: [
            { email },
            { teacherEnrollmentId }
          ]
        },
      });
      if (existingTeacher) {
        return res.status(409).json({ error: `Teacher with email ${email} or enrollment ID ${teacherEnrollmentId} already exists.` });
      }

      if (batches && batches.length > 0) {
        const validBatches = await prisma.batch.findMany({
          where: {
            id: { in: batches },
            collegeId,
          },
          select: { id: true },
        });
        if (validBatches.length !== batches.length) {
          return res.status(400).json({ error: 'One or more batch IDs are invalid or do not belong to your college.' });
        }
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const createdTeacher = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: 'TEACHER',
          collegeId,
          teacherEnrollmentId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          collegeId: true,
          teacherEnrollmentId: true,
        },
      });

      if (batches && batches.length > 0) {
        const teacherBatchData = batches.map(batchId => ({
          teacherId: createdTeacher.id,
          batchId,
        }));
        await prisma.teacherBatch.createMany({
          data: teacherBatchData,
          skipDuplicates: true,
        });
      }

      createdTeachers.push(createdTeacher);
    }

    return res.status(201).json({
      message: `${createdTeachers.length} teacher(s) added successfully.`,
      teachers: createdTeachers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};


export const updateTeacherById = async (req, res) => {
  try {
    const collegeId = req.user?.id;
    const teacherId = req.params.id;
    const { name, email, password, teacherEnrollmentId, batches } = req.body;

    if (!collegeId) {
      return res.status(401).json({ error: 'College authentication failed.' });
    }

    const teacher = await prisma.user.findUnique({
      where: { id: teacherId },
    });
    if (!teacher || teacher.collegeId !== collegeId || teacher.role !== 'TEACHER') {
      return res.status(404).json({ error: 'Teacher not found or access denied.' });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (teacherEnrollmentId) updateData.teacherEnrollmentId = teacherEnrollmentId;
    if (password) {
      updateData.passwordHash = await bcrypt.hash(password, 10);
    }

    if (email || teacherEnrollmentId) {
      const conflictTeacher = await prisma.user.findFirst({
        where: {
          AND: [
            { id: { not: teacherId } },
            {
              OR: [
                { email: email || undefined },
                { teacherEnrollmentId: teacherEnrollmentId || undefined },
              ],
            },
          ],
        },
      });
      if (conflictTeacher) {
        return res.status(409).json({ error: 'Email or teacherEnrollmentId already in use by another teacher.' });
      }
    }

    const updatedTeacher = await prisma.user.update({
      where: { id: teacherId },
      data: updateData,
      select: { id: true, name: true, email: true, role: true, collegeId: true, teacherEnrollmentId: true },
    });

    if (Array.isArray(batches)) {
      // Validate batches belong to college
      const validBatches = await prisma.batch.findMany({
        where: { id: { in: batches }, collegeId },
        select: { id: true },
      });
      if (validBatches.length !== batches.length) {
        return res.status(400).json({ error: 'One or more batch IDs are invalid or do not belong to your college.' });
      }
      await prisma.teacherBatch.deleteMany({ where: { teacherId } });
      const teacherBatchData = batches.map(batchId => ({ teacherId, batchId }));
      await prisma.teacherBatch.createMany({ data: teacherBatchData, skipDuplicates: true });
    }

    return res.status(200).json({ message: 'Teacher updated successfully.', teacher: updatedTeacher });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};


export const deleteTeacherById = async (req, res) => {
  try {
    const collegeId = req.user?.id;
    const teacherId = req.params.id;

    if (!collegeId) {
      return res.status(401).json({ error: 'College authentication failed.' });
    }

    const teacher = await prisma.user.findUnique({
      where: { id: teacherId },
    });
    if (!teacher || teacher.collegeId !== collegeId || teacher.role !== 'TEACHER') {
      return res.status(404).json({ error: 'Teacher not found or access denied.' });
    }

    await prisma.teacherBatch.deleteMany({
      where: { teacherId },
    });

    await prisma.user.delete({
      where: { id: teacherId },
    });

    return res.status(200).json({ message: 'Teacher deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
