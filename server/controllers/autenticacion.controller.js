import { Usuario } from "../models/usuario.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';

dotenv.config();

class AutenticacionController { 
  static async login(req, res) {
    try {
      const { correo_Usua, clave_Usua } = req.body;
      console.log("este es el correo", correo_Usua);
      const usuario = await Usuario.findOne({where: { correo_Usua: correo_Usua }});

      if (usuario) {
        const isMatch = await usuario.comparar_clave(clave_Usua);
        if (isMatch) {
          const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });

          return res.status(200).json({
            message: "Inicio de sesión exitoso",
            token,
            user: {
              id: usuario.id_Usua,
              correo: usuario.correo_Usua,
              rol: usuario.id_Rol1FK,
              nombre: usuario.nombre_Usua,
              apellido: usuario.apellido_Usua,
              genero: usuario.genero_Usua,
              tipoDocumento: usuario.tipoDoc_Usua,
              documento: usuario.doc_Usua
            },
          });
        } else {
          return res.status(401).json({ message: "Contraseña incorrecta" });
        }
      } else {
        return res
          .status(401)
          .json({ message: "Correo electrónico no existe" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al iniciar sesión: " + error });
    }
  }
}

export default AutenticacionController;