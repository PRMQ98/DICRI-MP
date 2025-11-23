// src/controllers/expedientes.controller.js
import { getConnection, sql } from "../config/db.js";

// POST /api/expedientes
export const crearExpediente = async (req, res) => {
  const { codigo_expediente } = req.body;
  const id_tecnico = req.user?.id_usuario;

  if (!codigo_expediente) {
    return res
      .status(400)
      .json({ message: "Código de expediente requerido" });
  }

  if (!id_tecnico) {
    // En teoría no debería pasar si el middleware de auth funciona bien,
    // pero lo dejamos por seguridad.
    return res
      .status(401)
      .json({ message: "Usuario técnico no autenticado" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("codigo_expediente", sql.NVarChar(50), codigo_expediente)
      .input("id_tecnico", sql.Int, id_tecnico)
      .execute("sp_crear_expediente");

    const id_expediente = result.recordset[0].id_expediente;
    return res.status(201).json({ id_expediente, codigo_expediente });
  } catch (err) {
    console.error("Error crearExpediente:", err);

    // Detectar violación de UNIQUE KEY (código de expediente duplicado)
    const errorNumber = err.number || err.originalError?.number;
    const mensajeSql = err.originalError?.message || err.message || "";

    if (
      errorNumber === 2627 || // violación UNIQUE en SQL Server
      mensajeSql.includes("UQ__Expedien") // nombre de la constraint en tu tabla
    ) {
      return res.status(400).json({
        message:
          "Ya existe un expediente con ese código. " +
          "Aunque esté aprobado, rechazado o eliminado, ese número de expediente ya fue utilizado.",
      });
    }

    // Cualquier otro error
    return res
      .status(500)
      .json({ message: "Error interno al crear el expediente" });
  }
};

// GET /api/expedientes
export const listarExpedientes = async (req, res) => {
  const { estado } = req.query;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("estado", sql.NVarChar(20), estado || null)
      .execute("sp_listar_expedientes");

    return res.json(result.recordset);
  } catch (err) {
    console.error("Error listarExpedientes:", err);
    return res
      .status(500)
      .json({ message: "Error interno al listar expedientes" });
  }
};

// POST /api/expedientes/:id/aprobar
export const aprobarExpediente = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("id_expediente", sql.Int, id)
      .execute("sp_aprobar_expediente");

    return res.json({ message: "Expediente aprobado" });
  } catch (err) {
    console.error("Error aprobarExpediente:", err);
    return res
      .status(500)
      .json({ message: "Error interno al aprobar el expediente" });
  }
};

// POST /api/expedientes/:id/rechazar
export const rechazarExpediente = async (req, res) => {
  const { id } = req.params;
  const { justificacion } = req.body;

  if (!justificacion) {
    return res
      .status(400)
      .json({ message: "Justificación requerida para rechazar" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("id_expediente", sql.Int, id)
      .input("justificacion", sql.NVarChar(500), justificacion)
      .execute("sp_rechazar_expediente");

    return res.json({ message: "Expediente rechazado" });
  } catch (err) {
    console.error("Error rechazarExpediente:", err);
    return res
      .status(500)
      .json({ message: "Error interno al rechazar el expediente" });
  }
};
