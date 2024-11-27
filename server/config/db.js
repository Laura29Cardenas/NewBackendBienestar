import { Sequelize } from 'sequelize';

// Reemplaza 'nombre_de_tu_base_de_datos' y 'usuario' con tus credenciales
const sequelize = new Sequelize('Programacion12', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});
 
// Probar la conexión 
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

// Exportar la conexión y la función
export { sequelize, connectDB };

