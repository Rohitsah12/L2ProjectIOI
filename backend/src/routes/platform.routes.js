import express from 'express';
import { createPlatform } from '../controllers/platform.controller.js';

const platformRouter = express.Router();

platformRouter.post('/create',  createPlatform );

export default platformRouter;
