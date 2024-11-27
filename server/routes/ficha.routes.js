import { Router } from "express";
import FichaController from "../controllers/ficha.controller.js";

const router = Router();

router.get( '/api/ficha',  FichaController.getFichas )
router.get( '/api/ficha/:id',  FichaController.getFicha )
router.put( '/api/ficha/:numero_Ficha',  FichaController.putFicha )
router.post( '/api/ficha',  FichaController.postFicha )
router.delete( '/api/ficha/:numero_Ficha',  FichaController.deleteFicha )

export default router;        