import { Router } from "express";
import TallerController from "../controllers/taller.controller.js";

const router = Router();

router.get('/api/taller', TallerController.getTalleres);
router.get('/api/taller/:nombre', TallerController.getTallerPorNombre); // Cambiado a nombre
router.put('/api/taller/:id', TallerController.putTaller);
router.post('/api/taller', TallerController.postTaller);
router.delete('/api/taller/:id_Taller', TallerController.deleteTaller);
 
export default router;
 

