import prisma from "../db/prisma.js";


export const createBatch = async (req, res) => {
    try {
        const { name } = req.body;
        const collegeId = req.user?.id;

        if (!name) {
            return res.status(400).json({ error: 'Batch name is required.' });
        }
        if (!collegeId) {
            return res.status(401).json({ error: 'College authentication failed.' });
        }

        const college = await prisma.college.findUnique({ where: { id: collegeId } });
        if (!college) {
            return res.status(404).json({ error: 'College not found.' });
        }

        const newBatch = await prisma.batch.create({
            data: {
                name,
                collegeId,
            },
            select: {
                id: true,
                name: true,
                collegeId: true,
            },
        });

        return res.status(201).json({
            message: 'Batch created successfully.',
            batch: newBatch,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

export const getBatch = async (req, res) => {
    try {
        const collegeId = req.user?.id; 

        if (!collegeId) {
            return res.status(401).json({ error: 'College authentication failed.' });
        }

        const batches = await prisma.batch.findMany({
            where: { collegeId },
            select: {
                id: true,
                name: true,
                collegeId: true,
            },
            orderBy: { name: 'asc' },
        });

        return res.status(200).json({
            batches,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}
export const getBatchById = async (req, res) => {
    try {
        const collegeId = req.user?.id;       
        const batchId = req.params.id;        

        if (!collegeId) {
            return res.status(401).json({ error: 'College authentication failed.' });
        }
        if (!batchId) {
            return res.status(400).json({ error: 'Batch ID is required.' });
        }

        const batch = await prisma.batch.findFirst({
            where: {
                id: batchId,
                collegeId: collegeId,   
            },
            select: {
                id: true,
                name: true,
                collegeId: true,
                teacherBatch: {
                    select: {
                        id: true,
                        teacherId: true,
                    },
                },
                studentBatch: {
                    select: {
                        id: true,
                        studentId: true,
                    },
                },
                rankings: true,  
            },
        });

        if (!batch) {
            return res.status(404).json({ error: 'Batch not found or access denied.' });
        }

        return res.status(200).json({ batch });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

export const getBatchTeacher = async (req, res) => {
  try {
    const teacherId = req.user?.id; 

    if (!teacherId) {
      return res.status(401).json({ error: 'Teacher authentication failed.' });
    }

    const teacherBatches = await prisma.teacherBatch.findMany({
      where: { teacherId },
      include: {
        batch: {
          include: {
            college: {
              select: { id: true, name: true }
            },
            teacherBatch: {
              include: {
                teacher: {
                  select: { id: true, name: true }
                }
              }
            }
          }
        }
      }
    });

    const batches = teacherBatches.map(tb => ({
      id: tb.batch.id,
      name: tb.batch.name,
      collegeId: tb.batch.college.id,
      collegeName: tb.batch.college.name,
      teachers: tb.batch.teacherBatch.map(ttb => ({
        id: ttb.teacher.id,
        name: ttb.teacher.name
      }))
    }));

    return res.status(200).json({ batches });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
