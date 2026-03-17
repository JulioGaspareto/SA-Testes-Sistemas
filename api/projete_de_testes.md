
# ENTREGA 8 — Descritivo de Casos de Teste de Software

## 8.1 Casos de Teste

A tabela abaixo relaciona os casos de teste aos requisitos funcionais do sistema.

| ID Caso de Teste | ID Requisito Funcional   | Descrição                         | Precondição            | Passos                                                                                                      | Resultado Esperado                          |
| ---------------- | ------------------------ | --------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| CT-01            | RF-01 Cadastro           | Validar cadastro de usuário       | Usuário não cadastrado | 1. Acessar tela de cadastro<br>2. Informar nome, email e senha<br>3. Clicar em cadastrar                    | Usuário é cadastrado com sucesso no sistema |
| CT-02            | RF-02 Login              | Validar login com dados válidos   | Usuário cadastrado     | 1. Acessar tela de login<br>2. Informar email e senha<br>3. Clicar em entrar                                | Usuário acessa o sistema                    |
| CT-03            | RF-02 Login              | Validar login com senha incorreta | Usuário cadastrado     | 1. Acessar tela de login<br>2. Informar email correto<br>3. Informar senha incorreta<br>4. Clicar em entrar | Sistema exibe mensagem de erro              |
| CT-04            | RF-06 Criar tarefa       | Validar cadastro de tarefa        | Usuário logado         | 1. Acessar área de tarefas<br>2. Clicar em criar tarefa<br>3. Preencher título e descrição<br>4. Salvar     | Tarefa aparece na lista de tarefas          |
| CT-05            | RF-07 Editar tarefa      | Validar edição de tarefa          | Tarefa cadastrada      | 1. Acessar lista de tarefas<br>2. Selecionar tarefa<br>3. Alterar informações<br>4. Salvar                  | Tarefa atualizada com sucesso               |
| CT-06            | RF-08 Excluir tarefa     | Validar exclusão de tarefa        | Tarefa cadastrada      | 1. Acessar lista de tarefas<br>2. Selecionar excluir tarefa                                                 | Tarefa removida da lista                    |
| CT-07            | RF-09 Visualizar tarefas | Validar visualização das tarefas  | Usuário logado         | 1. Acessar área de tarefas                                                                                  | Sistema exibe todas as tarefas cadastradas  |
| CT-08            | RF-10 Pesquisa           | Validar pesquisa de tarefas       | Tarefas cadastradas    | 1. Acessar campo de pesquisa<br>2. Digitar nome da tarefa<br>3. Executar busca                              | Sistema mostra tarefas relacionadas         |

---

# 📄 8.2 Ferramentas e Ambientes de Teste

## Ferramentas de Teste

* Navegador **Google Chrome**
* **Console do navegador**
* **Chrome DevTools**
* **Postman** (para testes de API, caso exista backend)

---

## Ambiente de Teste

**Servidor de Teste:** Ambiente local do desenvolvedor
**Banco de Dados / Versão:** MySQL ou PostgreSQL
**Browser / Versão:** Google Chrome (última versão)

---

# 📄 Observações

* Cada requisito funcional deve possuir pelo menos **um caso de teste**.
* Devem ser testados **cenários de sucesso e de erro**.
* Sempre que possível, registrar **prints ou evidências dos testes realizados**.

---

💡 **Dica de ouro pra ganhar ponto com professor:**
Se tu adicionar **casos de erro**, tipo:

* login com campo vazio
* cadastro com email já existente
* criar tarefa sem título

o trabalho fica **bem mais completo**.

---

Se quiser, **Guri Bagual**, também posso te ajudar com mais duas coisas que geralmente aparecem nessa entrega:

1️⃣ **Casos de teste MUITO mais completos (uns 15)**
2️⃣ **Matriz de rastreabilidade (requisitos ↔ testes)**

Isso normalmente deixa o trabalho **nível nota 10**.
