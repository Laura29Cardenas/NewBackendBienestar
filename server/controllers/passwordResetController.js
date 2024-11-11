import { User } from '../models/User'; // Asumiendo que tienes un modelo User
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendResetEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Restablece tu contraseña',
    text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    // Verifica que el usuario exista en la base de datos
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Crear un token JWT que caducará en 1 hora
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Enviar el correo con el enlace para restaurar la contraseña
    await sendResetEmail(email, token);

    return res.status(200).json({ message: 'Correo de restauración enviado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
  }
}; 
 