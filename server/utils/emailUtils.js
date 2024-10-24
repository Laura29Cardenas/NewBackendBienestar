import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
}); 

export const sendResetEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Restablecimiento de Contraseña',
    html: `<h1>Restablecimiento de Contraseña</h1>
           <p>Para restablecer su contraseña, haga clic en el siguiente enlace:</p>
           <a href="http://localhost:3000/cambiar-clave/${token}">Restablecer Contraseña</a>`,
  };
  await transporter.sendMail(mailOptions);
};
