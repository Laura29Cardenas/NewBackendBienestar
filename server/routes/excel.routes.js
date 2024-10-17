import { Router } from 'express';
import upload from '../middlewares/upload.middleware.js';
import ExcelController from '../controllers/excel.controller.js';

const router = Router();

router.post('/api/fichas/upload', upload.single('file'), ExcelController.cargarFichas);
router.post('/api/horarios/upload', upload.single('file'), ExcelController.cargarHorarios);
router.post('/api/usuarios/upload', upload.single('file'), ExcelController.cargarUsuarios);
router.post('/api/talleres/upload', upload.single('file'), ExcelController.cargarTalleres);

export default router; 