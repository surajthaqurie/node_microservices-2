import request from "supertest";
import server from "../../../../server";

describe("Auth routes", () => {
  it("has a route handler listing to /api/v1/auth/signup for post request", async () => {
    const response = await request(server).post("/api/v1/auth/signup").send({});

    expect(response.status).not.toEqual(404);
  });

  it("has a route handler listing to /api/v1/auth/login for post request", async () => {
    const response = await request(server).post("/api/v1/auth/login").send({});

    expect(response.status).not.toEqual(404);
  });
});
