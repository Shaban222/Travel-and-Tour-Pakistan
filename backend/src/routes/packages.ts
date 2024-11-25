import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
import Package from "../models/package.js";
import verifyToken from "../middleware/auth.js";
import { PackageType } from "../shared/types.js";

const router = express.Router();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Middleware to ensure the user is authenticated
router.use(verifyToken);

// Helper for uploading images to Cloudinary
// const uploadImageToCloudinary = (fileBuffer: Buffer, folder: string): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       { folder },
//       (error, result) => {
//         if (error) {
//           reject(error);
//         } else if (result) {
//           resolve(result.secure_url);
//         }
//       }
//     );
//     uploadStream.end(fileBuffer);
//   });
// };

// Create a new package
router.post(
  "/",
  [
    body("packageName").notEmpty().withMessage("Package name is required"),
    body("packageDescription").notEmpty().withMessage("Package description is required"),
    body("locations").isArray({ min: 1 }).withMessage("At least one location is required"),
    body("days").isNumeric().withMessage("Number of days must be a number"),
    body("type").notEmpty().withMessage("Package type is required"),
    body("vehicle").notEmpty().withMessage("Vehicle type is required"),
    body("pricePerPerson").isNumeric().withMessage("Price per person must be a number"),
    body("facilities").isArray().withMessage("Facilities are required"),
    body("departureDate").notEmpty().withMessage("Departure date is required"),
    body("arrivalDate").notEmpty().withMessage("Arrival date is required"),
  ],
  // upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    console.log("Packages Before Validation",req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Packages After Validation",req.body)

    try {
      const {
        packageName,
        packageDescription,
        locations,
        days,
        type,
        vehicle,
        facilities,
        pricePerPerson,
        departureDate,
        arrivalDate,
      } = req.body;

      // Handle image uploads
      // const imageUrls = await Promise.all(
      //   imageFiles.map((file) => uploadImageToCloudinary(file.buffer, "packages"))
      // );
      // const imageFiles = req.files as Express.Multer.File[];
      // const imageUrls = await uploadImages(imageFiles);
      // console.log("imageFiles",imageFiles)

      const newPackage: PackageType = {
        _id: new mongoose.Types.ObjectId().toString(),
        userId: req.userId,
        packageName,
        packageDescription,
        locations: locations,
        days: Number(days),
        type,
        vehicle,
        facilities: facilities,
        pricePerPerson: Number(pricePerPerson),
        departureDate: new Date(departureDate),
        arrivalDate: new Date(arrivalDate),
        // imageUrls,
        createdAt: new Date(),
        updatedAt: new Date(),
        bookings: [],
        totalCost: Number(pricePerPerson) * Number(days),
      };

      const travelPackage = new Package(newPackage);
      await travelPackage.save();

      res.status(201).json(travelPackage);
    } catch (error) {
      console.error("Error creating package:", error);
      res.status(500).json({ error: "Failed to create package" });
    }
  }
);

// Update a package
router.put("/:id", upload.array("imageFiles", 6), async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingPackage = await Package.findOne({ _id: id, userId: req.userId });

    if (!existingPackage) {
      return res.status(404).json({ error: "Package not found" });
    }

    // const imageFiles = req.files as Express.Multer.File[];
    // const newImageUrls = await Promise.all(
    //   imageFiles.map((file) => uploadImageToCloudinary(file.buffer, "packages"))
    // );

    const updatedPackageData = {
      ...req.body,
      // imageUrls: [...existingPackage.imageUrls, ...newImageUrls],
      updatedAt: new Date(),
    };

    const updatedPackage = await Package.findOneAndUpdate(
      { _id: id, userId: req.userId },
      updatedPackageData,
      { new: true }
    );

    res.status(200).json(updatedPackage);
  } catch (error) {
    console.error("Error updating package:", error);
    res.status(500).json({ error: "Failed to update package" });
  }
});

// Other routes remain unchanged
// fetch all packages
router.get("/", async (req: Request, res: Response) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({ error: "Failed to fetch packages" });
  }
});

// fetch all packages made by an owner by using owner's userId.
router.get("/for-owners", async (req: Request, res: Response) => {
  try {
    const ownerPackages = await Package.find({ userId: req.userId });

    res.status(200).json(ownerPackages);
  } catch (error) {
    console.error("Error fetching owner's package:", error);
    res.status(500).json({ error: "Failed to fetch package" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const travelPackage = await Package.findOne({ _id: id });

    if (!travelPackage) {
      return res.status(404).json({ error: "Package not found" });
    }
    console.log("Package",travelPackage)
    res.status(200).json(travelPackage);
  } catch (error) {
    console.error("Error fetching package:", error);
    res.status(500).json({ error: "Failed to fetch package" });
  }
});


router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedPackage = await Package.findOneAndDelete({
      _id: id,
    });

    if (!deletedPackage) {
      return res.status(404).json({ error: "Package not found" });
    }

    res.status(200).json(deletedPackage);
  } catch (error) {
    console.error("Error deleting package:", error);
    res.status(500).json({ error: "Failed to delete package" });
  }
});

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}


export default router;
