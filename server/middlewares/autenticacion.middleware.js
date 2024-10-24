import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.header("Autorizacion");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. Token no encontrado." });
  }
 
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRECT);
    req.user = decoded;
    next();
  } catch (error) { 
    return res.status(400).json({ message: "Token no valido." });
  }

};