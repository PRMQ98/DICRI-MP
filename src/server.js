// ========================================================
//  Punto de entrada del servidor
//  - Inicializa conexión a BD
//  - Levanta servidor Express
// ========================================================

import app from "./app.js";
import dotenv from "dotenv";
import { getConnection } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    // Se inicializa la conexión y se valida que SQL Server esté disponible
    const pool = await getConnection();
    console.log("Base de datos conectada:", pool.config.database);

    // Inicializa servidor HTTP
    app.listen(PORT, () => {
      console.log(`🚀 Backend escuchando en puerto ${PORT}`);
    });
  } catch (err) {
    console.error("❌ No se pudo iniciar el servidor:", err);
  }
};

start();
