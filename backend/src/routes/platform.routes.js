import express from 'express';
import { createPlatform, getAllPlatforms } from '../controllers/platform.controller.js';

const platformRouter = express.Router();

platformRouter.post('/create',  createPlatform );
platformRouter.get('/all',getAllPlatforms)


export default platformRouter;
