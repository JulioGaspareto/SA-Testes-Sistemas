import express from "express";
import * as pedidoController from "../controllers/pedidoController.js";

const router = express.Router();

router.post("/", pedidoController.criar);
router.post("/item", pedidoController.adicionarItem);
router.get("/:id", pedidoController.buscar);
router.patch("/:id/status", pedidoController.atualizarStatus);

export default router;