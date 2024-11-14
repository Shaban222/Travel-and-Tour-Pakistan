import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth.js";
import Hotel from "../models/hotel.js";
import Package from "../models/package.js";
import { HotelType, PackageType } from "../shared/types.js";

const router = express.Router();

// /api/my-bookings
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = req.userId; // Extract userId once for clarity

    // Fetch hotel bookings
    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId } },
    });

    const hotelResults = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter((booking) => booking.userId === userId);
      return {
        ...hotel.toObject(),
        bookings: userBookings,
      } as HotelType;
    });

    // Fetch package bookings
    const packages = await Package.find({
      bookings: { $elemMatch: { userId } },
    });

    const packageResults = packages.map((packageItem) => {
      const userBookings = packageItem.bookings.filter((booking) => booking.userId === userId);
      return {
        ...packageItem.toObject(),
        bookings: userBookings,
      } as PackageType;
    });

    // Return results
    return res.status(200).json({ hotels: hotelResults, packages: packageResults });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

export default router;
