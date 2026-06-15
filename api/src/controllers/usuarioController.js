import * as usuarioService from '../services/usuarioService.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { buscarUsuarioPorEmail } from "../services/usuarioService.js";


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

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await buscarUsuarioPorEmail(email);

    if (!usuario) {
      return res.status(401).json({
        erro: "Email ou senha inválidos"
      });
    }

    const senhaValida = await bcrypt.compare(
      senha,
      usuario.senha
    );

    if (!senhaValida) {
      return res.status(401).json({
        erro: "Email ou senha inválidos"
      });
    }

    console.log(process.env.JWT_SECRET);
    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        email: usuario.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      erro: "Erro ao realizar login"
    });
  }
};