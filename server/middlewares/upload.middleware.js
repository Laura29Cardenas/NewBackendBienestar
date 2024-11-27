import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Crear la carpeta uploads si no existe
const createUploadsFolder = (uploadsFolder) => {
  if (!fs.existsSync(uploadsFolder)) {
    fs.mkdirSync(uploadsFolder, { recursive: true });
  }
};  

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsFolder = path.resolve('uploads/');
    createUploadsFolder(uploadsFolder); // Asegurarse de que la carpeta exista
    cb(null, uploadsFolder); // Carpeta donde se almacenan los archivos
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Mantener el nombre original del archivo
  },
});

const fileFilter = (req, file, cb) => { 
  const ext = path.extname(file.originalname);
  if (ext !== '.xlsx' && ext !== '.xls') {
    return cb(new Error('Solo se permiten archivos Excel'));
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;