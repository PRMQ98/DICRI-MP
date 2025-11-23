// ===============================================
//  GENERACIÓN Y FIRMA DE TOKENS JWT
// ===============================================
// Se usa para manejo de autenticación basada en tokens.
// El coordinador o técnico obtiene un token válido por 1 hora.
// ===============================================

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Genera un token JWT firmado.
 *
 * Razones técnicas importantes (útiles en entrevista):
 * - JWT permite autenticar sin mantener sesiones en memoria.
 * - El payload nunca debe incluir contraseñas.
 * - expiración de 1h evita tokens permanentes y reduce riesgo.
 */
export const generarToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h", // buena práctica para sesiones cortas
  });
};
