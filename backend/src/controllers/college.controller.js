

import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";

// CHANGED: All response messages use "msg" key (was "error"/"message"; catch blocks now return single msg).

export const createCollege = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        const trimmedName = typeof name === 'string'? name.trim():'';
        const trimmedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    
        if (!trimmedName || !trimmedEmail || !password) {
            return res.status(400).json({
                msg: "name, email, password are mandatory"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 6 characters." });
        }
    
        const emailExist = await prisma.college.findUnique({
            where: {email: trimmedEmail}
        });
    
        if(emailExist) {
            return res.status(409).json({
               msg : "College with this mail already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newCollege = await prisma.college.create({
            data: {
                name: trimmedName,
                email: trimmedEmail,
                passwordHash: hashedPassword,
            },
            select: {
                name: true,
                id : true, 
                email : true
            }
        })
    
        return res.status(201).json({
            msg : "College created successfully",
            college: newCollege
        })
    } catch (error) {
        console.error("[createCollege]", error);
        return res.status(500).json({
            msg:  "Error creating the college",
        });
    }
}

export const registerCollege = createCollege;

export const getColleges = async (req, res) => {
    try {
        const colleges = await prisma.college.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
            orderBy: { name: "asc" },
        });
        return res.status(200).json({ colleges });
    } catch (error) {
        console.error("[getColleges]", error);
        return res.status(500).json({
            msg: error?.message || "Error happened while fetching colleges",
        });
    }
};









