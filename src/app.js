// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import expedientesRoutes from "./routes/expedientes.routes.js";
import indiciosRoutes from "./routes/indicios.routes.js";
import reportesRoutes from "./routes/reportes.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js"; // 👈 IMPORTANTE

dotenv.config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Endpoint simple para probar API
app.get("/api", (req, res) => {
  res.send("API DICRI OK");
});

// Rutas de la API
app.use("/api/auth", authRoutes);
app.use("/api/expedientes", expedientesRoutes);
app.use("/api/indicios", indiciosRoutes);
app.use("/api/reportes", reportesRoutes);
app.use("/api/usuarios", usuariosRoutes); // 👈 AQUÍ SE MONTA

// 404 por defecto
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

export default app;
