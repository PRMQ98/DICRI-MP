import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import expedientesRoutes from "./routes/expedientes.routes.js";
import indiciosRoutes from "./routes/indicios.routes.js";
import reportesRoutes from "./routes/reportes.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API DICRI OK"));

app.use("/api/auth", authRoutes);
app.use("/api/expedientes", expedientesRoutes);
app.use("/api/indicios", indiciosRoutes);
app.use("/api/reportes", reportesRoutes);

export default app;
