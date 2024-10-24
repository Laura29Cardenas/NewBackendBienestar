// controllers/auth.controller.js
import express from 'express';
import nodemailer from 'nodemailer';
import User from '../models/User.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const router = express.Router();

// Configura tu transportador de nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.soy.sena.edu.co', // Cambia esto si es necesario
  port: 587, // O 465, dependiendo de la configuración
  secure: false, // true para 465, false para otros
  auth: {
    user: 'lccardenas323@soy.sena.edu.co', // Asegúrate de que sea correcto
    pass: 'tu_contraseña', // Asegúrate de que sea correcto
  },
  tls: {
    rejectUnauthorized: false, // Solo para desarrollo
  },
});


// Ruta para cambiar la contraseña
router.post('/cambiar-clave/:token', async (req, res) => {
  const { token } = req.params; // Obtén el token de los parámetros
  const { newPassword } = req.body; // Obtén la nueva contraseña del cuerpo

  try {
    const user = await User.findOne({ where: { resetPasswordToken: token } });
    if (!user) {
      return res.status(400).json({ message: 'Token inválido o ha expirado' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null; // Limpiar el token
    await user.save();

    res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error en la ruta de cambiar-clave:', error);
    res.status(500).json({ message: 'Error en la solicitud' });
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body; 

  try {
      // Verifica que email no sea undefined
      if (!email) {
          return res.status(400).json({ message: 'Email es requerido' });
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Error de autenticación' });
      }

      res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: 'Error en el servidor' });
  }
});


// Exporta el enrutador
export default router;

