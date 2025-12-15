import { Router } from "express";
import { addCourse, getEducatorCourses, getEducatorDashboardData, getEnrolledStudentsData, updateRoleToEducator } from "../controllers/educator.controllers.js";
import { upload } from "../configs/multer.js";
import { protectEducator } from "../middlewares/auth.middleware.js";


const educatorRouter = Router();

// Add Educator Role
educatorRouter.get('/update-role', updateRoleToEducator);

educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse);

educatorRouter.get('/courses', protectEducator, getEducatorCourses);

educatorRouter.get('/dashboard', protectEducator, getEducatorDashboardData);

educatorRouter.get('/enrolled-students', protectEducator, getEnrolledStudentsData);

export { educatorRouter };