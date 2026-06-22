import pool from "../config/db.js"

export const criarProduto = async (nome, descricao, valor, categoria = 'outros') => {
    const res = await pool.query(
        `INSERT INTO produtos (nome, descricao, valor, categoria)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [nome, descricao, valor, categoria]
    )
    return res.rows[0]
}

export const listarProduto = async () => {
    const res = await pool.query('SELECT * FROM produtos')
    return res.rows
}