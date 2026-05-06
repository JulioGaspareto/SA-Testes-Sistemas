import express from 'express';
import * as usuarioController from '../controller/usuarioController.js';

const router = express.Router();

router.post('/', usuarioController.criar);
router.get('/', usuarioController.listar);

export default router;