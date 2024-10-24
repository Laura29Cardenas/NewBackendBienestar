import { Router } from "express";
import InstructorController from "../controllers/instructor.controller.js";

const router = Router();

router.get( '/api/instructor',  InstructorController.getInstructores )
router.get( '/api/instructor/:id',  InstructorController.getInstructor )
router.put( '/api/instructor/:id',  InstructorController.putInstructor )
router.post( '/api/instructor',  InstructorController.postInstructor )

export default router;  