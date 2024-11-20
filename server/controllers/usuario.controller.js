import { Capacitador } from "../models/capacitador.model.js"; // Ajusta la ruta según tu estructura de directorios
import { Administrador } from "../models/administrador.model.js";
import { Instructor } from "../models/instructor.model.js";
import { Usuario } from "../models/usuario.model.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Definir __filename y __dirname para trabajar con importación en ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class UsuarioController {
  // Método para enviar enlace de restauración de contraseña
  static async sendPasswordResetEmail(req, res) {
    const { email } = req.body;

    try {
      // Verificar si el correo está registrado en la base de datos
      const usuario = await Usuario.findOne({ where: { correo_Usua: email } });
      if (!usuario) {
        return res
          .status(404)
          .json({ message: "El correo electrónico no está registrado." });
      }

      // Crear un token de restablecimiento (puedes usar JWT o cualquier otra técnica)
      const token = "some_unique_token"; // Aquí generas un token para el enlace de restablecimiento

      // Configurar el transporte para enviar el correo (usando Gmail SMTP)
      const transporter = nodemailer.createTransport({
        service: "gmail", // Usa Gmail como servicio SMTP
        auth: {
          user: process.env.GMAIL_USER || "lcardenasavila07@gmail.com", // Tu correo de Gmail
          pass: process.env.GMAIL_PASS || "bsec ilav ofjv lzjb", // Tu contraseña de Gmail o contraseña de aplicación
        },
        tls: {
          rejectUnauthorized: false, // Deshabilitar la verificación de seguridad para evitar posibles errores
        },
      });

      // Opciones del correo
      const mailOptions = {
        from: '"Sistema de Restablecimiento de Clave" <no-reply@gmail.com>', // Remitente
        to: email, // Destinatario
        subject: "Restablecimiento de Contraseña",
        text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: 
        http://localhost:3000/restablecer-clave/${token}`, // Asegúrate de que el puerto y la URL sean correctos
      };

      // Enviar el correo
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Correo de restablecimiento enviado." });
    } catch (error) {
      console.error("Error al enviar el correo:", error); // Log completo del error
      res
        .status(500)
        .json({ message: "Error al enviar el correo.", error: error.message });
    }
  }

  // Método estático para iniciar sesión
  static async login(req, res) {
    const { correo, contraseña } = req.body;

    // Validar que el correo y la contraseña no estén vacíos
    if (!correo || !contraseña) {
      return res
        .status(400)
        .json({ message: "Correo y contraseña son requeridos." });
    }

    try {
      console.log("Correo recibido:", correo);
      console.log("Contraseña recibida:", contraseña);

      // Buscar al usuario por correo
      const usuario = await Usuario.findOne({ where: { correo_Usua: correo } });

      // Verificar si el usuario existe
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado." });
      }

      // Comparar la contraseña ingresada con la almacenada en la base de datos
      const contrasenaValida = await bcrypt.compare(
        contraseña,
        usuario.clave_Usua
      );

      if (!contrasenaValida) {
        return res.status(401).json({ message: "Contraseña incorrecta." });
      }

      // Crear un JWT para el usuario
      const token = jwt.sign(
        { id_Usua: usuario.id_Usua },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h", // Puedes cambiar el tiempo de expiración
        }
      );

      // Retornar el token y el mensaje de éxito
      return res.status(200).json({
        message: "Inicio de sesión exitoso.",
        token: token,
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return res.status(500).json({ message: "Error interno del servidor." });
    }
  }

  // Método estático para restablecer la contraseña
  static async resetPassword(req, res) {
    const { token } = req.params; // Obtener el token de la URL
    const { newPassword } = req.body;

    try {
      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id_Usua;

      // Buscar al usuario en la base de datos
      const usuario = await Usuario.findOne({ where: { id_Usua: userId } });

      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado." });
      }

      // Encriptar la nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Actualizar la contraseña del usuario
      await Usuario.update(
        { clave_Usua: hashedPassword },
        { where: { id_Usua: userId } }
      );

      res.status(200).json({ message: "Contraseña actualizada con éxito." });
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      res.status(500).json({ message: "Error al restablecer la contraseña." });
    }
  }

  // Nuevo método para obtener el perfil del usuario
  static async getPerfil(req, res) {
    try {
      const id = req.params.id;
      const perfil = await Usuario.obtenerPerfilUsuario(id); // Llamamos a la función en el modelo

      if (!perfil) {
        return res.status(404).json({ message: "Perfil no encontrado" });
      }
      res.status(200).json(perfil);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el perfil del usuario: " + error.message,
      });
    }
  }

  static async getUsuarios(req, res) {
    try {
      const usuarios = await Usuario.getUsuarios();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuarios" + error });
    }
  }

  static async getUsuario(req, res) {
    const { tipoDoc, documento, nombre } = req.params;

    try {
      if (tipoDoc && documento) {
        // Ejecuta el procedimiento almacenado y captura el resultado completo
        const results = await Usuario.getbuscarUsuario(
          tipoDoc,
          documento,
          nombre || null
        );

        // Extrae solo el primer bloque de datos que contiene la información del usuario
        const usuario =
          Array.isArray(results) && results.length > 0 ? results[0] : null;

        console.log("Usuario encontrado:", usuario);

        if (usuario) {
          return res.status(200).json(usuario);
        } else {
          return res.status(404).json({ message: "No se encontró el usuario" });
        }
      } else {
        return res
          .status(400)
          .json({ message: "Faltan parámetros requeridos" });
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      return res
        .status(500)
        .json({ message: "Error al obtener el usuario", error });
    }
  }

  static async putUsuario(req, res) {
    try {
      const {
        nombre,
        apellido,
        correo_Usua,
        clave_Usua,
        genero,
        id_Rol1FK,
        estado,
      } = req.body;
      const id_Usuario = req.params.id_Usuario;

      // Validar que todos los parámetros necesarios estén presentes
      if (
        !nombre ||
        !apellido ||
        !correo_Usua ||
        !genero ||
        !id_Rol1FK ||
        estado === undefined
      ) {
        return res
          .status(400)
          .json({ message: "Faltan parámetros necesarios." });
      }

      // Crear el objeto de usuario a actualizar
      const update_usuario = {
        nombre,
        apellido,
        correo_Usua,
        clave_Usua, // La clave será encriptada en el modelo si se proporciona
        genero,
        id_Rol1FK,
        estado, // Incluir el estado en la actualización
      };

      // Llamar al método del modelo que invoca el procedimiento almacenado
      await Usuario.updateUsuario(id_Usuario, update_usuario);

      res.status(200).json({ message: "Usuario actualizado con éxito" });
    } catch (error) {
      console.error(`Error al actualizar el usuario: ${error.message}`);
      res
        .status(500)
        .json({ message: `Error al actualizar el usuario: ${error.message}` });
    }
  }

  static async postUsuario(req, res) {
    const {
      correo,
      clave,
      rol,
      nombre,
      apellido,
      genero,
      tipoDocumento,
      documento,
    } = req.body;

    // Validar campos obligatorios comunes
    if (!correo || !clave || !rol) {
      return res
        .status(400)
        .json({ message: "Correo, clave y rol son requeridos." });
    }

    console.log("Rol recibido:", rol); // Log para verificar el rol

    const rolesValidos = [1, 2, 3]; // Define los roles válidos según la base de datos
    if (!rolesValidos.includes(parseInt(rol, 10))) {
      return res.status(400).json({ message: "Rol de usuario no reconocido." });
    }

    // Iniciar una transacción
    const transaction = await Usuario.sequelize.transaction();

    try {
      // Crear usuario base
      const hashedPass = await bcrypt.hash(clave, 10); // Hash de la clave
      const nuevoUsuario = await Usuario.create(
        {
          correo_Usua: correo,
          clave_Usua: hashedPass,
          id_Rol1FK: rol,
        },
        { transaction }
      );

      // Crear datos específicos de cada tipo de usuario
      if (rol === 1) {
        // Administrador
        if (!nombre || !apellido || !tipoDocumento || !documento) {
          throw new Error("Faltan datos para crear un Administrador");
        }

        await Administrador.create(
          {
            nombre_Admin: nombre,
            apellido_Admin: apellido,
            tipodoc_Admin: tipoDocumento,
            documento_Admin: documento,
            genero_Admin: genero,
            id_Usua2FK: nuevoUsuario.id_Usua, // Asegúrate de que esta clave sea consistente
          },
          { transaction }
        );
      } else if (rol === 2) {
        // Instructor
        if (!nombre || !apellido || !tipoDocumento || !documento) {
          throw new Error("Faltan datos para crear un Instructor");
        }

        await Instructor.create(
          {
            nombre_Instruc: nombre,
            apellido_Instruc: apellido,
            tipodoc_Instruc: tipoDocumento,
            documento_Instruc: documento,
            genero_Instruc: genero,
            id_Usua3FK: nuevoUsuario.id_Usua, // Asegúrate de que esta clave sea consistente
          },
          { transaction }
        );
      } else if (rol === 3) {
        // Capacitador
        if (!nombre || !apellido || !tipoDocumento || !documento) {
          throw new Error("Faltan datos para crear un Capacitador");
        }

        await Capacitador.create(
          {
            nombre_Capac: nombre,
            apellido_Capac: apellido,
            tipodoc_Capac: tipoDocumento,
            documento_Capac: documento,
            genero_Capac: genero,
            id_Usua1FK: nuevoUsuario.id_Usua, // Asegúrate de que esta clave sea consistente
          },
          { transaction }
        );
      }

      // Confirmar transacción
      await transaction.commit();
      res.status(201).json({ message: "Usuario creado correctamente." });
    } catch (error) {
      // Revertir transacción en caso de error
      await transaction.rollback();
      console.error(error);
      res
        .status(500)
        .json({ message: "Error al registrar el usuario: " + error.message });
    }
  }

  static async inactivarUsuario(req, res) {
    try {
      const id = parseInt(req.params.id, 10); // Asegúrate de que el ID sea un número entero
      if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
      }
      const result = await Usuario.alternarEstadoUsuario(id);
      res
        .status(200)
        .json({ message: "Estado del usuario alterado con éxito" });
    } catch (error) {
      res.status(500).json({
        message: "Error al alterar el estado del usuario: " + error.message,
      });
    }
  }
}

export default UsuarioController;
