import pool from "../config/db.js";

export const criarPedido = async (usuario_id) => {
  const res = await pool.query(
    `INSERT INTO pedidos (usuario_id, status)
     VALUES ($1, 'PENDENTE')
     RETURNING *`,
    [usuario_id]
  );

  return res.rows[0];
};


export const adicionarItem = async (pedido_id, produto_id, quantidade) => {
  const res = await pool.query(
    `INSERT INTO pedidos_itens (pedido_id, produto_id, quantidade)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [pedido_id, produto_id, quantidade]
  );

  return res.rows[0];
};


export const buscarPedido = async (id_pedido) => {
  const pedidoRes = await pool.query(
    `SELECT * FROM pedidos WHERE id_pedido = $1`,
    [id_pedido]
  );

  const itensRes = await pool.query(
    `SELECT 
        pi.id_pedido_item,
        p.nome,
        p.valor,
        pi.quantidade,
        (p.valor * pi.quantidade) AS subtotal
     FROM pedidos_itens pi
     JOIN produtos p ON p.id_produto = pi.produto_id
     WHERE pi.pedido_id = $1`,
    [id_pedido]
  );

  const total = itensRes.rows.reduce(
    (acc, item) => acc + Number(item.subtotal),
    0
  );

  return {
    pedido: pedidoRes.rows[0],
    itens: itensRes.rows,
    total
  };
};


export const atualizarStatus = async (id_pedido, status) => {
  const res = await pool.query(
    `UPDATE pedidos
     SET status = $1
     WHERE id_pedido = $2
     RETURNING *`,
    [status, id_pedido]
  );

  return res.rows[0];
};
export const removerItem = async (id_pedido_item) => {
    const res = await pool.query(
        `DELETE FROM pedidos_itens
         WHERE id_pedido_item = $1
         RETURNING *`,
        [id_pedido_item]
    )

    return res.rows[0]
}

export const listarPedidosPendentes = async () => {
    const pedidosRes = await pool.query(
        `SELECT 
            p.id_pedido,
            p.status,
            p.data_registro,
            u.nome AS cliente_nome,
            u.email AS cliente_email
         FROM pedidos p
         JOIN usuarios u ON u.id_usuario = p.usuario_id
         WHERE p.status = 'PENDENTE'
         ORDER BY p.data_registro ASC`
    )

    const pedidos = pedidosRes.rows

    // Para cada pedido, busca os itens
    const pedidosComItens = await Promise.all(
        pedidos.map(async (pedido) => {
            const itensRes = await pool.query(
                `SELECT 
                    pi.quantidade,
                    pr.nome,
                    pr.valor,
                    (pi.quantidade * pr.valor) AS subtotal
                 FROM pedidos_itens pi
                 JOIN produtos pr ON pr.id_produto = pi.produto_id
                 WHERE pi.pedido_id = $1`,
                [pedido.id_pedido]
            )

            const total = itensRes.rows.reduce(
                (acc, item) => acc + Number(item.subtotal), 0
            )

            return {
                ...pedido,
                itens: itensRes.rows,
                total
            }
        })
    )

    return pedidosComItens
}