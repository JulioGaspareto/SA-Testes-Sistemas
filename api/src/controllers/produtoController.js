import * as produtoService from '../services/usuarioService.js';


export const criar = async (req, res ) => {
    const {valor, descricao, nome} = req.body;

    try {
        produto = await produtoService.criarProduto(valor, descricao, nome);
        res.json(produto);
    }catch (err) {
        res.status(500).json({erro: err.mensage})
    }

}

export const listar = async (req , res ) => {
    const produto = await produtoService.listarProduto();
    res.json(produto)
}