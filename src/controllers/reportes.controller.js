// ========================================================
//  Controlador de Reportes
//  - Obtención de métricas agregadas de expedientes
// ========================================================

import { getConnection, sql } from "../config/db.js";

// GET /api/reportes
// Devuelve resumen de expedientes (totales, aprobados, rechazados)
// con filtros opcionales de fecha y estado
export const reporteEstadisticas = async (req, res) => {
  const { fecha_inicio, fecha_fin, estado } = req.query;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("fecha_inicio", sql.DateTime, fecha_inicio || null)
      .input("fecha_fin", sql.DateTime, fecha_fin || null)
      .input("estado", sql.NVarChar(20), estado || null)
      .execute("sp_reporte_estadisticas");

    // Se asume un único registro con los agregados
    return res.json(result.recordset[0]);
  } catch (err) {
    console.error("Error reporteEstadisticas:", err);
    return res.status(500).json({ message: "Error interno" });
  }
};
