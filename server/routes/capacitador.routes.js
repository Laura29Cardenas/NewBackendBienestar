import { Router } from "express";
import CapacitadorController from '../controllers/capacitador.controller.js';

const router = Router();

router.get( '/api/capacitador',  CapacitadorController.getCapacitadores )
router.get( '/api/capacitador/:id',  CapacitadorController.getCapacitador )
router.put( '/api/capacitador/:id',  CapacitadorController.putCapacitador )
router.post( '/api/capacitador',  CapacitadorController.postCapacitador )

export default router;     