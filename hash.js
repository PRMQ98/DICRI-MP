import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { getConnection, sql } from "./src/config/db.js";

dotenv.config();

const run = async () => {
  try {
    const pool = await getConnection();

    const passwordPlano = "123456";              // ← CONTRASEÑA QUE USARÁS
    const hash = await bcrypt.hash(passwordPlano, 10);

    console.log("Hash generado:", hash);

    await pool
      .request()
      .input("hash", sql.NVarChar(255), hash)
      .query(
        `
        UPDATE Usuarios 
        SET password_hash = @hash
        WHERE usuario = 'tecnico.demo'
      `
      );

    console.log("Password actualizado correctamente para coordinador.demo");
  } catch (err) {
    console.error("Error actualizando hash:", err);
  } finally {
    process.exit(0);
  }
};

run();
