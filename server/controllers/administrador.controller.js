import { Administrador } from "../models/administrador.model.js";

class AdministradorController{

  static async getAdministradores(req, res) {
    try {
      const administradores = await Administrador.getAdministradores();
      res.status(200).json(administradores);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los administradores" + error });
    }
  } 
  static async getAdministrador(req, res) {
    try {
      const id = req.params.id;
      const administrador = await Administrador.getAdministrador(id);
      if (administrador) {
        res.status(200).json(administrador);
      } else {
        res.status(404).json({ message: "Administrador no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el administrador" + error });
    }
  }

  static async putAdministrador(req, res) {
    try {
      const update_administrador = {
        nombre_Admin: req.body.nombre_Admin,
        apellido_Admin: req.body.apellido_Admin,
        tipodoc_Admin: req.body.tipodoc_Admin,
        documento_Admin: req.body.documento_Admin,
        genero_Admin: req.body.genero_Admin,
        id_Usua2FK: req.body.id_Usua2FK,
      };
      const id = req.params.id;
      await Administrador.updateAdministrador(id, update_administrador);
      res.status(200).json({ message: "Administrador actualizado con éxito" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al actualizar el administrador" + error });
    }
  }

  static async postAdministrador(req, res) {
    try {
      const ad = {
        nombre_Admin: req.body.nombre_Admin,
        apellido_Admin: req.body.apellido_Admin,
        tipodoc_Admin: req.body.tipodoc_Admin,
        documento_Admin: req.body.documento_Admin,
        genero_Admin: req.body.genero_Admin,
        id_Usua2FK: req.body.id_Usua2FK,
      };
      await Administrador.createAdministrador(ad);
      res.status(201).json({ message: "Administrador creado con exito" });
    } catch (error) {
      res.status(500).json({ message: "Error al crear Administrador" + error });
    }
  }
}

export  default AdministradorController;