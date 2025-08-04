import  { Router } from 'express'
import { registerCollege } from '../controllers/college.controller.js';
const collegeRouter=Router();



collegeRouter.post('/register',registerCollege)

export default collegeRouter