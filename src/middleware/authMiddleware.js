// ========================================================
//  Middleware de Autenticación y Autorización (JWT + RBAC)
// ========================================================
// - Valida tokens JWT enviados en el header Authorization.
// - Expone datos del usuario en req.user.
// - Implementa control de acceso basado en roles.
// ========================================================

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Autenticación: valida el token JWT y adjunta su payload al request.
export const autenticar = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id_usuario, rol, nombre }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

// Autorización por roles utilizando RBAC simple.
export const autorizarRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({ message: "No autorizado" });
    }
    next();
  };
};

// Alias de compatibilidad
export const authMiddleware = autenticar;
export const requireRole = (rol) => autorizarRoles(rol);
