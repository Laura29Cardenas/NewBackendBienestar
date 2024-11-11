import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; // Importar esta función para convertir URL a ruta de archivo

import UsuarioRoutes from './routes/usuario.routes.js';
import AdministradorRoutes from './routes/administrador.routes.js';
import InstructorRoutes from './routes/instructor.routes.js';
import CapacitadorRoutes from './routes/capacitador.routes.js';
import HorarioRoutes from './routes/horario.routes.js';
import FichaRouter from './routes/ficha.routes.js';
import RolRouter from './routes/rol.routes.js';
import TallerRoutes from './routes/taller.routes.js';
import DisponibilidadBienestarRoutes from './routes/disponibilidad_bienestar.routes.js';
import ProgramacionCapaTallerRoutes from './routes/programacion_capa_taller.routes.js';
import ExcelRoutes from './routes/excel.routes.js';
import AutenticacionRoutes from './routes/autenticacion.routes.js';

const app = express();

// Obtener la ruta del directorio actual (equivalente a __dirname)
const __filename = fileURLToPath(import.meta.url); // Obtener el archivo actual
const __dirname = path.dirname(__filename); // Obtener el directorio a partir del archivo

app.use(express.json());
app.use(cors());

// Usar las rutas de la aplicación
app.use(UsuarioRoutes);
app.use(AdministradorRoutes);
app.use(InstructorRoutes);
app.use(CapacitadorRoutes);
app.use(HorarioRoutes);
app.use(FichaRouter);
app.use(RolRouter);
app.use(TallerRoutes);
app.use(DisponibilidadBienestarRoutes);
app.use(ProgramacionCapaTallerRoutes);
app.use(ExcelRoutes);
app.use(AutenticacionRoutes);

// Rutas estáticas para la imagen
app.use('/img', express.static(path.join(__dirname, 'img')));

export default app;
