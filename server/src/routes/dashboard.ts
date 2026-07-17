import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";

export const dashboardRouter = Router();

dashboardRouter.get("/dashboard", requireAuth, (req, res) => {
  res.json({
    user: req.user,
    stats: {
      lastLogin: new Date().toISOString(),
    },
  });
});
