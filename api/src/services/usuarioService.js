import pool from "../config/db.js";
import bcrypt from "bcrypt";

export const criarUsuario = async (nome, email, senha, role = 'cliente') => {
    const senhaHash = await bcrypt.hash(senha, 10)

    const res = await pool.query(
        `INSERT INTO usuarios (nome, email, senha, role)
         VALUES ($1, $2, $3, $4)
         RETURNING id_usuario, nome, email, role`,
        [nome, email, senhaHash, role]
    )

    return res.rows[0]
}

export const listarUsuarios = async () => {
  const res = await pool.query(
    "SELECT id_usuario, nome, email,senha FROM usuarios"
  );

  return res.rows;
};

export const buscarUsuarioPorEmail = async (email) => {
  const res = await pool.query(
    `
      SELECT *
      FROM usuarios
      WHERE email = $1
    `,
    [email]
  );

  return res.rows[0];
};