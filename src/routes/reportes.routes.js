// ========================================================
//  Rutas de Reportes
//  - Estadísticas globales
// ========================================================

import { Router } from "express";
import { reporteEstadisticas } from "../controllers/reportes.controller.js";
import { autenticar, autorizarRoles } from "../middleware/authMiddleware.js";

const router = Router();

// Reporte general - solo coordinador
router.get("/", autenticar, autorizarRoles("coordinador"), reporteEstadisticas);

export default router;
