

import { Router } from "express";
import { createCollege, registerCollege, getColleges } from "../controllers/college.controller.js";

const collegeRouter = Router();

collegeRouter.get("/", getColleges);           // GET  /api/college/
collegeRouter.post("/register", registerCollege);  // POST /api/college/register
collegeRouter.post("/create", createCollege);       // POST /api/college/create

export default collegeRouter;