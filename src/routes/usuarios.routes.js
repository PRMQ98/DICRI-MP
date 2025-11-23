// ========================================================
//  Rutas de Usuarios
//  - ABM completo (solo coordinador)
//  - Cambio de estado
//  - Cambio de contraseña
// ========================================================

import { Router } from "express";
import {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  cambiarEstadoUsuario,
  actualizarPasswordUsuario,
  eliminarUsuario,
} from "../controllers/usuarios.controller.js";

import {
  autenticar,
  autorizarRoles,
} from "../middleware/authMiddleware.js";

const router = Router();

// Restricción general para todo el módulo:
// El usuario debe estar autenticado y ser coordinador
router.use(autenticar, autorizarRoles("coordinador"));

// CRUD de usuarios
router.get("/", listarUsuarios);
router.post("/", crearUsuario);
router.put("/:id", actualizarUsuario);

// Estado (activo/inactivo)
router.patch("/:id/estado", cambiarEstadoUsuario);

// Actualizar contraseña
router.patch("/:id/password", actualizarPasswordUsuario);

// Eliminar usuario
router.delete("/:id", eliminarUsuario);

export default router;
