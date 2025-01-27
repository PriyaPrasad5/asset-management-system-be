import express from "express";
import request from "supertest";
import jwt from "jsonwebtoken";
import managerRoutes from "../../routes/manager.routes";

const app = express();
app.use(express.json());
app.use("/api/manager", managerRoutes);

describe("Manager APIs", () => {
  const validManagerToken = jwt.sign(
    { id: 2, role: "MANAGER" },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.EXPIRE_IN }
  );

  const nonManagerToken = jwt.sign(
    { id: 3, role: "EMPLOYEE" },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.EXPIRE_IN }
  );

  describe("GET /api/manager/assets", () => {
    it("GET /api/manager/assets - should retrieve all assets", async () => {
      const response = await request(app)
        .get("/api/manager/assets")
        .set("Authorization", `Bearer ${validManagerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("should return 403 for non-manager users", async () => {
      const response = await request(app)
        .get("/api/manager/assets")
        .set("Authorization", `Bearer ${nonManagerToken}`);

      expect(response.status).toBe(403);
      expect(response.body.status).toBe("error");
      expect(response.body.exception.error.message).toBe(
        "You do not have manager access"
      );
    });

    it("should return 403 for missing token", async () => {
      const response = await request(app).get("/api/manager/assets");

      expect(response.status).toBe(403);
      expect(response.body.error).toBe("Token is required");
    });
  });

  describe("GET /api/manager/assets", () => {
    it("GET /api/manager/requests - should retrieve all requests", async () => {
      const response = await request(app)
        .get("/api/manager/requests")
        .set("Authorization", `Bearer ${validManagerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe("PATCH /api/manager/assets", () => {
    it("PATCH /api/manager/request/:id/approve - should approve a request", async () => {
      const requestId = 3;
      const requestBody = {
        assetId: "29",
        reason: "Approved",
      };

      const response = await request(app)
        .patch(`/api/manager/request/${requestId}/approve`)
        .set("Authorization", `Bearer ${validManagerToken}`)
        .send(requestBody);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data.id).toBe(3);
    });
  });

  describe("PATCH /api/manager/assets", () => {
    it("PATCH /api/manager/request/:id/reject - should reject a request", async () => {
      const requestId = 4;
      const requestBody = {
        reason: "reject",
      };

      const response = await request(app)
        .patch(`/api/manager/request/${requestId}/reject`)
        .set("Authorization", `Bearer ${validManagerToken}`)
        .send(requestBody);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data.id).toBe(4);
    });
  });

  describe("GET /api/manager/assets", () => {
    it("GET /api/manager/request/:id - should retrieve a specific request", async () => {
      const requestId = 1;

      const response = await request(app)
        .get(`/api/manager/request/${requestId}`)
        .set("Authorization", `Bearer ${validManagerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toHaveProperty("id", requestId);
    });
  });

  describe("GET /api/manager/assets", () => {
    it("GET /api/manager/assets/warranty/date?date=YYYY-MM-DD - should retrieve assets by warranty date", async () => {
      const warrantyDate = "2026-02-14";

      const response = await request(app)
        .get(`/api/manager/assets/warranty/date?date=${warrantyDate}`)
        .set("Authorization", `Bearer ${validManagerToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
});
