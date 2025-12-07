import { Router } from "express";
import { updateRoleToEducator } from "../controllers/educator.controllers.js";


const educatorRouter = Router();

// Add Educator Role
educatorRouter.get('/update-role', updateRoleToEducator)


export { educatorRouter };