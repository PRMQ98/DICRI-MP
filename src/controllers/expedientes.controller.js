import { getConnection, sql } from "../config/db.js";

export const crearExpediente = async (req, res) => {
  const { codigo_expediente } = req.body;
  const id_tecnico = req.user.id_usuario;

  if (!codigo_expediente)
    return res.status(400).json({ message: "Código de expediente requerido" });

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("codigo_expediente", sql.NVarChar(50), codigo_expediente)
      .input("id_tecnico", sql.Int, id_tecnico)
      .execute("sp_crear_expediente");

    const id_expediente = result.recordset[0].id_expediente;
    res.status(201).json({ id_expediente, codigo_expediente });
  } catch (err) {
    console.error("Error crearExpediente:", err);
    res.status(500).json({ message: "Error interno" });
  }
};

export const listarExpedientes = async (req, res) => {
  const { estado } = req.query;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("estado", sql.NVarChar(20), estado || null)
      .execute("sp_listar_expedientes");

    res.json(result.recordset);
  } catch (err) {
    console.error("Error listarExpedientes:", err);
    res.status(500).json({ message: "Error interno" });
  }
};

export const aprobarExpediente = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("id_expediente", sql.Int, id)
      .execute("sp_aprobar_expediente");

    res.json({ message: "Expediente aprobado" });
  } catch (err) {
    console.error("Error aprobarExpediente:", err);
    res.status(500).json({ message: "Error interno" });
  }
};

export const rechazarExpediente = async (req, res) => {
  const { id } = req.params;
  const { justificacion } = req.body;

  if (!justificacion)
    return res.status(400).json({ message: "Justificación requerida" });

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("id_expediente", sql.Int, id)
      .input("justificacion", sql.NVarChar(500), justificacion)
      .execute("sp_rechazar_expediente");

    res.json({ message: "Expediente rechazado" });
  } catch (err) {
    console.error("Error rechazarExpediente:", err);
    res.status(500).json({ message: "Error interno" });
  }
};
