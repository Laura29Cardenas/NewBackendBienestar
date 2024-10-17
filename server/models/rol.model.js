import { DataTypes, INTEGER, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Rol extends Model {
  static async createRol(Rol) {
    try {
      return await this.create(Rol);
    } catch (error) {
      console.error(`error al crear rol: ${error}`);
      throw error;
    }
  } 

  static async getRoles() {
    try {
      return await this.findAll();
    } catch (error) {
      console.error(`error al encontrar los roles: ${error}`);
      throw error;
    }
  }

  static async getRol(id) {
    try {
      return await this.findByPk(id);
    } catch (error) {
      console.error(`error al encontrar el rol: ${error}`);
      throw error;
    }
  }

  static async updateRol(id, update_rol) {
    try {
      const rol = await this.findByPk(id);
      return rol.update( update_rol )
    } catch (error) {
      console.error(`error no se actualizó el rol: ${error}`);
      throw error;
    }
  }

}

Rol.init(
  {
    id_Rol: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_Rol: { type: DataTypes.STRING(30), allowNull: false },
  },
  {
    sequelize, 
    tableName: "Rol",
    timestamps: false,
    underscored: false
  }
);

export {Rol};
