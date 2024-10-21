import { Router } from "express";
import ProgramacionCapaTallerController from "../controllers/programacion_capa_taller.controller.js";

const router = Router();

// Rutas para programaciones por sede
router.get('/api/programaciones/sede52', ProgramacionCapaTallerController.getProgramacionesPorSede);
router.get('/api/programaciones/sede64', ProgramacionCapaTallerController.getProgramacionesPorSede);
router.get('/api/programaciones/sedeFontibon', ProgramacionCapaTallerController.getProgramacionesPorSede);

// Ruta para obtener todas las programaciones de capacitación
router.get('/api/programacion', ProgramacionCapaTallerController.getProgramacionesCT);

// Ruta para obtener informe 
router.post('/api/obtenerInforme', ProgramacionCapaTallerController.postObtenerInforme);

// Ruta para generar informe PDF
router.post('/api/generarInformePDF', ProgramacionCapaTallerController.postGenerarInformePDF);

// Rutas para programaciones de capacitación
router.get('/api/programacion/:id', ProgramacionCapaTallerController.getProgramacionCT);
router.get('/api/programaciones/:sede', ProgramacionCapaTallerController.getProgramacionesPorSede);
router.get('/api/programacion/ficha/:ficha/cordinacion/:cordinacion', ProgramacionCapaTallerController.getProgramacionesPorFicha);
router.put('/api/programacion/:id', ProgramacionCapaTallerController.putProgramacionCT);
router.post('/api/programacion', ProgramacionCapaTallerController.postProgramacionCT);
router.delete('/api/programacion/:id_procaptall', ProgramacionCapaTallerController.deleteProgramacionCT);

export default router;

