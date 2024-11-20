import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import { fileURLToPath } from "url"; // Importa la función fileURLToPath
import path from "path"; // Importa el módulo path

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
        "CALL ObtenerProgramacionPorFicha(:ficha, :cordinacion)",
        {
          replacements: { ficha, cordinacion },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      // Filtrar duplicados por 'fecha_procaptall' y 'horaInicio_procaptall'
      return programaciones.filter(
        (programacion, index, self) =>
          index ===
          self.findIndex(
            (p) =>
              p.fecha_procaptall === programacion.fecha_procaptall &&
              p.horaInicio_procaptall === programacion.horaInicio_procaptall
          )
      );
    } catch (error) {
      console.error("Error al ejecutar ObtenerProgramacionPorFicha:", error);
      throw error;
    }
  }

  // Método para obtener el informe
  static async getInforme(fecha, sede, coordinacion, numeroFicha, ambiente) {
    try {
      // Realizamos la consulta SQL
      const result = await sequelize.query(
        "CALL ObtenerProgramacionPorFicha(:numeroFicha, :coordinacion, :fecha, :sede, :ambiente)",
        {
          replacements: { numeroFicha, coordinacion, fecha, sede, ambiente },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      console.log("Resultado de la consulta:", result); // Verifica los datos que estamos obteniendo

      // Si hay resultados, retornar el primer objeto
      if (result.length > 0) {
        return result[0]; // Devuelve el primer resultado
      } else {
        return null; // Si no hay resultados, devuelve null
      }
    } catch (error) {
      console.error(
        "Error al obtener el informe desde el modelo:",
        error.message
      );
      throw error;
    }
  }

  // Método para generar el informe en PDF
  static async generarInformePDF(informe) {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      let buffers = [];
  
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });
  
      // Configuración inicial del documento
      doc.fontSize(12).fillColor('black');
  
      // Título un poco más a la izquierda
      const title = 'Informe de Programación';
      const titleX = 50; // Desplazado un poco hacia la izquierda
      doc.fontSize(18).fillColor('black').text(title, titleX, 30);  // Título más a la izquierda
  
      // Línea verde debajo del título
      doc.moveTo(50, 60)  // Posición de la línea
        .lineTo(doc.page.width - 50, 60)  // Longitud de la línea
        .strokeColor('#5cb85c')  // Color verde
        .lineWidth(2)  // Grosor de la línea
        .stroke();
  
      // Espacio después de la línea
      doc.moveDown(1.5);
  

      // Obtén la ruta del archivo actual y su directorio
      const __filename = fileURLToPath(import.meta.url);  // Convierte la URL del módulo en una ruta de archivo
      const __dirname = path.dirname(__filename);  // Obtén el directorio del archivo

      // Ruta de la imagen en el servidor
      const imagePath = path.join('C:', 'AVA 1.0', 'serverbienestar', 'server', 'img', 'logoSena.png'); // Ruta local de la imagen
      const imageWidth = 70; // Ancho de la imagen
      const imageHeight = 70; // Alto de la imagen
  
      // Ubicamos la imagen en la esquina superior derecha
      doc.image(imagePath, doc.page.width - imageWidth - 30, 20, { width: imageWidth, height: imageHeight });

      // Verifica que el informe tenga datos
      if (!informe || !informe[0]) {
        doc.fontSize(12).text("No se encontraron datos para generar el informe.");
        doc.end();
        return;
      }
  
      // Accede al primer objeto dentro del array de resultados
      const data = informe[0];
  
      // Comienza a agregar los datos de forma estructurada, alineados a la izquierda
      doc.fontSize(12).fillColor('black');
  
      // Establecemos un margen para los datos (alineado a la izquierda)
      const marginLeft = 50;
      const lineHeight = 1; // Espaciado entre líneas
  
      // Agregar cada línea de datos con un margen a la izquierda
      doc.text(`Sede: ${data.sede_procaptall || "No disponible"}`, marginLeft, doc.y);
      doc.moveDown(lineHeight);
      doc.text(`Descripción: ${data.descripcion_procaptall || "No disponible"}`, marginLeft, doc.y);
      doc.moveDown(lineHeight);
      doc.text(`Ambiente: ${data.ambiente_procaptall || "No disponible"}`, marginLeft, doc.y);
      doc.moveDown(lineHeight);
      doc.text(`Fecha: ${data.fecha_procaptall || "No disponible"}`, marginLeft, doc.y);
      doc.moveDown(lineHeight);
      doc.text(`Hora de Inicio: ${data.horaInicio_procaptall || "No disponible"}`, marginLeft, doc.y);
      doc.moveDown(lineHeight);
      doc.text(`Hora de Fin: ${data.horaFin_procaptall || "No disponible"}`, marginLeft, doc.y);
      doc.moveDown(lineHeight);
      doc.text(`Número de Ficha: ${data.numero_FichaFK || "No disponible"}`, marginLeft, doc.y);
      doc.moveDown(lineHeight);
      doc.text(`Coordinación: ${data.cordinacion_Ficha || "No disponible"}`, marginLeft, doc.y);
  
      // Finaliza el documento
      doc.end();
    });
  }

  // Método para obtener programaciones por sede
  static async getProgramacionesBySede(sede) {
    try {
      return await sequelize.query("CALL ObtenerProgramacionPorSede(:sede)", {
        replacements: { sede },
        type: sequelize.QueryTypes.SELECT,
      });
    } catch (error) {
      console.error(
        `Error al obtener las programaciones por sede (${sede}): `,
        error
      );
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
      return await sequelize.query("CALL ObtenerProgramacionPorSede52()", {
        type: sequelize.QueryTypes.SELECT,
      });
    } catch (error) {
      console.error(`Error al obtener las programaciones por sede 52:`, error);
      throw error;
    }
  }

  static async getProgramacionesBySede64() {
    try {
      return await sequelize.query("CALL ObtenerProgramacionPorSede64()", {
        type: sequelize.QueryTypes.SELECT,
      });
    } catch (error) {
      console.error(`Error al obtener las programaciones por sede 64:`, error);
      throw error;
    }
  }

  static async getProgramacionesBySedeFontibon() {
    try {
      return await sequelize.query(
        "CALL ObtenerProgramacionPorSedeFontibon()",
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
    } catch (error) {
      console.error(
        `Error al obtener las programaciones por sede Fontibón:`,
        error
      );
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
    id_procaptall: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }, // Asegúrate de tener autoIncrement si es necesario
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
