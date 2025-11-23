// ========================================================
//  Rutas de Indicios
//  - Registro de indicios asociados a expedientes
// ========================================================

import { Router } from "express";
import { crearIndicio } from "../controllers/indicios.controller.js";
import { autenticar, autorizarRoles } from "../middleware/authMiddleware.js";

const router = Router();

// Crear indicio - solo técnico
router.post("/", autenticar, autorizarRoles("tecnico"), crearIndicio);

export default router;
