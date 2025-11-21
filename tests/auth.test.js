import request from "supertest";
import app from "../src/app.js";

describe("Auth API", () => {
  it("Debe rechazar login sin credenciales", async () => {
    const res = await request(app).post("/api/auth/login").send({});
    expect(res.statusCode).toBe(400);
  });
});
