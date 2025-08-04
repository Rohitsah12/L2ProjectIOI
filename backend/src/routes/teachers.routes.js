import { Router } from "express";
import { authCollege, authDynamic } from "../middlewares/auth.middleware.js";
import { addTeacher, deleteTeacherById, updateTeacherById } from "../controllers/teachers.controller.js";

const teacherRouter=Router();

teacherRouter.post('/add',authDynamic,authCollege,addTeacher)
teacherRouter.patch('/update/:id', authDynamic, authCollege, updateTeacherById);
teacherRouter.delete('/delete/:id', authDynamic, authCollege, deleteTeacherById);

export default teacherRouter;