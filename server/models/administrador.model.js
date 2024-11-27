import { DataTypes, INTEGER, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Administrador extends Model { 

  static async createAdministrador(administrador) {
    try {
      return await this.create(administrador);
    } catch (error) {
      console.error(`error al crear administrador: ${error}`);
      throw error;
    }  
  }

  static async getAdministradores() {
    try {
      const administradores = await this.findAll();
      console.log('Administradores encontrados:', administradores);
      return administradores;
    } catch (error) {
      console.error(`error al encontrar los administradores: ${error}`);
      throw error;
    }
  }

  static async getAdministrador(id) {
    try {
      return await this.findByPk(id);
    } catch (error) {
      console.error(`error al encontrar el administrador: ${error}`);
      throw error;
    }
  }

  static async updateAdministrador(id, update_administrador) {
    try {
      const administrador = await this.findByPk(id);
      return usuario.update( update_administrador )
    } catch (error) {
      console.error(`error no se actualizó el administrador: ${error}`);
      throw error;
    }
  }

}

Administrador.init(
  {
    id_Admin: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_Admin: { type: DataTypes.STRING(50), allowNull: false },
    apellido_Admin: { type: DataTypes.STRING(40), allowNull: false },
    tipodoc_Admin: {type: DataTypes.ENUM('CC', 'CE', 'NIT', 'PEP'), allowNull: false },
    documento_Admin:  { type: DataTypes.INTEGER, allowNull: false },
    genero_Admin: {type: DataTypes.ENUM('Masculino', 'Femenino'), allowNull: false },
    id_Usua2FK: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize, 
    tableName: "Administrador",
    timestamps: false,
    underscored: false
  }
);

export { Administrador };