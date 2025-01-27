import express from "express";
import request from "supertest";
import jwt from "jsonwebtoken";
import employeeRoutes from "../../routes/employee.routes";

const app = express();
app.use(express.json());
app.use("/api/employee", employeeRoutes);

describe("Employee APIs", () => {
  const validEmployeeToken = jwt.sign(
    { id: 3, role: "EMPLOYEE" },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.EXPIRE_IN }
  );

  const nonEmployeeToken = jwt.sign(
    { id: 2, role: "MANAGER" },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.EXPIRE_IN }
  );

  describe("POST /api/employee/request", () => {
    it("should create an asset request successfully", async () => {
      const response = await request(app)
        .post("/api/employee/request")
        .set("Authorization", `Bearer ${validEmployeeToken}`)
        .send({
          name: "Laptop",
          type: "REQUEST_ASSET",
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toMatchObject({
        name: "Laptop",
        type: "REQUEST_ASSET",
        status: expect.any(String),
      });
    });

    it("should return 403 for missing token", async () => {
      const response = await request(app).post("/api/employee/request").send({
        name: "Laptop",
        type: "REQUEST_ASSET",
      });

      expect(response.status).toBe(403);
      expect(response.body.error).toBe("Token is required");
    });

    it("should return 403 for non-employee users", async () => {
      const response = await request(app)
        .post("/api/employee/request")
        .set("Authorization", `Bearer ${nonEmployeeToken}`)
        .send({
          name: "Laptop",
          type: "REQUEST_ASSET",
        });

      expect(response.status).toBe(403);
      expect(response.body.status).toBe("error");
      expect(response.body.exception.error.message).toBe(
        "You do not have employee access"
      );
    });

    it('should return a validation error when "type" is missing', async () => {
      const response = await request(app)
        .post("/api/employee/request")
        .set("Authorization", `Bearer ${validEmployeeToken}`)
        .send({ name: "Laptop" });

      expect(response.status).toBe(400);

      expect(response.body.status).toBe("error");
      expect(response.body.exception.error.message).toMatch(
        '"type" is required'
      );
    });
  });

  describe("GET /api/employee/request", () => {
    it("should retrieve asset requests for the employee", async () => {
      const response = await request(app)
        .get("/api/employee/request")
        .set("Authorization", `Bearer ${validEmployeeToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toEqual(expect.any(Array));

      response.body.data.forEach((request) => {
        expect(request).toMatchObject({
          id: expect.any(Number),
          name: expect.any(String),
          type: expect.any(String),
          status: expect.any(String),
        });
      });
    });
  });

  describe("DELETE /api/employee/request", () => {
    it("should delete a specific asset request", async () => {
      const requestId = 2;

      const response = await request(app)
        .delete(`/api/employee/request/${requestId}`)
        .set("Authorization", `Bearer ${validEmployeeToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data.id).toBe(2);
    });
  });
});
