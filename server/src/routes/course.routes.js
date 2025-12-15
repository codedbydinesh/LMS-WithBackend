import { Router } from "express";
import { getAllCourses, getCourseDetailsById } from "../controllers/course.controllers.js";


const courseRouter = Router();

courseRouter.get('/all', getAllCourses);
courseRouter.get('/:id', getCourseDetailsById);

export default courseRouter;

