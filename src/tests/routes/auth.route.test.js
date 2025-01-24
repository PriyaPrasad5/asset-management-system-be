import express from "express";
import request from "supertest";
import authRoutes from "../../routes/auth.routes";

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

describe("POST /api/auth/register", () => {
  it("should register a user successfully", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "Jagjit",
      email: "jagjit@gmail.com",
      password: "Jagjit123",
      employeeId: 11342,
    });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.name).toBe("Jagjit");
  });

  it("should return 400 for missing fields", async () => {
    const response = await request(app).post("/api/auth/register").send({}); // Missing all required fields
  
    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
  
    const expectedErrorMessage = [
      '"name" is required',
      '"email" is required',
      '"password" is required',
      '"employeeId" is required',
    ].join("\n");
  
    expect(response.body.exception.error.message).toBe(expectedErrorMessage);
  });


  it("should log in a user successfully", async () => {
    // First, ensure the user exists by registering
    await request(app).post("/api/auth/register").send({
      name: "Jagjit",
      email: "jagjit@gmail.com",
      password: "Jagjit123",
      employeeId: 11342,
    });

    // Perform the login
    const response = await request(app).post("/api/auth/login").send({
      email: "jagjit@gmail.com",
      password: "Jagjit123",
    });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveProperty("token");
  });

  it("should return 400 for invalid login credentials", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "jagjit@gmail.com",
      password: "jagjit123",
    });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.exception.error.message).toBe("Invalid credentials");
  });
});
