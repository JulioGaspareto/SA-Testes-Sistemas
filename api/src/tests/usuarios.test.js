import request from "supertest";
import app from "../app.js";

describe("Usuários", () => {

  test("Deve criar um usuário", async () => {

    const response = await request(app)
      .post("/usuarios")
      .send({
        nome: "Teste Jest",
        email: `teste${Date.now()}@email.com`,
        senha: "123456"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.nome).toBe("Teste Jest");

  });


  test("Deve realizar login", async () => {

  const email = `login${Date.now()}@email.com`;

  await request(app)
    .post("/usuarios")
    .send({
      nome: "Login Test",
      email,
      senha: "123456"
    });

  const response = await request(app)
    .post("/usuarios/login")
    .send({
      email,
      senha: "123456"
    });

  expect(response.statusCode).toBe(200);
  expect(response.body.token).toBeDefined();

});
test("Não deve acessar rota sem token", async () => {

  const response = await request(app)
    .post("/pedidos");

  expect(response.statusCode).toBe(401);

});
});