import prisma from "../db/prisma.js";

export const createPlatform = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Platform name is required and must be a non-empty string.' });
    }

    const platformName = name.trim().toLowerCase();

    const existingPlatform = await prisma.platform.findUnique({
      where: { name: platformName },
    });

    if (existingPlatform) {
      return res.status(409).json({ error: 'Platform with this name already exists.' });
    }

    const newPlatform = await prisma.platform.create({
      data: {
        name: platformName,
      },
    });

    return res.status(201).json({
      message: 'Platform created successfully.',
      platform: newPlatform,
    });
  } catch (error) {
    console.error('Error creating platform:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
