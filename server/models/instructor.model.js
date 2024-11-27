import { DataTypes, INTEGER, Model } from "sequelize";
import { sequelize } from "../config/db.js";
 
class Instructor extends Model {
  static async createInstructor(instructor) {
    try {
      return await this.create(instructor);
    } catch (error) {
      console.error(`error al crear instructor: ${error}`);
      throw error;
    }
  } 

  static async getInstructores() {
    try { 
      return await this.findAll();
    } catch (error) {
      console.error(`error al encontrar los instructores: ${error}`);
      throw error;
    }
  }

  static async getInstructor(id) {
    try {
      return await this.findByPk(id);
    } catch (error) {
      console.error(`error al encontrar el instructor: ${error}`);
      throw error;
    }
  }

  static async updateInstructor(id, update_instructor) {
    try {
      const instructor = await this.findByPk(id);
      return instructor.update( update_instructor )
    } catch (error) {
      console.error(`error no se actualizó el instructor: ${error}`);
      throw error;
    }
  }

}

Instructor.init(
  {
    id_Instruc: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_Instruc: { type: DataTypes.STRING(50), allowNull: false },
    apellido_Instruc: { type: DataTypes.STRING(40), allowNull: false },
    tipodoc_Instruc: {type: DataTypes.ENUM('CC', 'CE', 'NIT', 'PEP'), allowNull: false },
    documento_Instruc:  { type: DataTypes.INTEGER, allowNull: false },
    genero_Instruc: {type: DataTypes.ENUM('Masculino', 'Femenino'), allowNull: false },
    id_Usua3FK: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize, 
    tableName: "Instructor",
    timestamps: false,
    underscored: false
  }
);

export {Instructor};