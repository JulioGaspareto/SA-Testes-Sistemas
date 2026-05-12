CREATE TABLE pedidos(
id_pedido SERIAL PRIMARY KEY NOT NULL,
usuario_id INTEGER NOT NULL,
data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT fk_usuario
 FOREIGN KEY (usuario_id)
 REFERENCES usuarios(id_usuario)
 ON DELETE CASCADE
);

CREATE TABLE pedidos_itens (
id_pedido_iten SERIAL PRIMARY KEY NOT NULL,
pedido_id INTEGER NOT NULL,
produto_id INTEGER NOT NULL,
quantidade INTEGER DEFAULT 1,

CONSTRAINT fk_pedido
FOREIGN KEY (pedido_id)
REFERENCES pedidos(id_pedido)
ON DELETE CASCADE,

CONSTRAINT fk_produtos
FOREIGN KEY (produto_id)
REFERENCES produtos(id_produto)
ON DELETE CASCADE

);