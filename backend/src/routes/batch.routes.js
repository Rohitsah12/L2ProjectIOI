import { Router } from "express";
import { authCollege, authDynamic } from "../middlewares/auth.middleware.js";
import { createBatch, getBatch, getBatchById } from "../controllers/batch.controller.js";

const batchRouter=Router();

batchRouter.post('/create',authDynamic,authCollege,createBatch)
batchRouter.get('/get',authDynamic,authCollege,getBatch)
batchRouter.get('/get/:id',authDynamic,authCollege,getBatchById)

export default batchRouter;