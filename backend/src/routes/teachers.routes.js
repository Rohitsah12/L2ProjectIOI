import { Router } from "express";
import { authCollege, authDynamic, authTeacher } from "../middlewares/auth.middleware.js";
import {
  addTeacher,
  getTeachers,
  getTeacherById,
  updateTeacherById,
} from "../controllers/teachers.controller.js";
import { getBatchTeacher } from "../controllers/batch.controller.js";

const teacherRouter = Router();

teacherRouter.get("/get", authDynamic, authCollege, getTeachers);
teacherRouter.get("/get/:id", authDynamic, authCollege, getTeacherById);
teacherRouter.post("/add", authDynamic, authCollege, addTeacher);
teacherRouter.patch("/update/:id", authDynamic, authCollege, updateTeacherById);
teacherRouter.get("/get-batch", authDynamic, authTeacher, getBatchTeacher);

export default teacherRouter;