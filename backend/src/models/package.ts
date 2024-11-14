import mongoose from "mongoose";
import { PackageType } from "../shared/types.js";

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const packageSchema = new mongoose.Schema<PackageType>({
  userId: { type: String, required: true },
  packageName: { type: String, required: true },
  packageDescription: { type: String, required: true },
  locations: {
    type: [locationSchema],
    validate: {
      validator: (locations: any[]) => locations.length >= 2 && locations.length <= 6,
      message: "You must select between 2 and 6 locations.",
    },
  },
  totalCost: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
//   minLocations: { type: Number, default: 2 }, // Optional if you want to track it separately
//   maxLocations: { type: Number, default: 6 }, // Optional if you want to track it separately
});

const Package = mongoose.model<PackageType>("Package", packageSchema);
export default Package;
