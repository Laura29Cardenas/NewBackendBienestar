import { DataTypes, INTEGER, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Horario extends Model { 
  static async createHorario(horario) {
    try {
      return await this.create(horario);
    } catch (error) {
      console.error(`error al crear horario: ${error}`);
      throw error;
    }
  }
 

  static async getHorarios() {
    try {
      return await this.findAll();
    } catch (error) {
      console.error(`error al encontrar los horarios: ${error}`);
      throw error;
    }
  }

  static async getHorario(id) {
    try {
      return await this.findByPk(id);
    } catch (error) {
      console.error(`error al encontrar el horario: ${error}`);
      throw error;
    }
  }

  static async getHorariosPorFichaYCoordinacion(numero_Ficha, cordinacion_Ficha) {
    try {
      const [results] = await sequelize.query(`
        CALL ObtenerHorariosPorFichaYCoordinacion(:numero_Ficha, :cordinacion_Ficha)
      `, {
        replacements: { numero_Ficha, cordinacion_Ficha },
      });
      return results;
    } catch (error) {
      console.error(`Error al obtener horarios: ${error}`);
      throw error;
    }
  }

  static async updateHorario(id, update_horario) {
    try {
      const horario = await this.findByPk(id);
      return horario.update( update_horario )
    } catch (error) {
      console.error(`error no se actualizó el horario: ${error}`);
      throw error;
    }
  }

  static async deleteHorario(id) {
    try {
      return await this.findByPk(id);
    } catch (error) {
      console.error(`error al eliminar la ficha: ${error}`);
      throw error;
    }
  }


}

Horario.init(
  {
    id_Horari: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tamatica_Horari: { type: DataTypes.STRING(50), allowNull: false },
    ambiente_Horari: { type: DataTypes.STRING(50), allowNull: false },
    fecha_iniciotrimestre_Horari:  { type: DataTypes.DATE, allowNull: false },
    fecha_fintrimestre_Horari: { type: DataTypes.DATE, allowNull: false },
    aprendices_formacionfecha_Horari: { type: DataTypes.INTEGER, allowNull: false },
    horas_asignadastrimestre_Horari: { type: DataTypes.INTEGER, allowNull: false },
    bloque_horaclase_Horari:  { type: DataTypes.STRING(25), allowNull: false },
    fechaDia_Horari: { type: DataTypes.STRING(30), allowNull: false },
    id_InstrucFK: { type: DataTypes.INTEGER, allowNull: false },
    numero_FichaFK: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize, 
    tableName: "Horario",
    timestamps: false,
    underscored: false
  }
);

export {Horario};
