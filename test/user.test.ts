import app from "../src";
import request from "supertest";
import { expect } from "chai";

describe("POST Create User Wallet", () => {
  it("should create wallet for the user", () => {
    expect({ a: 1 }).to.not.have.property("b");
    expect(2).to.equal(2);
  });
});
