
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE produtos (
    id_produto SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT,
    valor NUMERIC(10,2) NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE pedidos (
    id_pedido SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    status TEXT DEFAULT 'PENDENTE',
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id_usuario)
    ON DELETE CASCADE
);

CREATE TABLE pedidos_itens (
    id_pedido_item SERIAL PRIMARY KEY,
    pedido_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade INTEGER DEFAULT 1,

    CONSTRAINT fk_pedido
    FOREIGN KEY (pedido_id)
    REFERENCES pedidos(id_pedido)
    ON DELETE CASCADE,

    CONSTRAINT fk_produto
    FOREIGN KEY (produto_id)
    REFERENCES produtos(id_produto)
    ON DELETE CASCADE
);