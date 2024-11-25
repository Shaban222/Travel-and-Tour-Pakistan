import mongoose, { Schema } from "mongoose";
import { PackageType } from "../shared/types.js";
import { packagebookingSchema } from "./packagebooking.js";

const packageSchema = new Schema<PackageType>(
  {
    packageName: { type: String, required: true },
    packageDescription: { type: String, required: true },
    type: { type: String, required: true },
    vehicle: { type: String, required: true },
    locations: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    days: { type: Number, required: true },
    facilities: { type: [String], required: true },
    pricePerPerson: { type: Number, required: true },
    departureDate: { type: Date, required: true },
    arrivalDate: { type: Date, required: true },
    userId: { type: String, required: true },
    bookings: [packagebookingSchema], // Use schema, not model
  },
  { timestamps: true }
);

const Package = mongoose.model<PackageType>("Package", packageSchema);

export default Package;

// import mongoose, { Schema } from "mongoose";
// import { PackageType, BookingType } from "../shared/types";

// const bookingSchema = new Schema<BookingType>({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   totalCost: { type: Number, required: true },
//   checkIn: { type: Date },
//   checkOut: { type: Date },
// });


// const packageSchema = new Schema<PackageType>(
//   {
//     packageName: { type: String, required: true },
//     packageDescription: { type: String, required: true },
//     type: { type: String, required: true },
//     vehicle: { type: String, required: true },
//     locations: [
//       {
//         name: { type: String, required: true },
//         description: { type: String, required: true },
//       },
//     ],
//     days: { type: Number, required: true },
//     facilities: { type: [String], required: true },
//     pricePerPerson: { type: Number, required: true },
//     departureDate: { type: Date, required: true },
//     arrivalDate: { type: Date, required: true },
//     imageUrls: { type: [String], required: true },
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//   },
//     // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     bookings: [bookingSchema],
//   },
//   { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
// );

// const Package = mongoose.model<PackageType>("Package", packageSchema);
// export default Package;



// import mongoose, { Schema } from "mongoose";
// import { PackageType, BookingType } from "../shared/types";

// const bookingSchema = new Schema<BookingType>({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   totalCost: { type: Number, required: true },
//   checkIn: { type: Date },
//   checkOut: { type: Date },
// });

// const packageSchema = new Schema<PackageType>(
//   {
//     packageName: { type: String, required: true },
//     packageDescription: { type: String, required: true },
//     type: { type: String, required: true },
//     vehicle: { type: String, required: true },
//     locations: [
//       {
//         name: { type: String, required: true },
//         description: { type: String, required: true },
//       },
//     ],
//     days: { type: Number, required: true },
//     facilities: { type: [String], required: true },
//     pricePerPerson: { type: Number, required: true },
//     departureDate: { type: Date, required: true },
//     arrivalDate: { type: Date, required: true },
//     imageUrls: { type: [String], required: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     bookings: [bookingSchema],
//   },
//   { timestamps: true }
// );

// const Package = mongoose.model<PackageType>("Package", packageSchema);
// export default Package;



// import mongoose from "mongoose";
// import { PackageType } from "../shared/types.js";

// const locationSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
// });

// const packageSchema = new mongoose.Schema<PackageType>({
//   userId: { type: String, required: true },
//   packageName: { type: String, required: true },
//   packageDescription: { type: String, required: true },
//   locations: {
//     type: [locationSchema],
//     validate: {
//       validator: (locations: any[]) => locations.length >= 2 && locations.length <= 6,
//       message: "You must select between 2 and 6 locations.",
//     },
//   },
//   totalCost: { type: Number, required: true },
//   imageUrl: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
//   lastUpdated: { type: Date, default: Date.now },
// //   minLocations: { type: Number, default: 2 }, // Optional if you want to track it separately
// //   maxLocations: { type: Number, default: 6 }, // Optional if you want to track it separately
// });

// const Package = mongoose.model<PackageType>("Package", packageSchema);
// export default Package;
