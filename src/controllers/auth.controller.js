// ========================================================
//  Controlador de Autenticación (Login con JWT)
//  - Valida credenciales con stored procedure
//  - Compara hash con bcrypt
//  - Genera token JWT con datos del usuario
// ========================================================

import bcrypt from "bcryptjs";
import { getConnection, sql } from "../config/db.js";
import { generarToken } from "../config/jwt.js";

// Login de usuario
export const login = async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res
      .status(400)
      .json({ message: "Usuario y contraseña requeridos" });
  }

  try {
    const pool = await getConnection();

    // Consulta del usuario vía stored procedure
    const result = await pool
      .request()
      .input("usuario", sql.NVarChar(50), usuario)
      .execute("sp_login_usuario");

    const user = result.recordset[0];
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Validación de contraseña usando bcrypt
    const passwordValida = await bcrypt.compare(password, user.password_hash);
    if (!passwordValida) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Creación de token JWT
    const token = generarToken({
      id_usuario: user.id_usuario,
      rol: user.rol,
      nombre: user.nombre
    });

    // Respuesta sin exponer hashes ni datos sensibles
    res.json({
      token,
      usuario: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        rol: user.rol
      }
    });
  } catch (err) {
    console.error("Error login:", err);
    res.status(500).json({ message: "Error interno" });
  }
};
