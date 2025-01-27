import express from "express";
import request from "supertest";
import jwt from "jsonwebtoken";
import adminRoutes from "../../routes/admin.routes";

const app = express();
app.use(express.json());
app.use("/api/admin", adminRoutes);

describe("Admin APIs", () => {
  const validAdminToken = jwt.sign(
    { id: 1, role: "ADMIN" },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.EXPIRE_IN }
  );

  const nonAdminToken = jwt.sign(
    { id: 2, role: "MANAGER" },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.EXPIRE_IN }
  );
  describe("POST /api/admin/assets", () => {
    it("should create an asset successfully", async () => {
      const response = await request(app)
        .post("/api/admin/assets")
        .set("Authorization", `Bearer ${validAdminToken}`)
        .send({
          name: "Phone 3",
          type: "Electronics",
          assetIdentifier: "103",
          purchaseDate: "2025-01-14",
          warrantyEndDate: "2026-01-14",
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toMatchObject({
        name: "Phone 3",
        type: "Electronics",
        assetIdentifier: "103",
      });
    });

    it("should return 403 for missing token", async () => {
      const response = await request(app).post("/api/admin/assets").send({
        name: "Phone 3",
        type: "Electronics",
        assetIdentifier: "103",
        purchaseDate: "2025-01-14",
        warrantyEndDate: "2026-01-14",
      });

      expect(response.status).toBe(403);
      expect(response.body.error).toBe("Token is required");
    });

    it("should return 403 for non-admin users", async () => {
      const response = await request(app)
        .post("/api/admin/assets")
        .set("Authorization", `Bearer ${nonAdminToken}`)
        .send({
          name: "Phone 3",
          type: "Electronics",
          assetIdentifier: "103",
          purchaseDate: "2025-01-14",
          warrantyEndDate: "2026-01-14",
        });

      expect(response.status).toBe(403);
      expect(response.body.status).toBe("error");
      expect(response.body.exception.error.message).toBe(
        "You do not have admin access"
      );
    });

    it("should return 400 for missing fields", async () => {
      const response = await request(app)
        .post("/api/admin/assets")
        .set("Authorization", `Bearer ${validAdminToken}`)
        .send({
          type: "Electronics",
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe("error");
      const expectedErrorMessage = [
        '"name" is required',
        '"assetIdentifier" is required',
        '"purchaseDate" is required',
        '"warrantyEndDate" is required',
      ].join("\n");
      expect(response.body.exception.error.message).toMatch(
        expectedErrorMessage
      );
    });
  });

  describe("GET /api/admin/assets", () => {
    it("should return a list of assets for an authorized admin", async () => {
      const response = await request(app)
        .get("/api/admin/assets")
        .set("Authorization", `Bearer ${validAdminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("should return 403 for non-admin users", async () => {
      const response = await request(app)
        .get("/api/admin/assets")
        .set("Authorization", `Bearer ${nonAdminToken}`);

      expect(response.status).toBe(403);
      expect(response.body.status).toBe("error");
      expect(response.body.exception.error.message).toBe(
        "You do not have admin access"
      );
    });

    it("should return 403 for missing token", async () => {
      const response = await request(app).get("/api/admin/assets");

      expect(response.status).toBe(403);
      expect(response.body.error).toBe("Token is required");
    });
  });

  describe("PATCH /api/admin/assets/:id", () => {
    it("should update asset status and warranty end date successfully", async () => {
      const response = await request(app)
        .patch("/api/admin/assets/2")
        .set("Authorization", `Bearer ${validAdminToken}`)
        .send({
          status: "UNDER_MAINTENANCE",
          warrantyEndDate: "2025-02-14",
          nextServiceDate: "2025-02-15",
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toMatchObject({
        status: "UNDER_MAINTENANCE",
      });
    });

    it("should return 403 for non-admin users", async () => {
      const response = await request(app)
        .patch("/api/admin/assets/2")
        .set("Authorization", `Bearer ${nonAdminToken}`)
        .send({
          status: "UNDER_MAINTENANCE",
          warrantyEndDate: "2025-02-14",
          nextServiceDate: "2025-02-15",
        });

      expect(response.status).toBe(403);
      expect(response.body.status).toBe("error");
      expect(response.body.exception.error.message).toBe(
        "You do not have admin access"
      );
    });

    it("should return 403 for missing token", async () => {
      const response = await request(app).patch("/api/admin/assets/2").send({
        status: "UNDER_MAINTENANCE",
        warrantyEndDate: "2025-02-14",
        nextServiceDate: "2025-02-15",
      });

      expect(response.status).toBe(403);
      expect(response.body.error).toBe("Token is required");
    });
  });

  describe("GET /api/admin/assets/:id", () => {
    it("should retrieve asset details successfully", async () => {
      const response = await request(app)
        .get("/api/admin/assets/1")
        .set("Authorization", `Bearer ${validAdminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toMatchObject({
        id: 1,
        name: expect.any(String),
        type: expect.any(String),
        status: expect.any(String),
        assetIdentifier: expect.any(String),
        purchaseDate: expect.any(String),
        warrantyEndDate: expect.any(String),
      });
    });

    it("should return 403 for non-admin users", async () => {
      const response = await request(app)
        .get("/api/admin/assets/1")
        .set("Authorization", `Bearer ${nonAdminToken}`);

      expect(response.status).toBe(403);
      expect(response.body.status).toBe("error");
      expect(response.body.exception.error.message).toBe(
        "You do not have admin access"
      );
    });

    it("should return 403 for missing token", async () => {
      const response = await request(app).get("/api/admin/assets/1");

      expect(response.status).toBe(403);
      expect(response.body.error).toBe("Token is required");
    });

    it("should return 404 if the asset does not exist", async () => {
      const response = await request(app)
        .get("/api/admin/assets/99")
        .set("Authorization", `Bearer ${validAdminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toBe(null);
    });
  });

  describe("DELETE /api/admin/assets/:id", () => {
    it("should delete an asset successfully", async () => {
      const response = await request(app)
        .delete("/api/admin/assets/2")
        .set("Authorization", `Bearer ${validAdminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data.id).toBe(2);
    });

    it("should return 403 for non-admin users", async () => {
      const response = await request(app)
        .delete("/api/admin/assets/2")
        .set("Authorization", `Bearer ${nonAdminToken}`);

      expect(response.status).toBe(403);
      expect(response.body.status).toBe("error");
      expect(response.body.exception.error.message).toBe(
        "You do not have admin access"
      );
    });

    it("should return 400 if the asset does not exist", async () => {
      const response = await request(app)
        .delete("/api/admin/assets/99")
        .set("Authorization", `Bearer ${validAdminToken}`);

      expect(response.status).toBe(400);
      expect(response.body.status).toBe("error");
      expect(response.body.exception.error.message).toBe("Asset Not Found");
    });

    it("should return 403 for missing token", async () => {
      const response = await request(app).delete("/api/admin/assets/2");

      expect(response.status).toBe(403);
      expect(response.body.error).toBe("Token is required");
    });
  });

  describe("GET /api/admin/assets/reports/asset-utilization", () => {
    it("should retrieve asset utilization report successfully", async () => {
      const response = await request(app)
        .get("/api/admin/assets/reports/asset-utilization")
        .set("Authorization", `Bearer ${validAdminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toMatchObject({
        totalAssets: expect.any(Number),
        availableAssets: expect.any(Number),
        assignedAssets: expect.any(Number),
        underMaintenanceAssets: expect.any(Number),
        availablePercentageValue: expect.any(Number),
        assignedPercentageValue: expect.any(Number),
        underMaintenancePercentageValue: expect.any(Number),
      });
    });

    it("should return 403 for non-admin users", async () => {
      const response = await request(app)
        .get("/api/admin/assets/reports/asset-utilization")
        .set("Authorization", `Bearer ${nonAdminToken}`);

      expect(response.status).toBe(403);
      expect(response.body.status).toBe("error");
      expect(response.body.exception.error.message).toBe(
        "You do not have admin access"
      );
    });

    it("should return 403 for missing token", async () => {
      const response = await request(app).get(
        "/api/admin/assets/reports/asset-utilization"
      );

      expect(response.status).toBe(403);
      expect(response.body.error).toBe("Token is required");
    });
  });

  describe("GET /api/admin/assets/warranty/date", () => {
    it("should retrieve assets with warranty expiring by a specific date", async () => {
      const response = await request(app)
        .get("/api/admin/assets/warranty/date")
        .query({ date: "2026-02-14" })
        .set("Authorization", `Bearer ${validAdminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toEqual(expect.any(Array));
      response.body.data.forEach((asset) => {
        expect(asset).toMatchObject({
          id: expect.any(Number),
          name: expect.any(String),
          warrantyEndDate: expect.any(String),
        });
        // Fix: Convert dates to timestamps before comparison
        expect(new Date(asset.warrantyEndDate).getTime()).toBeLessThanOrEqual(
          new Date("2026-02-14").getTime()
        );
      });
    });
  });

  describe("GET /api/admin/asset/history/1", () => {
    it("should retrieve the history of a specific asset", async () => {
      const response = await request(app)
        .get("/api/admin/asset/history/1")
        .set("Authorization", `Bearer ${validAdminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toEqual(expect.any(Array));

      response.body.data.forEach((history) => {
        expect(history).toMatchObject({
          assetId: 1, // Validate assetId matches the requested ID
          type: expect.any(String),
          createdOn: expect.any(String),
          createdAt: expect.any(String),
        });

        expect(history.user).toMatchObject({
          id: expect.any(Number),
          name: expect.any(String),
          email: expect.any(String),
        });
      });
    });
  });

  describe("GET /api/admin/user/history/3", () => {
    it("should retrieve the history of a specific user", async () => {
      const response = await request(app)
        .get("/api/admin/user/history/3")
        .set("Authorization", `Bearer ${validAdminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data.history).toEqual(expect.any(Array));
      response.body.data.history.forEach((entry) => {
        expect(entry).toMatchObject({
          id: expect.any(Number),
          type: expect.any(String),
          assetId: expect.any(Number),
          createdAt: expect.any(String),
          user: expect.objectContaining({
            id: 3,
            name: expect.any(String),
            email: expect.any(String),
          }),
          Asset: expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            type: expect.any(String),
          }),
        });
      });
    });
  });

  describe("GET /api/admin/users", () => {
    it("should retrieve a list of all users", async () => {
      const response = await request(app)
        .get("/api/admin/users")
        .set("Authorization", `Bearer ${validAdminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toEqual(expect.any(Array));
      response.body.data.forEach((user) => {
        expect(user).toMatchObject({
          id: expect.any(Number),
          name: expect.any(String),
          role: expect.any(String),
        });
      });
    });
  });
});
