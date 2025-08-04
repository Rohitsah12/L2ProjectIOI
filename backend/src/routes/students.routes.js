import { Router } from "express";
import { authCollege, authDynamic } from "../middlewares/auth.middleware.js";
import { addStudents, deleteStudentById, getAllStudents, getAllStudentsByBatch, getStudentById, updateStudentById } from "../controllers/students.controller.js";

const studentRouter=Router();

studentRouter.post("/add",authDynamic,authCollege,addStudents)
studentRouter.patch("/update/:id",authDynamic,authCollege,updateStudentById);
studentRouter.delete("/delete/:id",authDynamic,authCollege,deleteStudentById);
studentRouter.get("/get",authDynamic,authCollege,getAllStudents);
studentRouter.get("/get/:batchId",authDynamic,authCollege,getAllStudentsByBatch);
studentRouter.get("/get-student/:id",authDynamic,authCollege,getStudentById );

export default studentRouter;