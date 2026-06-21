import request from "supertest";
import { createApp } from "../app";

describe("health endpoint", () => {
  it("returns service status", async () => {
    const response = await request(createApp()).get("/health").expect(200);
    expect(response.body).toEqual({ status: "ok", service: "safargo-api" });
  });
});
