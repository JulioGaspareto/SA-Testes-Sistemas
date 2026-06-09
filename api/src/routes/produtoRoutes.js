import express from "express";
import * as produtoController from "../controllers/produtoController.js";

const router = express.Router();

router.post("/", produtoController.criar);
router.get("/", produtoController.listar);

export default router;