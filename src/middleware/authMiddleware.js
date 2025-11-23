// src/middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Autenticación: valida token y adjunta datos del usuario a req.user
export const autenticar = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded: { id_usuario, rol, nombre }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

// Autorización: permite solo ciertos roles
export const autorizarRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({ message: "No autorizado" });
    }
    next();
  };
};

// Alias opcionales por si en algún lugar usas otros nombres
export const authMiddleware = autenticar;
export const requireRole = (rol) => autorizarRoles(rol);
