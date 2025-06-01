import { products, users } from "../data/mock-data";
import { Product } from "../models";

export class RecommendationService {
  /**
   * Computes cosine similarity between two numerical vectors.
   */
  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return magnitudeA * magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
  }

  /**
   * Calculates a similarity score based on common tags and category between
   * user preferences and product.
   */
  private tagSimilarity(userPrefs: string[], product: Product): number {
    const matchingTags = product.tags.filter((tag) => userPrefs.includes(tag));
    const categoryMatch = userPrefs.includes(product.category) ? 1 : 0;
    return (matchingTags.length + categoryMatch) / (userPrefs.length + 1);
  }

  /**
   * Generates product recommendations for a given user by combining:
   *  - Collaborative filtering based on similar users' ratings
   *  - Content-based filtering based on matching tags and category
   *  - Fallback to popular products if no recommendations are found
   */
  public getRecommendations(userId: string): Product[] {
    const user = users.find((u) => u.id === userId);
    if (!user) throw new Error("User not found");

    // Create user's rating vector across all products
    const userVector = products.map((p) => {
      const rating = user.ratings.find((r) => r.productId === p.id);
      return rating ? rating.score : 0;
    });

    // Find similarity with other users
    const similarUsers = users
      .filter((u) => u.id !== userId)
      .map((otherUser) => {
        const otherVector = products.map((p) => {
          const rating = otherUser.ratings.find((r) => r.productId === p.id);
          return rating ? rating.score : 0;
        });
        return {
          userId: otherUser.id,
          similarity: this.cosineSimilarity(userVector, otherVector),
        };
      })
      .filter((s) => s.similarity > 0) // Include users with positive similarity
      .sort((a, b) => b.similarity - a.similarity);

    // Collect recommended product IDs from similar users
    const recommendedProductIds = new Set<string>();
    for (const similarUser of similarUsers) {
      const similarUserData = users.find((u) => u.id === similarUser.userId);
      similarUserData?.ratings.forEach((r) => {
        const alreadyRated = user.ratings.some(
          (ur) => ur.productId === r.productId
        );
        if (!alreadyRated) {
          recommendedProductIds.add(r.productId);
        }
      });
    }

    // Add content-based recommendations using tag and category similarity
    const preferenceBasedRecommendations = products
      .filter((p) => !user.ratings.some((r) => r.productId === p.id))
      .map((p) => ({
        product: p,
        score: this.tagSimilarity(user.preferences, p),
      }))
      .filter((p) => p.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((p) => p.product.id);

    preferenceBasedRecommendations.forEach((productId) => {
      recommendedProductIds.add(productId);
    });

    // Fallback: Recommend popular products if no recommendations are found
    if (recommendedProductIds.size === 0) {
      const popularProducts = products
        .filter((p) => !user.ratings.some((r) => r.productId === p.id))
        .sort((a, b) => b.stock - a.stock)
        .slice(0, 2)
        .map((p) => p.id);
      popularProducts.forEach((id) => recommendedProductIds.add(id));
    }

    // Return final recommendations, prioritizing higher stock and lower price
    return products
      .filter((p) => recommendedProductIds.has(p.id))
      .sort((a, b) => b.stock - a.stock || a.price - b.price);
  }
}
