import * as produtoService from '../services/produtoService.js';

export const criar = async (req, res) => {
    const { nome, descricao, valor, categoria } = req.body

    try {
        const produto = await produtoService.criarProduto(nome, descricao, valor, categoria)
        res.json(produto)
    } catch (err) {
        res.status(500).json({ erro: err.message })
    }
}

export const listar = async (req, res) => {
  const produto = await produtoService.listarProduto();
  res.json(produto);
};