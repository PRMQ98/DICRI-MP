// ========================================================
//  Controlador de Indicios
//  - Registro de indicios asociados a un expediente
// ========================================================

import { getConnection, sql } from "../config/db.js";

// POST /api/indicios
// Crea un indicio asociado a un expediente y técnico autenticado
export const crearIndicio = async (req, res) => {
  const { id_expediente, descripcion, color, tamano, peso, ubicacion } =
    req.body;
  const id_tecnico = req.user?.id_usuario;

  if (!id_expediente || !descripcion) {
    return res
      .status(400)
      .json({ message: "id_expediente y descripción son requeridos" });
  }

  if (!id_tecnico) {
    return res
      .status(401)
      .json({ message: "Usuario técnico no autenticado" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id_expediente", sql.Int, id_expediente)
      .input("descripcion", sql.NVarChar(255), descripcion)
      .input("color", sql.NVarChar(50), color || null)
      .input("tamano", sql.NVarChar(50), tamano || null)
      .input("peso", sql.NVarChar(50), peso || null)
      .input("ubicacion", sql.NVarChar(255), ubicacion || null)
      .input("id_tecnico", sql.Int, id_tecnico)
      .execute("sp_crear_indicio");

    const id_indicio = result.recordset[0].id_indicio;

    console.log(
      `🧬 Indicio creado: id=${id_indicio}, expediente=${id_expediente}, tecnico=${id_tecnico}`
    );

    return res.status(201).json({ id_indicio });
  } catch (err) {
    console.error("Error crearIndicio:", err);
    return res.status(500).json({ message: "Error interno" });
  }
};
