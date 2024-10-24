import { DataTypes, INTEGER, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class DisponibilidadBienestar extends Model { 
  static async createDispoB(taller) {
    try {
      return await this.create(dispoB);
    } catch (error) {
      console.error(`error al crear disponibilidad de bienestar: ${error}`);
      throw error;
    }
  } 

  static async getDisponibilidadesB() {
    try {
      return await this.findAll();
    } catch (error) {
      console.error(`error al encontrar las disponibilidades de bienestar: ${error}`);
      throw error;
    }
  }

  static async getDispoB(id) {
    try {
      return await this.findByPk(id);
    } catch (error) {
      console.error(`error al encontrar la dsponibilidad de bienestar: ${error}`);
      throw error;
    }
  }

  static async updateDispoB(id, update_dispoB) {
    try {
      const dispoB = await this.findByPk(id);
      return dispoB.update( update_dispoB )
    } catch (error) {
      console.error(`error no se actualizó la disponibilidad de bienestar: ${error}`);
      throw error;
    }
  }

  static async eliminarDispoB(id_dispoB) {
    try {
      const dispoB = await DisponibilidadBienestar.destroy({ where: { id_dispoB } });
      return dispoB;
    } catch (error) {
      console.error(`error al eliminar la disponibilidad de bienestar: ${error}`);
      throw error;
    }
  }

}

DisponibilidadBienestar.init(
  {
    id_dispoB: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    jornada_dispoB: { type: DataTypes.ENUM('Mañana', 'Tarde', 'Noche'), allowNull: false },
    horaInicio_dispoB: { type: DataTypes.TIME, allowNull: false },
    horaFin_dispoB: { type: DataTypes.TIME, allowNull: false },
    fechaDias_dispoB: { type: DataTypes.STRING(40), allowNull: false },
  },
  {
    sequelize, 
    tableName: "DisponibilidadBienestar",
    timestamps: false,
    underscored: false
  }
);

export {DisponibilidadBienestar};
