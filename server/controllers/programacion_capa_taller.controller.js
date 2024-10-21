import { ProgramacionCapaTaller } from "../models/programacion_capa_taller.model.js";
import PDFDocument from "pdfkit";
import express from "express";
import fs from "fs";
import path from "path";

class ProgramacionCapaTallerController {
  // Obtener programaciones por ficha
  static async getProgramacionesPorFicha(req, res) {
    try {
      const ficha = parseInt(req.params.ficha, 10);
      const cordinacion = req.params.cordinacion;

      if (!ficha || !cordinacion) {
        return res.status(400).json({ message: "Parámetros inválidos" });
      }

      const programaciones = await ProgramacionCapaTaller.getProgramacionPorFicha(ficha, cordinacion);
      const uniqueProgramaciones = programaciones.filter(
        (programacion, index, self) =>
          index === self.findIndex(
            (p) => p.fecha_procaptall === programacion.fecha_procaptall &&
                   p.horaInicio_procaptall === programacion.horaInicio_procaptall
          )
      );

      res.status(200).json(uniqueProgramaciones);
    } catch (error) {
      console.error(`Error al obtener las programaciones por ficha (${req.params.ficha}):`, error);
      res.status(500).json({
        message: `Error al obtener las programaciones: ${error.message}`,
      });
    }
  }

  static async postObtenerInforme(req, res) {
    console.log("Request recibido:", req.body);
    const { fecha, sede, coordinacion, numeroFicha, ambiente } = req.body;

    try {
        const informe = await ProgramacionCapaTaller.getInforme(fecha, sede, coordinacion, numeroFicha, ambiente);
        
        if (!informe) {
            return res.status(404).json({
                message: "No se encontraron informes para los datos proporcionados.",
            });
        }
        
        res.status(200).json(informe);
    } catch (error) {
        console.error("Error al obtener el informe: ", error);
        res.status(500).json({ message: "Error en el servidor al obtener el informe." });
    }
}

  static async postGenerarInformePDF(req, res) {
      const { fecha, sede, coordinacion, numeroFicha, ambiente } = req.body;

      try {
          const informe = await ProgramacionCapaTaller.getInforme(fecha, sede, coordinacion, numeroFicha, ambiente);

          if (!informe) {
              return res.status(404).json({ message: "No se encontraron datos para generar el PDF." });
          }

          // Asegúrate de que el método se llama correctamente
          const pdfData = await this.generarInformePDF(informe);
          
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename=informe.pdf');
          res.send(pdfData);
      } catch (error) {
          console.error("Error al generar el PDF: ", error);
          res.status(500).json({ message: "Error en el servidor al generar el PDF.", error: error.stack });
      }
  }

  static async generarInformePDF(informe) {
      return new Promise((resolve, reject) => {
          const doc = new PDFDocument();
          let buffers = [];

          doc.on("data", buffers.push.bind(buffers));
          doc.on("end", () => {
              const pdfData = Buffer.concat(buffers);
              resolve(pdfData);
          });

          doc.fontSize(20).text("Informe de Programación", { align: "center" });
          doc.moveDown();

          if (!informe || informe.length === 0) {
              doc.fontSize(12).text(`No hay datos disponibles.`);
              doc.end();
              return;
          }

          informe.forEach((data) => {
              doc.fontSize(12).text(`Fecha: ${data.fecha_procaptall || "No disponible"}`);
              doc.text(`Sede: ${data.sede_procaptall || "No disponible"}`);
              doc.text(`Coordinación: ${data.cordinacion_Ficha || "No disponible"}`);
              doc.text(`Número de Ficha: ${data.numero_FichaFK || "No disponible"}`);
              doc.text(`Ambiente: ${data.ambiente_procaptall || "No disponible"}`);
              doc.text(`Descripción: ${data.descripcion_procaptall || "No disponible"}`);
              doc.moveDown();
          });

          doc.end();
      });
  }

