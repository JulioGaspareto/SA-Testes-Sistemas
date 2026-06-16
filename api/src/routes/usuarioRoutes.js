import express from 'express';
import * as usuarioController from '../controllers/usuarioController.js';
import { criar, listar, login} from "../controllers/usuarioController.js";

const router = express.Router();


router.post("/login", login);
router.post('/', usuarioController.criar);
router.get('/', usuarioController.listar);

export default router;