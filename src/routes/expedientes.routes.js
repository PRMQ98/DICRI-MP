// ========================================================
//  Rutas de Expedientes
//  - Creación (técnico)
//  - Listado
//  - Aprobación / Rechazo (coordinador)
// ========================================================

import { Router } from "express";
import {
  crearExpediente,
  listarExpedientes,
  aprobarExpediente,
  rechazarExpediente
} from "../controllers/expedientes.controller.js";
import { autenticar, autorizarRoles } from "../middleware/authMiddleware.js";

const router = Router();

// Crear expediente - solo técnico
router.post("/", autenticar, autorizarRoles("tecnico"), crearExpediente);

// Listar expedientes (ambos roles)
router.get("/", autenticar, listarExpedientes);

// Aprobación y rechazo - solo coordinador
router.post("/:id/aprobar", autenticar, autorizarRoles("coordinador"), aprobarExpediente);
router.post("/:id/rechazar", autenticar, autorizarRoles("coordinador"), rechazarExpediente);

export default router;
