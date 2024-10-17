import { DataTypes, INTEGER, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Ficha extends Model {
  static async createFicha(ficha) {
    try {
      return await this.create(ficha);
    } catch (error) {
      console.error(`error al crear ficha: ${error}`);
      throw error;
    }
  } 

  static async getFichas() {
    try {
      return await this.findAll();
    } catch (error) {
      console.error(`error al encontrar las fichas: ${error}`);
      throw error;
    }
  }

  static async getFicha(numero_Ficha) {
    try {
      return await this.findByPk(numero_Ficha);
    } catch (error) {
      console.error(`error al encontrar la ficha: ${error}`);
      throw error;
    }
  }


  static async updateFicha(numero_Ficha, update_ficha) {
    try {
        const ficha = await this.findByPk(numero_Ficha); // Asegúrate de que estás usando numero_Ficha aquí
        if (!ficha) {
            throw new Error('Ficha no encontrada');
        }
        return await ficha.update(update_ficha);
    } catch (error) {
        console.error(`error no se actualizó la ficha: ${error}`);
        throw error;
    }
  }


  static async eliminarFicha(numero_Ficha) {
    try {
      const ficha = await Ficha.destroy({ where: { numero_Ficha } });
      return ficha;
    } catch (error) {
      console.error(`error al eliminar la ficha: ${error}`);
      throw error;
    }
  }

}

Ficha.init(
  {
    numero_Ficha: { type: DataTypes.INTEGER, primaryKey: true },
    cordinacion_Ficha: { type: DataTypes.STRING(40), allowNull: false },
  },
  {
    sequelize,
    tableName: "Ficha",
    timestamps: false,
    underscored: false,
  }
);

export { Ficha };
