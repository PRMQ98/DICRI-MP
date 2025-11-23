// ===============================================
//  CONFIGURACIÓN DE CONEXIÓN A SQL SERVER (MSSQL)
// ===============================================
// Este archivo centraliza la conexión a la base de datos.
// Se utiliza un pool global para evitar múltiples conexiones
// y mejorar rendimiento en producción.
// ===============================================

import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

// Configuración del motor SQL Server
// Se controla completamente mediante variables de entorno
const dbConfig = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  port: Number(process.env.SQL_PORT) || 1433,

  // Opciones necesarias para conexiones en entornos locales / cloud híbridos
  options: {
    encrypt: false,               // Desactivado porque no se usa certificado propio
    trustServerCertificate: true  // Requerido para entornos sin CA configurada
  }
};

// Pool global reutilizable
let pool;

/**
 * Obtiene una conexión única (pool) hacia SQL Server.
 * Se mantiene en memoria para optimizar el rendimiento.
 * 
 * Ventajas para entrevista:
 * - Evita saturar SQL Server con conexiones por request.
 * - Mejora latencia general del backend.
 * - Mecanismo estándar en Node.js + MSSQL.
 */
export const getConnection = async () => {
  if (pool) return pool;

  try {
    pool = await sql.connect(dbConfig);
    console.log("✅ [DB] Conectado a SQL Server");
    return pool;
  } catch (err) {
    console.error("❌ [DB] Error al conectar con SQL Server:", err);
    throw err;
  }
};

// Exportación del cliente SQL para usar .input(), .execute(), etc.
export { sql };
