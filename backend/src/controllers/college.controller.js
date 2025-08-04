import prisma from "../db/prisma.js";
import bcrypt from "bcrypt"

export const registerCollege = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required.' });
        }

        const existingCollege = await prisma.college.findUnique({
            where: { email },
        });
        if (existingCollege) {
            return res.status(409).json({ error: 'A college with this email already exists.' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newCollege = await prisma.college.create({
            data: {
                name,
                email,
                passwordHash, 
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        return res.status(201).json({
            message: 'College registered successfully.',
            college: newCollege,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};
