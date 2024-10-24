import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class ProgramacionCapaTaller extends Model {
  
  static async createProgramacionCT(data) {
    try {
      return await this.create(data);
    } catch (error) {
      console.error(`Error al crear la programación: ${error}`);
      throw error;
    }
  }

  // Llamar al procedimiento almacenado para obtener la programación por ficha
  static async getProgramacionPorFicha(ficha, cordinacion) {
    try {
      const programaciones = await sequelize.query(
        'CALL ObtenerProgramacionPorFicha(:ficha, :cordinacion)', 
        {
          replacements: { ficha, cordinacion },
          type: sequelize.QueryTypes.SELECT
        }
      );

      // Filtrar duplicados por 'fecha_procaptall' y 'horaInicio_procaptall'
      return programaciones.filter((programacion, index, self) =>
        index === self.findIndex((p) => 
          p.fecha_procaptall === programacion.fecha_procaptall && 
          p.horaInicio_procaptall === programacion.horaInicio_procaptall
        )
      );

    } catch (error) {
      console.error('Error al ejecutar ObtenerProgramacionPorFicha:', error);
      throw error;
    }
  }

  // Método para obtener el informe
  static async getInforme(fecha, sede, coordinacion, numeroFicha, ambiente) {
    try {
        const result = await sequelize.query(
            'CALL ObtenerProgramacionPorFicha(:numeroFicha, :coordinacion, :fecha, :sede, :ambiente)', 
            {
                replacements: { numeroFicha, coordinacion, fecha, sede, ambiente },
                type: sequelize.QueryTypes.SELECT
            }
        );

        console.log("Resultado de la consulta:", result); 

        // Verificar si hay datos
        if (result.length > 0 && result[0]['0']) {
            return result[0]['0']; // Retornar solo el primer objeto relevante
        } else {
            return null; // Devolver null si no hay resultados
        }
    } catch (error) {
        console.error(`Error al obtener el informe: `, error);
        throw error;
    }
}

  // Método para obtener programaciones por sede
  static async getProgramacionesBySede(sede) {
    try {
      return await sequelize.query(
        'CALL ObtenerProgramacionPorSede(:sede)',
        {
          replacements: { sede },
          type: sequelize.QueryTypes.SELECT
        }
      );
    } catch (error) {
      console.error(`Error al obtener las programaciones por sede (${sede}): `, error);
      throw error;
    }
  }

  static async getProgramacionesCT() {
    try {
      return await this.findAll();
    } catch (error) {
      console.error(`Error al encontrar las programaciones: ${error}`);
      throw error;
    }
  }

  static async getProgramacionCT(id_procaptall) {
    try {
      return await this.findByPk(id_procaptall);
    } catch (error) {
      console.error(`Error al encontrar la programación: ${error}`);
      throw error;
    }
  }

  // Métodos para obtener programaciones por sede específicas
  static async getProgramacionesBySede52() {
    try {
      return await sequelize.query(
        'CALL ObtenerProgramacionPorSede52()', 
        {
          type: sequelize.QueryTypes.SELECT
        }
      );
    } catch (error) {
      console.error(`Error al obtener las programaciones por sede 52:`, error);
      throw error;
    }
  } 

  static async getProgramacionesBySede64() {
    try {
      return await sequelize.query(
        'CALL ObtenerProgramacionPorSede64()',
        {
          type: sequelize.QueryTypes.SELECT
        }
      );
    } catch (error) {
      console.error(`Error al obtener las programaciones por sede 64:`, error);
      throw error;
    }
  }

  static async getProgramacionesBySedeFontibon() {
    try {
      return await sequelize.query(
        'CALL ObtenerProgramacionPorSedeFontibon()',
        {
          type: sequelize.QueryTypes.SELECT
        }
      );
    } catch (error) {
      console.error(`Error al obtener las programaciones por sede Fontibón:` , error);
      throw error;
    }
  }

  static async updateProgramacionCT(id_procaptall, update_programacionCT) {
    try {
      const programacionCT = await this.findByPk(id_procaptall);
      return programacionCT.update(update_programacionCT);
    } catch (error) {
      console.error(`Error no se actualizó la programación: ${error}`);
      throw error;
    }
  }

  static async eliminarProgramacionCT(id_procaptall) {
    try {
      const programacionCT = await ProgramacionCapaTaller.destroy({
        where: { id_procaptall },
      });
      return programacionCT;
    } catch (error) {
      console.error(`Error al eliminar la programación: ${error}`);
      throw error;
    }
  }
}

ProgramacionCapaTaller.init(
  {
    id_procaptall: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // Asegúrate de tener autoIncrement si es necesario
    sede_procaptall: {
      type: DataTypes.ENUM("SEDE 52", "SEDE 64", "SEDE FONTIBON"),
      allowNull: false,
    },
    descripcion_procaptall: { type: DataTypes.STRING(50), allowNull: false },
    ambiente_procaptall: { type: DataTypes.STRING(80), allowNull: false },
    fecha_procaptall: { type: DataTypes.DATE, allowNull: false },
    horaInicio_procaptall: { type: DataTypes.TIME, allowNull: false },
    horaFin_procaptall: { type: DataTypes.TIME, allowNull: false },
    id_TallerFK: { type: DataTypes.INTEGER, allowNull: false },
    id_CapacFK: { type: DataTypes.INTEGER, allowNull: false },
    numero_FichaFK: { type: DataTypes.INTEGER, allowNull: false },
    // Eliminar cordinacion_Ficha de aquí, ya que debería estar en la tabla Ficha, no en esta tabla
  },
  {
    sequelize,
    tableName: "ProgramacionCapaTaller",
    timestamps: false,
    underscored: false,
  }
);

export { ProgramacionCapaTaller };
