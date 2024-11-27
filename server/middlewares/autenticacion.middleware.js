/*
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
  // Obtener el token desde el encabezado Authorization
  const token = req.header("Authorization");

  // Si no se encuentra el token, devolver error
  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. Token no encontrado." });
  }

  try {
    // El token se pasa en formato "Bearer <token>", por lo que se extrae el token
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

    // Adjuntar la información del usuario decodificada al objeto req
    req.user = decoded;

    // Continuar con la siguiente función
    next();
  } catch (error) {
    // Si hay un error con el token (expirado, inválido), devolver error
    return res.status(400).json({ message: "Token no válido." });
  }
};

export default authMiddleware;
*/


import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401) 
      .json({ message: "Acceso denegado. Token no encontrado." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Token no valido." });
  }
  console.error("Error al iniciar sesión: ", error);
};
