import { Router } from "express";
import AdministradorController from "../controllers/administrador.controller.js";

const router = Router();

router.get('/api/administrador', AdministradorController.getAdministradores);
router.get('/api/administrador/:id', AdministradorController.getAdministrador);
router.put('/api/administrador/:id', AdministradorController.putAdministrador);
router.post('/api/administrador', AdministradorController.postAdministrador);

export default router;      