  // Obtener programaciones por sede
  static async getProgramacionesPorSede(req, res) {
    const { sede } = req.params;

    try {
      let result;
      switch (sede.toLowerCase()) {
        case "sede 52":
          result = await ProgramacionCapaTaller.getProgramacionesBySede52();
          break;
        case "sede 64":
          result = await ProgramacionCapaTaller.getProgramacionesBySede64();
          break;
        case "sede fontibon":
          result = await ProgramacionCapaTaller.getProgramacionesBySedeFontibon();
          break;
        default:
          return res.status(400).json({ message: "Sede no válida" });
      }

      res.status(200).json(result);
    } catch (error) {
      console.error(`Error al obtener las programaciones por sede (${sede}): `, error);
      res.status(500).json({ message: "Error al obtener las programaciones por sede" });
    }
  }

  // Obtener programaciones de capacitación
  static async getProgramacionesCT(req, res) {
    try {
      const programacionesCT = await ProgramacionCapaTaller.getProgramacionesCT();
      res.status(200).json(programacionesCT);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener las programaciones: " + error.message,
      });
    }
  }

  // Obtener una programación de capacitación
  static async getProgramacionCT(req, res) {
    try {
      const id_procaptall = req.params.id;
      const programacionCT = await ProgramacionCapaTaller.getProgramacionCT(id_procaptall);
      if (programacionCT) {
        res.status(200).json(programacionCT);
      } else {
        res.status(404).json({ message: "Programación no encontrada" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener la programación: " + error.message,
      });
    }
  }

  // Actualizar programación de capacitación
  static async putProgramacionCT(req, res) {
    try {
      const update_programacionCT = {
        sede_procaptall: req.body.sede_procaptall,
        descripcion_procaptall: req.body.descripcion_procaptall,
        ambiente_procaptall: req.body.ambiente_procaptall,
        fecha_procaptall: req.body.fecha_procaptall,
        horaInicio_procaptall: req.body.horaInicio_procaptall,
        horaFin_procaptall: req.body.horaFin_procaptall,
        id_TallerFK: req.body.id_TallerFK,
        id_CapacFK: req.body.id_CapacFK,
        numero_FichaFK: req.body.numero_FichaFK,
      };
      const id_procaptall = req.params.id;
      await ProgramacionCapaTaller.updateProgramacionCT(id_procaptall, update_programacionCT);
      res.status(200).json({ message: "Programación actualizada con éxito" });
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar la programación: " + error.message,
      });
    }
  }

  // Crear programación de capacitación
  static async postProgramacionCT(req, res) {
    try {
      const pct = {
        sede_procaptall: req.body.sede_procaptall,
        descripcion_procaptall: req.body.descripcion_procaptall,
        ambiente_procaptall: req.body.ambiente_procaptall,
        fecha_procaptall: req.body.fecha_procaptall,
        horaInicio_procaptall: req.body.horaInicio_procaptall,
        horaFin_procaptall: req.body.horaFin_procaptall,
        id_TallerFK: req.body.id_TallerFK,
        id_CapacFK: req.body.id_CapacFK,
        numero_FichaFK: req.body.numero_FichaFK,
        cordinacion_Ficha: req.body.cordinacion_Ficha,
      };
      await ProgramacionCapaTaller.createProgramacionCT(pct);
      res.status(201).json({ message: "Programación creada con éxito" });
    } catch (error) {
      res.status(500).json({ message: "Error al crear la programación: " + error.message });
    }
  }

  // Eliminar programación de capacitación
  static async deleteProgramacionCT(req, res) {
    try {
      const { id_procaptall } = req.params;
      const result = await ProgramacionCapaTaller.eliminarProgramacionCT(id_procaptall);
      if (result) {
        res.status(200).json({ message: "Programación eliminada exitosamente" });
      } else {
        res.status(404).json({ message: "Programación no encontrada" });
      }
    } catch (error) {
      console.error(`Error al eliminar la programación: ${error.message}`);
      res.status(500).json({ message: "Error al eliminar la programación" });
    }
  }
}

export default ProgramacionCapaTallerController;
