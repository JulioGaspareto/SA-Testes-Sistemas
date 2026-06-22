import express from "express";
import * as pedidoController from "../controllers/pedidoController.js";
import  {auth}  from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, pedidoController.criar);
router.post("/item", auth, pedidoController.adicionarItem);

router.get("/:id", auth, pedidoController.buscar);
router.get("/", auth, pedidoController.listarPendentes)
router.patch("/:id/status", auth, pedidoController.atualizarStatus);
router.delete("/item/:id", auth, pedidoController.removerItem)
export default router;