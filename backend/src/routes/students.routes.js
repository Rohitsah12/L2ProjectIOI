import Router from "express";
import { authCollege, authDynamic } from "../middlewares/auth.middleware.js";
import { createStudent , getBatchStudent} from "../controllers/students.controller.js";

const studentRouter = Router();

studentRouter.post("/create", authDynamic, authCollege, createStudent);
studentRouter.get("/get/:id", authDynamic, authCollege, getBatchStudent)

export default studentRouter;