import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Taller extends Model {
    static async createTaller(taller) {
        try {
            return await this.create(taller);
        } catch (error) {
            console.error(`Error al crear taller: ${error}`);
            throw error;
        }
    }

    static async getTallerPorNombre(nombreTaller) {
      try {
          console.log("Ejecutando consulta para:", nombreTaller); // Log antes de ejecutar la consulta
           
          const [results] = await sequelize.query('CALL ObtenerTallerPorNombre(:nombre)', {
              replacements: { nombre: nombreTaller },
              type: sequelize.QueryTypes.RAW
          });
  
          console.log("Resultados de la consulta:", results); // Log para ver los resultados de la consulta
          
          return results;
      } catch (error) {
          console.error("Error en la consulta de taller por nombre:", error.message); // Log para errores
          throw error;
      }
  }   

    static async getTalleres() { 
        try {
            return await this.findAll();
        } catch (error) {
            console.error(`Error al encontrar los talleres: ${error}`);
            throw error;
        }
    }

    static async getTaller(id) {
        try {
            return await this.findByPk(id);
        } catch (error) {
            console.error(`Error al encontrar el taller: ${error}`);
            throw error;
        }
    }

    static async updateTaller(id, update_taller) {
        try {
            const taller = await this.findByPk(id);
            return taller.update(update_taller);
        } catch (error) {
            console.error(`Error al actualizar el taller: ${error}`);
            throw error;
        }
    }

    static async eliminarTaller(id_Taller) {
        try {
            const result = await this.destroy({ where: { id_Taller } });
            return result;
        } catch (error) {
            console.error(`Error al eliminar el taller: ${error}`);
            throw error;
        }
    }
}

Taller.init(
    {
        id_Taller: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre_Taller: { type: DataTypes.STRING(40), allowNull: false },
        tipo_Taller: { type: DataTypes.STRING(55), allowNull: false },
    },
    {
        sequelize, 
        tableName: "Taller",
        timestamps: false,
        underscored: false
    }
);

export { Taller };
