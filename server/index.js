import app from './app.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'; // Asegúrate de que esta línea sea correcta
import authRoutes from './routes/auth.js'; // Importa las rutas de autenticación

dotenv.config();

async function main() {
  await connectDB(); // Llama a la función para establecer la conexión
  
  // Usa las rutas de autenticación
  app.use('/api', authRoutes);
  
  app.listen(process.env.PORT);
  console.log(`App escuchando en el puerto ${process.env.PORT}`);
}

main();

 