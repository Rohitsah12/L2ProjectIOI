

import prisma from "../db/prisma.js";

// CHANGED: Error/success responses use single "msg" key (was mixed "error"/"message"; 404 "Batch not found" now returns msg).

// collegeId must come from req.user.id (auth middleware sets it). Destructuring { collegeId } from req.user?.id was wrong
// because req.user.id is a string, so collegeId was always undefined and created "CollegeId is required" / Prisma errors.
const getCollegeId = (req) => req.user?.id;

// ----- How I did it earlier (commented; was giving errors) -----
// export const createBatch = async(req, res) => {
//     const {collegeId} = req.user?.id;
//     if(!collegeId) return res.status(401).json({msg: "CollegeId is required"});
//     const {name} = req.body;
//     const trimmedName = typeof name === 'string' ? name.trim() : "";
//     if(!trimmedName) return res.status(400).json({msg: "name is required"});
//     try {
//         const batch = await prisma.batch.create({
//             collegeId,
//             data:{ name: trimmedName, collegeId },
//             select:{ id :true, name:true, collegeId:true }
//         })
//         res.status(201).send({ batch, msg: "Batch created successfully!" })
//     } catch (err) {
//         res.status(201).send({ error: `"[createBatch]": ${err}`, message: err.msg || err.error })
//     }
// };

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
        // Prisma create() accepts only "data" (and optionally select). Passing collegeId at top level was invalid
        // and caused "Unknown arg" error. This should have been done this way.
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

// ----- How I did it earlier (commented; was giving errors) -----
// export const getBatch= async(req, res) => {
//     const { collegeId } = req.user?.id;
//     const trimmedCollegeId = typeof collegeId==='string' ? collegeId.trim() : '';
//     if(!trimmedCollegeId) return res.status(400).json({ msg : "Authentication failed" });
//     try {
//         const batches = prisma.batch.findMany({
//             where : {collegeId},
//             select:{ id:true, collegeId: true, name: true },
//             orderBy : {name:"asc"}
//         })
//         res.status(201).json({ msg: `Batches for ${collegeId} are fetched`, batches })
//     } catch (err) {
//         res.status(500).json({ msg : err })
//     }
// };

export const getBatch = async (req, res) => {
    // Same as createBatch: req.user.id is the college id (string). Destructuring { collegeId } from it gave undefined.
    const collegeId = getCollegeId(req);
    if (!collegeId) {
        return res.status(401).json({ msg: "Authentication failed." });
    }

    try {
        // findMany returns a Promise; we must await it. Without await, batches was a Promise and res.json got undefined.
        // This was giving error because we were sending a Promise instead of an array. This should have been done this way.
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

// ----- How I did it earlier (commented; was giving errors) -----
// export const getBatchById = async(req, res) => {
//     const { collegeId } = req.user?.id;
//     if(!collegeId) {m   // typo: stray "m"
//        return res.status(401).json({ msg: "Authentication failed" })
//     }
//     const { id } = req.params;
//     if(!id) return res.status(400).json({ msg: "BatchId is required" });
//     try {
//         const batch = await prisma.batch.findUnique({
//             where : {id, collegeId},
//             select: { id:true, name: true, collegeId: true }
//         })
//         if (!batch) return res.status(404).json({ error: "Batch not found." });
//         return res.status(201).json({ msg : "Batch Fetched ", batch })
//     } catch (error) {
//         return res.status(400).json({ msg: "Failed to retrieve batch" })
//     }
// };

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
        // findUnique only accepts unique fields (e.g. id alone). Filtering by id + collegeId requires findFirst,
        // otherwise Prisma throws. This should have been done this way to avoid "Unknown arg" / invalid where.
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

// ----- How I did it earlier (commented; was giving errors) -----
// export const getBatchTeacher = async(req, res) => {
//     const { collegeId } = req.user?.id;
//     if(!collegeId) {
//         res.status(401).json({ msg : "Authentication failed!" })
//     }
//     const batchId = req.params.id;
//     try {
//         const teacherBatchId = prisma.teacherBatch.findFirst({
//             where: { collegeId, id : batchId },
//             select : {id : true}
//         })
//         if(!teacherBatchId) res.status(400).json({ msg : "Batch not found" });
//         const batchTeachers = prisma.teacherBatch.findMany({
//             where : { batchId },
//             include: { teacher:{ select:{ id: true, name : true, email: true, teacherEnrollmentId: true } } }
//         });
//         const teachers = batchTeachers.map((tb) => ({ ...tb.teacher, teacherBatchId : tb.id }));
//         res.status(201).json({ msg : "Teachers of batch fetched successfully!", teachers })
//     } catch (error) {
//         console.log("[Fetching teachers"+ error ), res.status(400).json({ msg : "Eror fetching teachers" })
//     }
// };

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
        // TeacherBatch table has batchId and teacherId, not collegeId. We must check batch exists and belongs to
        // college via the Batch model. This should have been done this way; otherwise where: { collegeId } on
        // TeacherBatch gave error because that column does not exist.
        const batch = await prisma.batch.findFirst({
            where: { id: batchId, collegeId },
            select: { id: true },
        });
        if (!batch) {
            return res.status(404).json({ msg: "Batch not found." });
        }

        // findMany returns a Promise; we must await it. Without await, batchTeachers was a Promise and .map() threw.
        // This should have been done this way to avoid "batchTeachers.map is not a function" / undefined.
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

// ----- How I did it earlier (commented; was giving errors) -----
// export const createBatchTeacher = async(req, res) => {
//     const collegeId = req.user?.id;
//     if(!collegeId) return res.status(401).json({ msg: "Authentication for a college Failed" });
//     const {batchId, teacherId }= req.body;
//     if(!batchId) return req.status().json({ msg : "Batch not found" });
//     if(!teacherId) return req.status(404).json({ msg : "Teacher not found" });
//     try {
//         const [teacher, batch] = await Promise.all([
//             prisma.user.findFirst({ where : { id : teacherId, role : "TEACHER" , collegeId }, select: {id: true} }),
//             prisma.batch.findFirst({ where: {collegeId, id: batchId}, select: {id: true} })
//         ]);
//         if(!teacher) return res.status(404).send("Teacher not found or doesnt belong to college");
//         if(!batch) return res.status(404).send("Batch not found or doesnt belong to college");
//         const existing = prisma.teacherBatch.findUnique({
//             teacherId_batchId : { teacherId, batchId },
//         })
//         if (existing) return res.status(409).send("Teacher already exists in the batch");
//         const teacherBatch = await prisma.teacherBatch.create({
//             data : {teacherId, batchId},
//             select : { id: true, teacherId : true, batchId : true }
//         });
//         res.status(201).json({ msg : "Teacher added to the batch successfully", teacherBatch });
//     } catch (error) {
//         console.error("[createBatchTeacher]", error);
//         return res.status(500).json({ error: "Error assigning teacher to batch", message: error?.message || String(error) });
//     }
// };

export const createBatchTeacher = async (req, res) => {
    const collegeId = getCollegeId(req);
    if (!collegeId) {
        return res.status(401).json({ msg: "Authentication for a college failed." });
    }

    const { batchId, teacherId } = req.body;
    if (!batchId) {
        // req.status() is wrong (req has no .status()); must use res.status(). This was giving a runtime error.
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

        // findUnique must be: (1) awaited, (2) passed where: { teacherId_batchId: { teacherId, batchId } }.
        // Without await, existing was a Promise (always truthy), so we always hit 409. Without correct where shape,
        // Prisma threw. This should have been done this way.
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

/** Remove a teacher from a batch (delete TeacherBatch by id). Params: id = teacherBatchId. */
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