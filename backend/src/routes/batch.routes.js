import { Router } from "express";
import { authCollege, authDynamic } from "../middlewares/auth.middleware.js";
import {
  createBatch,
  getBatch,
  getBatchById,
  getBatchTeacher,
  createBatchTeacher,
  deleteBatchTeacher,
} from "../controllers/batch.controller.js";

const batchRouter = Router();

batchRouter.post("/create", authDynamic, authCollege, createBatch);
batchRouter.get("/get", authDynamic, authCollege, getBatch);
batchRouter.get("/get/:id/teachers", authDynamic, authCollege, getBatchTeacher);
batchRouter.get("/get/:id", authDynamic, authCollege, getBatchById);
batchRouter.post("/createTeacher", authDynamic, authCollege, createBatchTeacher);
batchRouter.delete("/deleteTeacher/:id", authDynamic, authCollege, deleteBatchTeacher);

export default batchRouter;