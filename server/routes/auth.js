// controllers/auth.controller.js
import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import User from '../models/User.js'; // Asegúrate de que esta ruta sea correcta
import crypto from 'crypto';
import bcrypt from 'bcrypt'; // Para encriptar la nueva contraseña

dotenv.config(); // Cargar variables de entorno

const router = express.Router();

// Ruta para restablecer la contraseña
router.post('/cambiar-clave', async (req, res) => { // Cambiado a cambiar-clave
  const { email } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Generar un token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token; // Guarda el token en el usuario
    await user.save();

    // Configurar el transporte de Nodemailer para Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER = "soydanielra@gmail.com",
        pass: process.env.GMAIL_PASS = "abgo fbls snjb pmuj",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // Configurar el contenido del correo
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Restablecimiento de Contraseña',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
              }
              .container {
                width: 100%;
                max-width: 600px;
                margin: auto;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                background-color: #4CAF50;
                padding: 20px;
                text-align: center;
                color: white;
                border-radius: 10px 10px 0 0;
              }
              .content {
                padding: 20px;
              }
              .footer {
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #777;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Restablecimiento de Contraseña</h1>
              </div>
              <div class="content">
                <p>Para restablecer su contraseña, haga clic en el siguiente enlace:</p>
                <a href="http://localhost:3000/cambiar-clave/${token}">Restablecer Contraseña</a>
                <p>Si no solicitó este cambio, ignore este correo.</p>
              </div>
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} SENA. Todos los derechos reservados.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Enlace de restablecimiento de contraseña enviado.' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ message: 'Error al enviar el correo.' });
  }
});

// Ruta para cambiar la contraseña
// Ruta para cambiar la contraseña
router.post('/cambiar-clave/:token', async (req, res) => {
    const { token } = req.params; // Asegúrate de que el token se obtenga de los parámetros
    const { newPassword } = req.body;

    try {
        // Verificar si el token es válido
        const user = await User.findOne({ where: { resetPasswordToken: token } });
        if (!user) {
            return res.status(400).json({ message: 'Token inválido o ha expirado' });
        }

        // Encriptar la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword; // Actualiza la contraseña
        user.resetPasswordToken = null; // Limpiar el token
        await user.save();

        res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error('Error en la ruta de cambiar-clave:', error); // Asegúrate de que esto imprima el error
        res.status(500).json({ message: 'Error en la solicitud', error: error.message }); // Agrega el mensaje del error
    }
}); 

// Exportar las rutas
export default router;
