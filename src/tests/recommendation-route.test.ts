import express from "express";
import request from "supertest";
import { errorHandler } from "../middleware/error-handler";
import recommendationRoutes from "../routes/recommendation-routes";

const app = express();
app.use(express.json());
app.use("/api", recommendationRoutes);
app.use(errorHandler);

describe("Recommendation Routes", () => {
  it("GET /api/recommendations/:userId should return recommendations for a valid user", async () => {
    const userId = "1"; // Ana
    const response = await request(app).get(`/api/recommendations/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0); // Expect at least one recommendation
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          category: expect.any(String),
          price: expect.any(Number),
          description: expect.any(String),
          tags: expect.any(Array),
          stock: expect.any(Number),
        }),
      ])
    );
  });

  it("GET /api/recommendations/:userId should return 400 for an invalid user", async () => {
    const invalidUserId = "999";
    const response = await request(app).get(
      `/api/recommendations/${invalidUserId}`
    );

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "User not found",
    });
  });
});
