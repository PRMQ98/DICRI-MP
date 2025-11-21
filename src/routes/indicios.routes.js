import { Router } from "express";
import { crearIndicio } from "../controllers/indicios.controller.js";
import { autenticar, autorizarRoles } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", autenticar, autorizarRoles("tecnico"), crearIndicio);

export default router;
