import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';
import produtoRoutes from './routes/produtoRoutes.js';
import pedidoRoutes from "./routes/pedidoRoutes.js";

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API Good Coffee ☕");
});

app.use('/usuarios', usuarioRoutes);
app.use('/produtos', produtoRoutes);

app.use("/pedidos", pedidoRoutes);

app.listen(PORT, () => {
    console.log(`API rodando em: http://localhost:${PORT} - Good Coffee ☕`);
});