import * as pedidoService from "../services/pedidoService.js";

export const criar = async (req, res) => {
  const usuario_id = req.usuario.id_usuario;

  try {
    const pedido = await pedidoService.criarPedido(usuario_id);
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const adicionarItem = async (req, res) => {
  const { pedido_id, produto_id, quantidade } = req.body;

  try {
    const item = await pedidoService.adicionarItem(
      pedido_id,
      produto_id,
      quantidade
    );

    res.json(item);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const buscar = async (req, res) => {
  const { id } = req.params;

  try {
    const pedido = await pedidoService.buscarPedido(id);
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const atualizarStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const pedido = await pedidoService.atualizarStatus(id, status);
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};