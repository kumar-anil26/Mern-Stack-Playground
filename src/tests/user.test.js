import request from "supertest";
import { describe, it, expect, beforeAll } from "vitest"; // toBe ki jagah expect aayega
import app from "../app.js";
import { connectDB } from "../config/db.js";

beforeAll(async () => {
  await connectDB();
});
describe("User Api", () => {
  //! User Register with details
  it("should be create a user", async () => {
    const uniqueEmail = `anil_${Date.now()}@gmail.com`;
    const res = await request(app).post("/api/user/create").send({
      name: "Anil",
      email: uniqueEmail,
      password: "anil12",
    });

    console.log("Status:", res.status);
    console.log("Body:", res.body);

    expect(res.status).toBe(201);
  });
  let accessToken;
  let refreshToken;
  //! Test Login with right credential
  it("should login successfully with the correct credential", async () => {
    const res = await request(app).post("/api/user/login").send({
      email: "prity@example.com",
      password: "Prity@123",
    });
    console.log("Status", res.status);
    console.log("Token", res.body);
    refreshToken = res.body.userDetails.refreshToken;
    accessToken = res.body.userDetails.accessToken;
    expect(res.status).toBe(200);
  });

  //! Test login with wrong credential
  it("Should reject login with wrong credential", async () => {
    const res = await request(app).post("/api/user/login").send({
      email: "anilray@gmail.com",
      password: "anilray",
    });
    console.log("Status", res.staus);
    console.log("Body", res.body);

    expect(res.status).toBe(401);
  });

  //! Logout test
  it("Should be logout", async () => {
    const res = await request(app)
      .post("/api/user/logout")
      .set("Authorization", `Bearer ${refreshToken}`)
      .send();

    console.log(res.body);
    console.log(refreshToken);
    expect(res.status).toBe(200);
  });

  //! Post Created with correct details

  it("should be create correct post", async () => {
    const res = await request(app)
      .post("/api/product/create")
      .send({ name: "Laptop", price: 50000, quantity: 40 })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjZhYjk2ZGFmODYxMDUzMmY2OTYyNGI0MyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc5MDgzMTY3MCwiZXhwIjoxNzkwODM4ODcwfQ.VcsTfWK1zeg8TdmiuNcrmPyd3CJ39IVQJTCxMHIjrFk"
      );
    console.log("Status :", res.status);
    console.log("boyd :", res.body);
  });

  //! Show All products
  it("should we show all product ", async () => {
    const res = await request(app).get("/api/product/showall").send();
    console.log("Status ", res.status);
    console.log("Body : ", res.body);

    expect(res.status).toBe(200);
  });

  //! Show Single Product
  it("shoud we show single product", async () => {
    const res = await request(app)
      .get("/api/product/showsingle/6ab07f8863c9cd434b9ac3ef")
      .send();
    console.log("status ", res.status);
    console.log("Body ", res.body);
    expect(res.status).toBe(200);
  });
  //! Delete product test
  it("should be delete product", async () => {
    const res = await request(app)
      .delete("/api/product/delete/6ab07f8863c9cd434b9ac3ef")
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    console.log("Status ", res.status);
    console.log("Body ", res.body);
    expect(res.status).toBe(200);
  });
});
