import  pool  from "../config/db.js";


export const criarUsuario = async (nome, email, senha) => {
  const res = await pool.query(
    'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
    [nome, email, senha]
  );

  return res.rows[0];
};

export const listarUsuarios = async () => {
  const res = await pool.query('SELECT * FROM usuarios');
  return res.rows;
};