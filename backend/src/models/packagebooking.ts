import mongoose, { Schema } from "mongoose";
import { PackageBookingType } from "../shared/types.js";

const packagebookingSchema = new Schema<PackageBookingType>({
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  totalCost: { type: Number, required: true },
  departureDate: { type: Date, required: true },
  arrivalDate: { type: Date, required: true },
  pricePerPerson: { type: Number, required: true },
});

const PackageBooking = mongoose.model<PackageBookingType>("PackageBooking", packagebookingSchema);

export { packagebookingSchema };
export default PackageBooking;

