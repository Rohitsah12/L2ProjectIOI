import { Router } from "express";
import { authCollege, authDynamic, authTeacher } from "../middlewares/auth.middleware.js";
import { addTeacher, deleteTeacherById, updateTeacherById } from "../controllers/teachers.controller.js";
import { getBatchTeacher } from "../controllers/batch.controller.js";

const teacherRouter=Router();

teacherRouter.post('/add',authDynamic,authCollege,addTeacher)
teacherRouter.patch('/update/:id', authDynamic, authCollege, updateTeacherById);
teacherRouter.delete('/delete/:id', authDynamic, authCollege, deleteTeacherById);

teacherRouter.get('/get-batch',authDynamic,authTeacher,getBatchTeacher)



export default teacherRouter;