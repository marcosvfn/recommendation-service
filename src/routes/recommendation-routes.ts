import { Request, Response, Router } from "express";
import { RecommendationService } from "../services/recommendation-service";

const router = Router();
const recommendationService = new RecommendationService();

router.get("/recommendations/:userId", (req: Request, res: Response) => {
  try {
    const recommendations = recommendationService.getRecommendations(
      req.params.userId
    );
    res.json(recommendations);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
