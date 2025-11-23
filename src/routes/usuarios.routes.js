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

// Todas estas rutas requieren estar logueado y ser coordinador
router.use(autenticar, autorizarRoles("coordinador"));

router.get("/", listarUsuarios);
router.post("/", crearUsuario);
router.put("/:id", actualizarUsuario);
router.patch("/:id/estado", cambiarEstadoUsuario);
router.patch("/:id/password", actualizarPasswordUsuario);
router.delete("/:id", eliminarUsuario);

export default router;
