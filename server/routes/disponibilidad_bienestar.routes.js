import { Router } from "express";
import DisponibilidadBienestarController  from "../controllers/disponibilidad_bienestar.controller.js";



const router = Router();

router.get( '/api/dispoB', DisponibilidadBienestarController.getDisponibilidadesB )
router.get( '/api/dispoB/:id', DisponibilidadBienestarController.getDispoB )
router.put( '/api/dispoB/:id', DisponibilidadBienestarController.putDispoB )
router.post( '/api/dispoB', DisponibilidadBienestarController.postDispoB )
router.delete( '/api/dispoB/:id_dispoB', DisponibilidadBienestarController.deleteDispoB )

export default router; 