import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma";


const JWT_SECRET = process.env.JWT_SECRET;
const COLLEGE = "COLLEGE";
const STUDENT = "STUDENT";
const TEACHER = "TEACHER";

export const handleLogin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, Password, and Role are required." });
    }

    if (!JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET is not defined in environment variables." });
    }

    const roleUpperCase = role.toUpperCase();
    let user;

    switch (roleUpperCase) {
      case COLLEGE:
        user = await prisma.college.findUnique({
          where: { email },
        });
        break;

      case STUDENT:
      case TEACHER:
        user = await prisma.user.findUnique({
          where: { email },
        });
        break;

      default:
        return res.status(400).json({ message: "Invalid role provided." });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const reply = {
      email: user.email,
      userId: user.id,
      role: roleUpperCase,
      name: user.name || "No Name Provided",
    };

    const token = jwt.sign(
      { emailId: email, role: roleUpperCase,id:user.id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      user: reply,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const handleLogout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkUser = async (req, res) => {
  try {
    const { id, emailId, role } = req.user || {};

    if (!id && !emailId && !role) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    return res.status(200).json({
      message: "User is authenticated",
      user: { id, emailId, role },
    });
  } catch (error) {
    console.error("CheckUser Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
