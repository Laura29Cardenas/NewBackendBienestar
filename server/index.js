import app from './app.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'; // Asegúrate de que esta línea sea correcta

dotenv.config();

async function main() {
  await connectDB(); // Llama a la función para establecer la conexión
    
  app.listen(process.env.PORT);
  console.log(`App escuchando en el puerto ${process.env.PORT}`);
}

main();

  