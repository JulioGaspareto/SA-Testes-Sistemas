import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import produtoRoutes from "./routes/produtoRoutes.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Good Coffee ☕");
});

app.use("/usuarios", usuarioRoutes);
app.use("/produtos", produtoRoutes);
app.use("/pedidos", pedidoRoutes);

export default app;