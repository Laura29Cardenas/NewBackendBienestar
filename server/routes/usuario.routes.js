import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller.js";

const router = Router();

router.get( '/api/usuario', UsuarioController.getUsuarios )
router.get('/api/usuario/tipoDoc/:tipoDoc/documento/:documento/nombre/:nombre?', UsuarioController.getUsuario)
router.get('/api/perfil/:id', UsuarioController.getPerfil)
router.put('/api/usuario/:id_Usuario', UsuarioController.putUsuario)
router.post( '/api/usuario', UsuarioController.postUsuario )
router.delete( '/api/usuario/:id', UsuarioController.inactivarUsuario )

export default router; 