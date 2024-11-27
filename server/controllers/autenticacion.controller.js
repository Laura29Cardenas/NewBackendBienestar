/*
import { Usuario } from "../models/usuario.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

class AutenticacionController {
  static async login(req, res) {
    try {
      // Obtener correo y clave del cuerpo de la solicitud
      const { correo_Usua, clave_Usua } = req.body;
      console.log("Correo recibido:", correo_Usua);

      // Buscar al usuario por correo
      const usuario = await Usuario.findOne({
        where: { correo_Usua: correo_Usua },
      });

      // Si el usuario existe
      if (usuario) {
        console.log("Usuario encontrado:", usuario);

        // Comparar la contraseña proporcionada con la almacenada en la base de datos
        const isMatch = await usuario.comparar_clave(clave_Usua);

        console.log("¿Contraseña coincide?:", isMatch);

        if (isMatch) {
          // Crear un token JWT si la contraseña es correcta
          const token = jwt.sign({ id: usuario.id_Usua }, process.env.JWT_SECRET, {
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
              documento: usuario.doc_Usua,
            },
          });
        } else {
          // Si las contraseñas no coinciden
          return res.status(401).json({ message: "Contraseña incorrecta" });
        }
      } else {
        // Si no se encuentra el usuario
        return res.status(401).json({ message: "Correo electrónico no existe" });
      }
    } catch (error) {
      // Si ocurre un error en el proceso
      console.error("Error al iniciar sesión:", error);
      return res.status(500).json({ message: "Error al iniciar sesión: " + error.message });
    }
  }
}

export default AutenticacionController;
*/

import { Usuario } from "../models/usuario.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

class AutenticacionController {
  static async login(req, res) {
    try {
      const { correo_Usua, clave_Usua } = req.body;
      console.log("este es el correo", correo_Usua);
      const usuario = await Usuario.findOne({
        where: { correo_Usua: correo_Usua },
      });

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
              documento: usuario.doc_Usua,
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
      res.status(500).json({ message: "Error al iniciar sesión lod: " + error });
    }
  } 

}

export default AutenticacionController;