import { Rol } from "../models/rol.model.js";

class RolController{

  static async getRoles(req, res) {
    try {
      const roles = await Rol.getRoles();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los roles" + error });
    }
  } 

  static async getRol(req, res) {
    try {
      const id = req.params.id;  
      const rol = await Rol.getRol(id);
      if (rol) {
        res.status(200).json(rol);
      } else {
        res.status(404).json({ message: "Rol no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el rol" + error });
    }
  }

  static async putRol(req, res) {
    try {
      const update_rol = {
        id_Rol: req.body.id_Rol,
        nombre_Rol: req.body.nombre_Rol,
      };
      const id = req.params.id;
      await Rol.updateRol(id, update_rol);
      res.status(200).json({ message: "Rol actualizado con éxito" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al actualizar el rol" + error });
    }
  }

  static async postRol(req, res) {
    try {
      const ro = {
        id_Rol: req.body.id_Rol,
        nombre_Rol: req.body.nombre_Rol,
      };
      await Rol.createRol(ro);
      res.status(201).json({ message: "Rol creado con exito" });
    } catch (error) {
      res.status(500).json({ message: "Error al crear rol" + error });
    }
  }
}

export  default RolController;