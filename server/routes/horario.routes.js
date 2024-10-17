import { Router } from "express";
import HorarioController from "../controllers/horario.controller.js";

const router = Router();

router.get( '/api/horario', HorarioController.getHorarios )
router.get( '/api/horario/:id',HorarioController.getHorario )
router.put( '/api/horario/:id', HorarioController.putHorario )
router.post( '/api/horario', HorarioController.postHorario )
router.delete( '/api/horario/:id', HorarioController.deleteHorario )
router.get('/api/horarios/:numero_Ficha/:cordinacion_Ficha', HorarioController.getHorariosfc);
export default router; 