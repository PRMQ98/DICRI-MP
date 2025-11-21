import request from "supertest";
import app from "../src/app.js";

describe("Expedientes API", () => {
  it("Debe exigir autenticación para listar expedientes", async () => {
    const res = await request(app).get("/api/expedientes");
    expect(res.statusCode).toBe(401);
  });
});
