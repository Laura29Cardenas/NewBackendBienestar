import { Router } from "express";
import AutenticacionController from '../controllers/autenticacion.controller.js';

const router = Router();

router.post('/api/login',  AutenticacionController.login)

export default router 