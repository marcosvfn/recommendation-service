import { users } from "../data/mock-data";
import { RecommendationService } from "../services/recommendation-service";

describe("RecommendationService", () => {
  let recommendationService: RecommendationService;

  beforeEach(() => {
    recommendationService = new RecommendationService();
  });

  it("should return valid recommendations for a known user", () => {
    const userId = "1";
    const recommendations = recommendationService.getRecommendations(userId);

    // Ensure recommendations are returned as a non-empty array
    expect(Array.isArray(recommendations)).toBe(true);
    expect(recommendations.length).toBeGreaterThan(0);

    // Ensure each recommended product has a valid structure
    recommendations.forEach((product) => {
      expect(product).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          category: expect.any(String),
          price: expect.any(Number),
          description: expect.any(String),
          tags: expect.any(Array),
          stock: expect.any(Number),
        })
      );
    });

    const user = users.find((u) => u.id === userId);
    const ratedProductIds = user?.ratings.map((r) => r.productId) || [];
    const userPrefs = user?.preferences || [];

    // Ensure no recommended product was already rated by the user
    recommendations.forEach((product) => {
      expect(ratedProductIds).not.toContain(product.id);
    });

    // Ensure at least one recommended product matches user preferences via tags
    const matchesByTag = recommendations.filter((product) =>
      product.tags.some((tag) => userPrefs.includes(tag))
    );

    // Since the algorithm includes collaborative and content-based filters,
    // we just want to ensure that some of the recommendations align with preferences
    expect(matchesByTag.length).toBeGreaterThan(0);
  });

  it("should throw an error if the user does not exist", () => {
    const invalidUserId = "999";

    expect(() => {
      recommendationService.getRecommendations(invalidUserId);
    }).toThrow("User not found");
  });
});
