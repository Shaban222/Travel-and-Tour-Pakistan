import express, { Request, Response } from "express";
import Package from "../models/package.js";
import { param, validationResult } from "express-validator";
import verifyToken from "../middleware/auth.js";
 import { PackageSearchResponse } from "../shared/types";

const router = express.Router();

// Search for packages
router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "priceAsc":
        sortOptions = { price: 1 };
        break;
      case "priceDesc":
        sortOptions = { price: -1 };
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");
    const skip = (pageNumber - 1) * pageSize;

    const packages = await Package.find(query).sort(sortOptions).skip(skip).limit(pageSize);
    const total = await Package.countDocuments(query);

    const response
    // : PackageSearchResponse 
    = {
      data: packages,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Get all packages
router.get("/", async (req: Request, res: Response) => {
  try {
    const packages = await Package.find().sort("-lastUpdated");
    res.json(packages);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching packages" });
  }
});

// Get a package by ID
router.get("/:id", [param("id").notEmpty().withMessage("Package ID is required")], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = req.params.id.toString();

  try {
    const packageItem = await Package.findById(id);
    res.json(packageItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching package" });
  }
});

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.destination = new RegExp(queryParams.destination, "i");
  }

  if (queryParams.priceRange) {
    constructedQuery.price = {
      $lte: parseInt(queryParams.priceRange),
    };
  }

  return constructedQuery;
};

export default router;
