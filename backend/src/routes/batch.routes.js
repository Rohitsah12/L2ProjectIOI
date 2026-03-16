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

// ----- How I did it earlier (commented; was giving 401 because req.user was undefined) -----
// batchRouter.post("/create", createBatch);
// batchRouter.get("/get", getBatch);
// batchRouter.get("/get/:id/teachers", getBatchTeacher);
// batchRouter.get("/get/:id", getBatchById);
// batchRouter.post("/teacher", createBatchTeacher);
// Auth middleware ensures req.user.id is set (college id when logged in as college). Without it, getCollegeId(req) was
// always undefined and all batch APIs returned 401. This should have been done this way so batch create/fetch work.
batchRouter.post("/create", authDynamic, authCollege, createBatch);
batchRouter.get("/get", authDynamic, authCollege, getBatch);
batchRouter.get("/get/:id/teachers", authDynamic, authCollege, getBatchTeacher);
batchRouter.get("/get/:id", authDynamic, authCollege, getBatchById);
batchRouter.post("/teacher", authDynamic, authCollege, createBatchTeacher);
batchRouter.delete("/teacher/:id", authDynamic, authCollege, deleteBatchTeacher);

export default batchRouter;