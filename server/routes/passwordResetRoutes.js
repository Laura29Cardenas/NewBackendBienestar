import express from 'express';
import { requestPasswordReset } from '../controllers/passwordResetController.js';  // Verifica la ruta aquí

const router = express.Router();

// Ruta para la solicitud de recuperación de contraseña
router.post('/cambiar-clave', requestPasswordReset);

export default router;
 