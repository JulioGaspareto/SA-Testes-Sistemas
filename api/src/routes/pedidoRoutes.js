import express from "express";
import * as pedidoController from "../controllers/pedidoController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, pedidoController.criar);
router.post("/item", auth, pedidoController.adicionarItem);

router.get("/:id", auth, pedidoController.buscar);

router.patch("/:id/status", auth, pedidoController.atualizarStatus);

export default router;