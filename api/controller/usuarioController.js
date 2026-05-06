import * as usuarioService from '../services/usuarioService.js';

export const criar = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuario = await usuarioService.criarUsuario(nome, email, senha);
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const listar = async (req, res) => {
  const usuarios = await usuarioService.listarUsuarios();
  res.json(usuarios);
};