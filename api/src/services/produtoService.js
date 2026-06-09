import pool from "../config/db.js";


export const criarProduto = async(nome , descricao, valor) => {
    const res = await pool.query(
        'INSERT INTO produtos (nome, descricao, valor) VALUES ($1, $2,$3) RETURNING * ',
        [nome, descricao , valor ] 
    );
    return res.rows[0]

}


export const listarProduto = async() => {
    const res = await pool.query ('SELECT * FROM produtos');

    return res.rows;
}