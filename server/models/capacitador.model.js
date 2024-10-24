import { DataTypes, INTEGER, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Capacitador extends Model {
  static async createCapacitador(capacitador) {
    try {
      return await this.create(capacitador);
    } catch (error) {
      console.error(`error al crear capacitador: ${error}`);
      throw error;
    }
  }

  static async getCapacitadores() {
    try {
      return await this.findAll();
    } catch (error) {
      console.error(`error al encontrar los capacitadores: ${error}`);
      throw error;
    }
  }

  static async getCapacitador(id) {
    try {
      return await this.findByPk(id);
    } catch (error) {
      console.error(`error al encontrar el capacitador: ${error}`);
      throw error;
    }
  }

  static async updateInstructor(id, update_capacitador) {
    try {
      const capacitador = await this.findByPk(id);
      return capacitador.update( update_capacitador )
    } catch (error) {
      console.error(`error no se actualizó el capacitador: ${error}`);
      throw error;
    }
  } 

}
 
Capacitador.init(
  {
    id_Capac: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_Capac: { type: DataTypes.STRING(40), allowNull: false },
    apellido_Capac: { type: DataTypes.STRING(45), allowNull: false },
    tipodoc_Capac: {type: DataTypes.ENUM('CC', 'CE', 'NIT', 'PEP'), allowNull: false },
    documento_Capac:  { type: DataTypes.INTEGER, allowNull: false },
    genero_Capac: {type: DataTypes.ENUM('Masculino', 'Femenino'), allowNull: false },
    id_Usua1FK: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize, 
    tableName: "Capacitador",
    timestamps: false,
    underscored: false
  }
);

export {Capacitador};