import PDFDocument from 'pdfkit';
import { promisify } from 'util';

// Función para crear el PDF
export const createPDF = async (informe) => {
  return new Promise((resolve, reject) => {
    try {
      // Crear un documento PDF
      const doc = new PDFDocument(); 

      // Configurar el nombre del archivo PDF
      doc.fontSize(16).text('Informe de Programación de Capacitación', { align: 'center' });

      // Agregar datos al PDF
      doc.moveDown();
      doc.fontSize(12).text(`Fecha: ${informe.fecha_procaptall}`);
      doc.text(`Sede: ${informe.sede_procaptall}`);
      doc.text(`Descripción: ${informe.descripcion_procaptall}`);
      doc.text(`Ambiente: ${informe.ambiente_procaptall}`);
      doc.text(`Hora de Inicio: ${informe.horaInicio_procaptall}`);
      doc.text(`Hora de Fin: ${informe.horaFin_procaptall}`);
      doc.text(`Número de Ficha: ${informe.numero_FichaFK}`);
      doc.text(`Coordinación: ${informe.cordinacion_Ficha}`);

      // Finalizar el PDF y devolver el buffer
      doc.end();

      // Usamos un `promisify` para esperar la salida del PDF
      const streamToBuffer = promisify(doc.pipe.bind(doc));
      streamToBuffer()
        .then(buffer => resolve(buffer)) // Resolvemos el PDF como buffer
        .catch(err => reject(err));

    } catch (error) {
      reject(error);
    }
  });
};
