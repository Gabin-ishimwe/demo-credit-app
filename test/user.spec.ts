import app from "../src";
import request from "supertest";
import chai from "chai";
import { userRegister } from "./mock/user";

describe("USER'S ENDPOINTS", () => {
  describe("USER REGISTER", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        ...userRegister,
      });
    chai.expect(res.body).to.have.property("token");
  });
});
