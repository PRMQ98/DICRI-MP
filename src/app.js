// ========================================================
//  Configuración principal de la aplicación Express
//  - Middlewares globales
//  - Montaje de rutas
//  - Manejo de 404
// ========================================================

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import expedientesRoutes from "./routes/expedientes.routes.js";
import indiciosRoutes from "./routes/indicios.routes.js";
import reportesRoutes from "./routes/reportes.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";

dotenv.config();

const app = express();

// --------------------------------------------------------
//  Middlewares globales
// --------------------------------------------------------
app.use(cors());               // Habilita solicitudes desde el frontend
app.use(express.json());       // Permite leer JSON en req.body

// --------------------------------------------------------
//  Endpoint de verificación rápida
// --------------------------------------------------------
app.get("/api", (req, res) => {
  res.send("API DICRI OK");
});

// --------------------------------------------------------
//  Rutas principales del sistema
// --------------------------------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/expedientes", expedientesRoutes);
app.use("/api/indicios", indiciosRoutes);
app.use("/api/reportes", reportesRoutes);
app.use("/api/usuarios", usuariosRoutes);

// --------------------------------------------------------
//  Middleware 404 para rutas no definidas
// --------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

export default app;
