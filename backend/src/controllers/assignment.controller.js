import prisma from "../db/prisma.js";

export const createTopic = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ error: "Name is required and must be non-empty." });
    }
    name=name.trim().toLowerCase()
    const topic = await prisma.topic.create({
      data: {
        name,
        createdBy: req.user.id,
      },
    });

    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getAllTopics = async (req, res) => {
  try {
    const teacherId = req.user?.id;
    if (!teacherId) {
      return res.status(401).json({ error: "Teacher is not authenticated" });  // Use 401 Unauthorized
    }

    const allTopics = await prisma.topic.findMany({
      where: {
        createdBy: teacherId,  
      },
      select: {
        id: true,         
        name: true,
      },
      orderBy: { name: 'asc' },  
    });

    return res.status(200).json({ topics: allTopics });
  } catch (error) {
    console.error("Error in getAllTopics:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const createSubtopic = async (req, res) => {
  try {
    let { name, topic_id } = req.body;

    if (!name || !topic_id) {
      return res.status(400).json({ error: 'Both name and topic_id are required.' });
    }

    name = name.trim().toLowerCase();
    topic_id = topic_id.trim();

    const topic = await prisma.topic.findUnique({ where: { id: topic_id } });
    if (!topic || topic.createdBy !== req.user.id) {
      return res.status(403).json({ error: 'Topic not found or unauthorized.' });
    }

    const subtopic = await prisma.subtopic.create({
      data: {
        name,
        topicId: topic_id,
        createdBy: req.user.id,
      },
    });

    res.status(201).json(subtopic);
  } catch (error) {
    console.error("Error in createSubtopic:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getAllSubtopics = async (req, res) => {
  try {
    const teacherId = req.user?.id;
    if (!teacherId) {
      return res.status(401).json({ error: "Teacher is not authenticated" });
    }

    const { topic_id } = req.params;

    const where = { createdBy: teacherId };
    if (topic_id) {
      where.topicId = topic_id;
    }

    const subtopics = await prisma.subtopic.findMany({
      where,
      select: {
        id: true,
        name: true,
        topicId: true,
      },
      orderBy: { name: 'asc' }
    });

    return res.status(200).json({ subtopics });
  } catch (error) {
    console.error("Error in getAllSubtopics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const createProblem = async (req, res) => {
  try {
    let { title, link, difficulty, platform_id, topic_id, subtopic_id } = req.body;

    if (
      !title ||
      !link ||
      !difficulty ||
      !platform_id ||
      !topic_id ||
      !subtopic_id
    ) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    title = title.trim().toLowerCase();
    link = link.trim();
    difficulty = difficulty.toUpperCase();
    platform_id = platform_id.trim().toLowerCase();
    topic_id = topic_id.trim();
    subtopic_id = subtopic_id.trim();

    if (!['EASY', 'MEDIUM', 'HARD'].includes(difficulty)) {
      return res.status(400).json({ error: 'Difficulty must be one of EASY, MEDIUM, HARD.' });
    }

    const topic = await prisma.topic.findUnique({ where: { id: topic_id } });
    if (!topic || topic.createdBy !== req.user.id) {
      return res.status(403).json({ error: 'Topic not found or unauthorized.' });
    }

    const subtopic = await prisma.subtopic.findUnique({ where: { id: subtopic_id } });
    if (
      !subtopic ||
      subtopic.createdBy !== req.user.id ||
      subtopic.topicId !== topic_id
    ) {
      return res.status(403).json({ error: 'Subtopic not found, unauthorized, or does not belong to the topic.' });
    }

    const platform = await prisma.platform.findUnique({ where: { id: platform_id } });
    if (!platform) {
      return res.status(400).json({ error: 'Platform does not exist.' });
    }

    const problem = await prisma.problem.create({
      data: {
        title,
        link,
        difficulty,
        platformId: platform_id,
        topicId: topic_id,
        subtopicId: subtopic_id,
        addedBy: req.user.id,
      },
    });

    res.status(201).json(problem);
  } catch (error) {
    console.error("Error in createProblem:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProblems = async (req, res) => {
  try {
    const teacherId = req.user?.id;
    if (!teacherId) {
      return res.status(401).json({ error: "Teacher is not authenticated" });
    }

    // Optional filters by query parameters
    const { topic_id, subtopic_id, difficulty } = req.query;

    // Build Prisma where filter
    const where = { addedBy: teacherId };

    if (topic_id) where.topicId = topic_id;
    if (subtopic_id) where.subtopicId = subtopic_id;
    if (difficulty && ['EASY', 'MEDIUM', 'HARD'].includes(difficulty.toUpperCase())) {
      where.difficulty = difficulty.toUpperCase();
    }

    const problems = await prisma.problem.findMany({
      where,
      select: {
        id: true,
        title: true,
        link: true,
        difficulty: true,
        platformId: true,
        topicId: true,
        subtopicId: true,
        addedBy: true,
      },
      orderBy: {
        title: 'asc',
      },
    });

    return res.status(200).json({ problems });
  } catch (error) {
    console.error("Error in getAllProblems:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const assignHomework = async (req, res) => {
  try {
    const teacherId = req.user?.id;
    if (!teacherId) {
      return res.status(401).json({ error: "Teacher authentication failed." });
    }

    let { batch_id, problem_id, assignedDate } = req.body;

    if (!batch_id || !problem_id) {
      return res.status(400).json({ error: "batch_id and problem_id are required." });
    }

    batch_id = batch_id.trim();
    problem_id = problem_id.trim();

    let assignedDateObj;
    if (assignedDate) {
      assignedDateObj = new Date(assignedDate);
      if (isNaN(assignedDateObj.getTime())) {
        return res.status(400).json({ error: "Invalid assignedDate format." });
      }
    } else {
      assignedDateObj = new Date();
    }

    const batch = await prisma.batch.findFirst({
      where: {
        id: batch_id,
        college: {
          users: {
            some: { id: teacherId }
          }
        },
        teacherBatch: {
          some: { teacherId }
        }
      }
    });

    if (!batch) {
      return res.status(403).json({ error: "Unauthorized or invalid batch." });
    }

    const problem = await prisma.problem.findUnique({
      where: { id: problem_id }
    });

    if (!problem || problem.addedBy !== teacherId) {
      return res.status(403).json({ error: "Problem not found or unauthorized." });
    }

    let problemAssignment = await prisma.problemAssignment.findFirst({
      where: { 
        problemId: problem_id,
        batchId: batch_id
      }
    });

    if (!problemAssignment) {
      problemAssignment = await prisma.problemAssignment.create({
        data: {
          problemId: problem_id,
          batchId: batch_id,
          assignedBy: teacherId,
          assignedDate: assignedDateObj,
        }
      });
    } else if (assignedDateObj.getTime() !== problemAssignment.assignedDate.getTime()) {
      problemAssignment = await prisma.problemAssignment.update({
        where: { id: problemAssignment.id },
        data: { assignedDate: assignedDateObj },
      });
    }

    const studentsInBatch = await prisma.studentBatch.findMany({
      where: { batchId: batch_id },
      select: { studentId: true }
    });
    const studentIds = studentsInBatch.map(s => s.studentId);

    const assigned = [];
    const alreadyAssigned = [];

    for (const studentId of studentIds) {
      const existingStatus = await prisma.problemStatus.findUnique({
        where: {
          problemAssignmentId_studentId: {
            problemAssignmentId: problemAssignment.id,
            studentId
          }
        }
      });

      if (existingStatus) {
        alreadyAssigned.push(studentId);
      } else {
        await prisma.problemStatus.create({
          data: {
            problemAssignmentId: problemAssignment.id,
            studentId,
            status: 'PENDING',
            syncedAt: new Date(),
          }
        });
        assigned.push(studentId);
      }
    }

    return res.status(201).json({
      message: `Problem assigned to batch with ${assigned.length} new student(s).`,
      assignmentId: problemAssignment.id,
      assignedStudents: assigned,
      alreadyAssignedStudents: alreadyAssigned,
      assignedDate: problemAssignment.assignedDate,
    });

  } catch (error) {
    console.error("Error in assignHomework:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

