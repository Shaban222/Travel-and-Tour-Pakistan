import express, { Request, Response } from "express";
import Package from "../models/package.js";
import verifyToken from "../middleware/auth.js";
import { body } from "express-validator";
import { PackageType } from "../shared/types";

const router = express.Router();

// Create a new package
router.post(
  "/",
  verifyToken,
  [
    body("userId").notEmpty().withMessage("User Id is required"),
    body("packageName").notEmpty().withMessage("Package Name is required"),
    body("packageDescription").notEmpty().withMessage("Package Description is required"),
    body("locations")
      .isArray({ min: 2, max: 6 })
      .withMessage("You must select between 2 and 6 locations")
      .custom((locations) => {
        locations.forEach((location: any) => {
          if (!location.name || !location.description) {
            throw new Error("Each location must have a name and description");
          }
        });
        return true;
      }),
    body("totalCost").notEmpty().isNumeric().withMessage("Total Cost is required and must be a number"),
    body("imageUrl").notEmpty().withMessage("Image URL is required"),
  ],
  async (req: Request, res: Response) => {
    try {
      const newPackage: PackageType = req.body;
      newPackage.userId = req.userId;
      newPackage.lastUpdated = new Date();

      const packageItem = new Package(newPackage);
      await packageItem.save();

      res.status(201).send(packageItem);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// Get all packages of the logged-in user
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const packages = await Package.find({ userId: req.userId });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching packages" });
  }
});

// Update a package by ID
router.put("/:packageId", verifyToken, async (req: Request, res: Response) => {
  try {
    const updatedPackage: PackageType = req.body;
    updatedPackage.lastUpdated = new Date();

    const packageItem = await Package.findOneAndUpdate(
      { _id: req.params.packageId, userId: req.userId },
      updatedPackage,
      { new: true }
    );

    if (!packageItem) {
      return res.status(404).json({ message: "Package not found" });
    }

    await packageItem.save();
    res.status(200).json(packageItem);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
