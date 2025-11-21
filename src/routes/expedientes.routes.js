import { Router } from "express";
import {
  crearExpediente,
  listarExpedientes,
  aprobarExpediente,
  rechazarExpediente
} from "../controllers/expedientes.controller.js";
import { autenticar, autorizarRoles } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", autenticar, autorizarRoles("tecnico"), crearExpediente);
router.get("/", autenticar, listarExpedientes);
router.post("/:id/aprobar", autenticar, autorizarRoles("coordinador"), aprobarExpediente);
router.post("/:id/rechazar", autenticar, autorizarRoles("coordinador"), rechazarExpediente);

export default router;
