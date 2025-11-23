import bcrypt from "bcryptjs";
import { getConnection, sql } from "../config/db.js";

// GET /api/usuarios
export const listarUsuarios = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().execute("sp_listar_usuarios");
    return res.json(result.recordset);
  } catch (err) {
    console.error("Error listarUsuarios:", err);
    return res.status(500).json({ message: "Error al listar usuarios" });
  }
};

// POST /api/usuarios
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, usuario, password, rol } = req.body;

    if (!nombre || !usuario || !password || !rol) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    if (!["tecnico", "coordinador"].includes(rol)) {
      return res.status(400).json({ message: "Rol inválido" });
    }

    const pool = await getConnection();

    // Verificar si ya existe usuario
    const existe = await pool
      .request()
      .input("usuario", sql.NVarChar(50), usuario)
      .query("SELECT 1 FROM Usuarios WHERE usuario = @usuario");

    if (existe.recordset.length > 0) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    const hash = await bcrypt.hash(password, 10);

    const result = await pool
      .request()
      .input("nombre", sql.NVarChar(100), nombre)
      .input("usuario", sql.NVarChar(50), usuario)
      .input("password_hash", sql.NVarChar(255), hash)
      .input("rol", sql.NVarChar(20), rol)
      .execute("sp_crear_usuario");

    const id_usuario = result.recordset[0].id_usuario;

    return res.status(201).json({
      id_usuario,
      nombre,
      usuario,
      rol,
      activo: true
    });
  } catch (err) {
    console.error("Error crearUsuario:", err);
    return res.status(500).json({ message: "Error al crear usuario" });
  }
};

// PUT /api/usuarios/:id
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, usuario, rol } = req.body;

    if (!nombre || !usuario || !rol) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    if (!["tecnico", "coordinador"].includes(rol)) {
      return res.status(400).json({ message: "Rol inválido" });
    }

    const pool = await getConnection();

    await pool
      .request()
      .input("id_usuario", sql.Int, id)
      .input("nombre", sql.NVarChar(100), nombre)
      .input("usuario", sql.NVarChar(50), usuario)
      .input("rol", sql.NVarChar(20), rol)
      .execute("sp_actualizar_usuario");

    return res.json({ message: "Usuario actualizado correctamente" });
  } catch (err) {
    console.error("Error actualizarUsuario:", err);
    return res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

// PATCH /api/usuarios/:id/estado
export const cambiarEstadoUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;

    const idInt = parseInt(id, 10);
    const usuarioToken = req.user; // ajusta a como guardas el usuario en el middleware

    // Regla: el coordinador NO puede desactivarse a sí mismo
    if (usuarioToken && usuarioToken.id_usuario === idInt) {
      return res
        .status(400)
        .json({ message: "No puedes desactivar tu propio usuario" });
    }

    const pool = await getConnection();

    await pool
      .request()
      .input("id_usuario", sql.Int, idInt)
      .input("activo", sql.Bit, activo ? 1 : 0)
      .execute("sp_cambiar_estado_usuario");

    return res.json({ message: "Estado actualizado correctamente" });
  } catch (err) {
    console.error("Error cambiarEstadoUsuario:", err);
    return res.status(500).json({ message: "Error al cambiar estado" });
  }
};

// PATCH /api/usuarios/:id/password
export const actualizarPasswordUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "La contraseña es obligatoria" });
    }

    const hash = await bcrypt.hash(password, 10);
    const pool = await getConnection();

    await pool
      .request()
      .input("id_usuario", sql.Int, id)
      .input("password_hash", sql.NVarChar(255), hash)
      .execute("sp_actualizar_password_usuario");

    return res.json({ message: "Contraseña actualizada correctamente" });
  } catch (err) {
    console.error("Error actualizarPasswordUsuario:", err);
    return res.status(500).json({ message: "Error al actualizar contraseña" });
  }
};

// DELETE /api/usuarios/:id
export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const idInt = parseInt(id, 10);
    const usuarioToken = req.user; // ajusta según tu middleware

    // Regla: el coordinador NO puede eliminarse a sí mismo
    if (usuarioToken && usuarioToken.id_usuario === idInt) {
      return res
        .status(400)
        .json({ message: "No puedes eliminar tu propio usuario" });
    }

    const pool = await getConnection();

    await pool
      .request()
      .input("id_usuario", sql.Int, idInt)
      .execute("sp_eliminar_usuario");

    return res.json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error("Error eliminarUsuario:", err);
    return res.status(500).json({ message: "Error al eliminar usuario" });
  }
};
