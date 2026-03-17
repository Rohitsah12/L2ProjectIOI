

import prisma from "../db/prisma.js";


const getCollegeId = (req) => req.user?.id;




export const createBatch = async (req, res) => {
    const collegeId = getCollegeId(req);
    if (!collegeId) {
        return res.status(401).json({ msg: "College authentication failed." });
    }

    const { name } = req.body;
    const trimmedName = typeof name === "string" ? name.trim() : "";
    if (!trimmedName) {
        return res.status(400).json({ msg: "Name is required." });
    }

    try {
        
        const batch = await prisma.batch.create({
            data: {
                name: trimmedName,
                collegeId,
            },
            select: { id: true, name: true, collegeId: true },
        });
        return res.status(201).json({
            batch,
            msg: "Batch created successfully!",
        });
    } catch (err) {
        console.error("[createBatch]", err);
        return res.status(500).json({
            msg: err?.message || "Error creating batch",
        });
    }
};



export const getBatch = async (req, res) => {
    const collegeId = getCollegeId(req);
    if (!collegeId) {
        return res.status(401).json({ msg: "Authentication failed." });
    }

    try {
        const batches = await prisma.batch.findMany({
            where: { collegeId },
            select: { id: true, collegeId: true, name: true },
            orderBy: { name: "asc" },
        });
        return res.status(200).json({
            msg: "Batches fetched successfully.",
            batches,
        });
    } catch (err) {
        console.error("[getBatch]", err);
        return res.status(500).json({
            msg: err?.message || "Error fetching batches",
        });
    }
};



export const getBatchById = async (req, res) => {
    const collegeId = getCollegeId(req);
    if (!collegeId) {
        return res.status(401).json({ msg: "Authentication failed." });
    }

    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ msg: "Batch id is required." });
    }

    try {
        const batch = await prisma.batch.findFirst({
            where: { id, collegeId },
            select: { id: true, name: true, collegeId: true },
        });
        if (!batch) {
            return res.status(404).json({ msg: "Batch not found." });
        }
        return res.status(200).json({
            msg: "Batch fetched successfully.",
            batch,
        });
    } catch (error) {
        console.error("[getBatchById]", error);
        return res.status(500).json({
            msg: error?.message || "Failed to retrieve batch",
        });
    }
};



export const getBatchTeacher = async (req, res) => {
    const collegeId = getCollegeId(req);
    if (!collegeId) {
        return res.status(401).json({ msg: "Authentication failed!" });
    }

    const batchId = req.params.id;
    if (!batchId) {
        return res.status(400).json({ msg: "Batch id is required." });
    }

    try {
        
        const batch = await prisma.batch.findFirst({
            where: { id: batchId, collegeId },
            select: { id: true },
        });
        if (!batch) {
            return res.status(404).json({ msg: "Batch not found." });
        }

        
        const batchTeachers = await prisma.teacherBatch.findMany({
            where: { batchId },
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        teacherEnrollmentId: true,
                    },
                },
            },
        });

        const teachers = batchTeachers.map((tb) => ({
            ...tb.teacher,
            teacherBatchId: tb.id,
        }));

        return res.status(200).json({
            msg: "Teachers of batch fetched successfully!",
            teachers,
        });
    } catch (error) {
        console.error("[getBatchTeacher]", error);
        return res.status(500).json({
            msg: "Error fetching batch teachers",
            error: error?.message || String(error),
        });
    }
};



export const createBatchTeacher = async (req, res) => {
    const collegeId = getCollegeId(req);
    if (!collegeId) {
        return res.status(401).json({ msg: "Authentication for a college failed." });
    }

    const { batchId, teacherId } = req.body;
    if (!batchId) {
        return res.status(400).json({ msg: "Batch id is required." });
    }
    if (!teacherId) {
        return res.status(400).json({ msg: "Teacher id is required." });
    }

    try {
        const [teacher, batch] = await Promise.all([
            prisma.user.findFirst({
                where: { id: teacherId, role: "TEACHER", collegeId },
                select: { id: true },
            }),
            prisma.batch.findFirst({
                where: { collegeId, id: batchId },
                select: { id: true },
            }),
        ]);

        if (!teacher) {
            return res.status(404).json({ msg: "Teacher not found or does not belong to your college." });
        }
        if (!batch) {
            return res.status(404).json({ msg: "Batch not found or does not belong to your college." });
        }

        
        const existing = await prisma.teacherBatch.findUnique({
            where: {
                teacherId_batchId: { teacherId, batchId },
            },
        });

        if (existing) {
            return res.status(409).json({ msg: "Teacher is already assigned to this batch." });
        }

        const teacherBatch = await prisma.teacherBatch.create({
            data: { teacherId, batchId },
            select: { id: true, teacherId: true, batchId: true },
        });

        return res.status(201).json({
            msg: "Teacher added to the batch successfully.",
            teacherBatch,
        });
    } catch (error) {
        console.error("[createBatchTeacher]", error);
        return res.status(500).json({
            msg: error?.message || "Error assigning teacher to batch",
        });
    }
};


export const deleteBatchTeacher = async (req, res) => {
    const collegeId = getCollegeId(req);
    if (!collegeId) {
        return res.status(401).json({ msg: "Authentication failed." });
    }
    const teacherBatchId = req.params.id;
    if (!teacherBatchId) {
        return res.status(400).json({ msg: "Teacher batch assignment id is required." });
    }
    try {
        const tb = await prisma.teacherBatch.findUnique({
            where: { id: teacherBatchId },
            include: { batch: { select: { collegeId: true } } },
        });
        if (!tb || tb.batch.collegeId !== collegeId) {
            return res.status(404).json({ msg: "Assignment not found." });
        }
        await prisma.teacherBatch.delete({ where: { id: teacherBatchId } });
        return res.status(200).json({ msg: "Teacher removed from batch." });
    } catch (error) {
        console.error("[deleteBatchTeacher]", error);
        return res.status(500).json({
            msg: error?.message || "Error removing teacher from batch",
        });
    }
};