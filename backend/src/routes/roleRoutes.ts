import express from "express";
import verifyToken from "../middleware/auth.js";  // Adjust path based on your folder structure
import checkRole from "../middleware/checkRole.js";

const router = express.Router();

// Route accessible only by "business owner"
router.get("/business", verifyToken, checkRole(["business owner"]), (req, res) => {
  res.json({ message: "Welcome Business Owner!" });
});

// Route accessible only by "traveler"
router.get("/traveler", verifyToken, checkRole(["traveler"]), (req, res) => {
  res.json({ message: "Welcome Traveler!" });
});

export default router;
