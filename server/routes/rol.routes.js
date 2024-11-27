import { Router } from "express";
import RolController from "../controllers/rol.controller.js";


const router = Router(); 

router.get('/api/rol', RolController.getRoles);
router.get('/api/rol/:id', RolController.getRol);
router.put('/api/rol/:id', RolController.putRol);
router.post('/api/rol', RolController.postRol);
 
export default router; 