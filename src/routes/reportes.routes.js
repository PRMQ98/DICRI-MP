import { Router } from "express";
import { reporteEstadisticas } from "../controllers/reportes.controller.js";
import { autenticar, autorizarRoles } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", autenticar, autorizarRoles("coordinador"), reporteEstadisticas);

export default router;
