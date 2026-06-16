import request from "supertest";
import app from "../app.js";

describe("API Good Coffee", () => {
  test("GET / deve retornar 200", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
  });
});