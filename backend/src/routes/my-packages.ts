import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import Package from "../models/package.js";
import verifyToken from "../middleware/auth.js";
import { body } from "express-validator";
import { PackageType } from "../shared/types.js";

const router = express.Router();

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Helper function to upload images to Cloudinary
async function uploadImages(imageFiles: Express.Multer.File[]): Promise<string[]> {
  const uploadPromises = imageFiles.map(async (file) => {
    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${b64}`;
    const result = await cloudinary.v2.uploader.upload(dataURI);
    return result.url;
  });

  return await Promise.all(uploadPromises);
}

// Middleware to validate package data
const validatePackageData = [
  body("packageName").notEmpty().withMessage("Package name is required"),
  body("packageDescription").notEmpty().withMessage("Package description is required"),
  body("locations").isArray({ min: 1 }).withMessage("At least one location is required"),
  body("days").isNumeric().withMessage("Number of days must be a number"),
  body("type").notEmpty().withMessage("Package type is required"),
  body("vehicle").notEmpty().withMessage("Vehicle type is required"),
  body("pricePerPerson").isNumeric().withMessage("Price per person must be a number"),
  body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
  body("departureDate").notEmpty().withMessage("Departure date is required"),
  body("arrivalDate").notEmpty().withMessage("Arrival date is required"),
];

// Route: Create a new package
router.post(
  "/",
  verifyToken,
  validatePackageData,
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const imageUrls = await uploadImages(imageFiles);

      const newPackage: PackageType = {
        ...req.body,
        imageUrls,
        userId: req.userId,
        locations: JSON.parse(req.body.locations),
        facilities: JSON.parse(req.body.facilities),
        createdAt: new Date(),
        updatedAt: new Date(),
        bookings: [],
      };

      const packageDoc = new Package(newPackage);
      await packageDoc.save();

      res.status(201).json(packageDoc);
    } catch (e) {
      console.error("Error creating package:", e);
      res.status(500).json({ message: "Failed to create package" });
    }
  }
);

// Route: Get all packages created by the user
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const packages = await Package.find({
      userId: new mongoose.Types.ObjectId(req.userId),
    });
    res.status(200).json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({ message: "Failed to fetch packages" });
  }
});

// Route: Get a specific package by ID
router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const travelPackage = await Package.findOne({
      _id: id,
      userId: new mongoose.Types.ObjectId(req.userId),
    });

    if (!travelPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json(travelPackage);
  } catch (error) {
    console.error("Error fetching package:", error);
    res.status(500).json({ message: "Failed to fetch package" });
  }
});

// Route: Update a package
router.put(
  "/:id",
  verifyToken,
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const imageFiles = req.files as Express.Multer.File[];
      const newImageUrls = await uploadImages(imageFiles);

      const updatedPackageData = {
        ...req.body,
        imageUrls: [...(req.body.imageUrls || []), ...newImageUrls],
        updatedAt: new Date(),
      };

      const updatedPackage = await Package.findOneAndUpdate(
        { _id: id, userId: new mongoose.Types.ObjectId(req.userId) },
        updatedPackageData,
        { new: true }
      );

      if (!updatedPackage) {
        return res.status(404).json({ message: "Package not found" });
      }

      res.status(200).json(updatedPackage);
    } catch (error) {
      console.error("Error updating package:", error);
      res.status(500).json({ message: "Failed to update package" });
    }
  }
);

// Route: Delete a package
router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPackage = await Package.findOneAndDelete({
      _id: id,
      userId: new mongoose.Types.ObjectId(req.userId),
    });

    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json(deletedPackage);
  } catch (error) {
    console.error("Error deleting package:", error);
    res.status(500).json({ message: "Failed to delete package" });
  }
});

export default router;



// import express, { Request, Response } from "express";
// import multer from "multer";
// import cloudinary from "cloudinary";
// import mongoose from "mongoose";
// import Package from "../models/package.js"; // Ensure the package model exists
// import verifyToken from "../middleware/auth.js";
// import { body } from "express-validator";
// import { PackageType } from "../shared/types.js"; // Ensure this type matches your schema

// const router = express.Router();

// const storage = multer.memoryStorage();
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// });

// // Middleware to ensure the user is authenticated
// router.use(verifyToken);

// // Create a new package
// router.post(
//   "/",
//   [
//     body("packageName").notEmpty().withMessage("Package name is required"),
//     body("packageDescription")
//       .notEmpty()
//       .withMessage("Package description is required"),
//     body("locations")
//       .isArray({ min: 1 })
//       .withMessage("At least one location is required"),
//     body("days")
//       .isNumeric()
//       .withMessage("Number of days must be a number"),
//     body("type").notEmpty().withMessage("Package type is required"),
//     body("vehicle").notEmpty().withMessage("Vehicle type is required"),
//     body("pricePerPerson")
//       .isNumeric()
//       .withMessage("Price per person must be a number"),
//     body("facilities")
//       .notEmpty()
//       .isArray()
//       .withMessage("Facilities are required"),
//     body("departureDate").notEmpty().withMessage("Departure date is required"),
//     body("arrivalDate").notEmpty().withMessage("Arrival date is required"),
//   ],
//   upload.array("imageFiles", 6),
//   async (req: Request, res: Response) => {
//     try {
//       const {
//         packageName,
//         packageDescription,
//         locations,
//         days,
//         type,
//         vehicle,
//         facilities,
//         pricePerPerson,
//         departureDate,
//         arrivalDate,
//       } = req.body;

//       const imageFiles = req.files as Express.Multer.File[];
//       const imageUrls = await uploadImages(imageFiles);

//       const newPackage: PackageType = {
//         _id: new mongoose.Types.ObjectId().toString(),
//         // userId: new mongoose.Types.ObjectId(req.userId), // Convert to ObjectId
//         userId: req.userId,
//         packageName,
//         packageDescription,
//         locations: JSON.parse(locations),
//         days: Number(days),
//         type,
//         vehicle,
//         facilities: JSON.parse(facilities),
//         pricePerPerson: Number(pricePerPerson),
//         departureDate: new Date(departureDate),
//         arrivalDate: new Date(arrivalDate),
//         imageUrls,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         bookings: [],
//         totalCost: Number(pricePerPerson) * Number(days),
//       };

//       const travelPackage = new Package(newPackage);
//       await travelPackage.save();

//       res.status(201).json(travelPackage);
//     } catch (error) {
//       console.error("Error creating package:", error);
//       res.status(500).json({ error: "Failed to create package" });
//     }
//   }
// );

// // Get all packages created by the authenticated user
// router.get("/", async (req: Request, res: Response) => {
//   try {
//     const packages = await Package.find({
//       userId: new mongoose.Types.ObjectId(req.userId),
//     });
//     res.status(200).json(packages);
//   } catch (error) {
//     console.error("Error fetching packages:", error);
//     res.status(500).json({ error: "Failed to fetch packages" });
//   }
// });

// // Get a specific package by ID
// router.get("/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const travelPackage = await Package.findOne({
//       _id: id,
//       userId: new mongoose.Types.ObjectId(req.userId),
//     });

//     if (!travelPackage) {
//       return res.status(404).json({ error: "Package not found" });
//     }

//     res.status(200).json(travelPackage);
//   } catch (error) {
//     console.error("Error fetching package:", error);
//     res.status(500).json({ error: "Failed to fetch package" });
//   }
// });

// // Update a package
// router.put(
//   "/:id",
//   upload.array("imageFiles", 6),
//   async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { body } = req;

//     try {
//       const updatedPackageData = body;

//       // Handle new image uploads
//       const imageFiles = req.files as Express.Multer.File[];
//       const newImageUrls = await uploadImages(imageFiles);

//       // Add new images to existing ones
//       if (newImageUrls.length > 0) {
//         updatedPackageData.imageUrls = [
//           ...(updatedPackageData.imageUrls || []),
//           ...newImageUrls,
//         ];
//       }

//       const updatedPackage = await Package.findOneAndUpdate(
//         { _id: id, userId: new mongoose.Types.ObjectId(req.userId) },
//         { ...updatedPackageData, lastUpdated: new Date() },
//         { new: true }
//       );

//       if (!updatedPackage) {
//         return res.status(404).json({ error: "Package not found" });
//       }

//       res.status(200).json(updatedPackage);
//     } catch (error) {
//       console.error("Error updating package:", error);
//       res.status(500).json({ error: "Failed to update package" });
//     }
//   }
// );

// // Delete a package
// router.delete("/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const deletedPackage = await Package.findOneAndDelete({
//       _id: id,
//       userId: new mongoose.Types.ObjectId(req.userId),
//     });

//     if (!deletedPackage) {
//       return res.status(404).json({ error: "Package not found" });
//     }

//     res.status(200).json(deletedPackage);
//   } catch (error) {
//     console.error("Error deleting package:", error);
//     res.status(500).json({ error: "Failed to delete package" });
//   }
// });

// // Helper function to upload images to Cloudinary
// async function uploadImages(imageFiles: Express.Multer.File[]) {
//   const uploadPromises = imageFiles.map(async (file) => {
//     const b64 = Buffer.from(file.buffer).toString("base64");
//     const dataURI = `data:${file.mimetype};base64,${b64}`;
//     const result = await cloudinary.v2.uploader.upload(dataURI);
//     return result.url;
//   });

//   return await Promise.all(uploadPromises);
// }

// export default router;

