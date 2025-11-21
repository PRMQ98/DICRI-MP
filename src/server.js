import app from "./app.js";
import dotenv from "dotenv";
import { getConnection } from "./config/db.js";
dotenv.config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await getConnection();
    app.listen(PORT, () => {
      console.log(`🚀 Backend escuchando en puerto ${PORT}`);
    });
  } catch (err) {
    console.error("No se pudo iniciar el servidor:", err);
  }
};

start();
