import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER,
  database: process.env.SQL_DATABASE,
  port: Number(process.env.SQL_PORT) || 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

let pool;

export const getConnection = async () => {
  if (pool) return pool;
  try {
    pool = await sql.connect(dbConfig);
    console.log("✅ Conectado a SQL Server");
    return pool;
  } catch (err) {
    console.error("❌ Error conexión SQL Server:", err);
    throw err;
  }
};

export { sql };
