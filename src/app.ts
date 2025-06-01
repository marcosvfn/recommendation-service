import express from "express";
import { errorHandler } from "./middleware/error-handler";
import recommendationRoutes from "./routes/recommendation-routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", recommendationRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
