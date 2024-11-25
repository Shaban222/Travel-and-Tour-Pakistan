import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth.js";
import Hotel from "../models/hotel.js";
import { HotelType } from "../shared/types.js";

const router = express.Router();

// /api/my-bookings
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });

    const results = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter(
        (booking) => booking.userId === req.userId
      );

      const hotelWithUserBookings: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings,
      };

      return hotelWithUserBookings;
    });

    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

export default router;


// import express from "express";
// import Hotel from "../models/hotel.js";
// import Package from "../models/package.js";
// import authMiddleware from "../middleware/auth.js";
// import { PackageType, BookingType } from "../shared/types.js"; // Assuming types are defined
// import { HotelType } from "../shared/types.js";

// const router = express.Router();

// // Fetch bookings for the authenticated user
// router.get("/my-bookings", authMiddleware, async (req, res) => {
//   try {
//     const userId = req.userId;

//     // Fetch hotel bookings
//     const hotelBookings = await Hotel.find({ "bookings.userId": userId })
//       .select("name city country bookings")
//       .lean<HotelType[]>();

//     // Fetch package bookings
//     const packageBookings = await Package.find({ "bookings.userId": userId })
//       .select("packageName type bookings")
//       .lean<PackageType[]>();

//     // Format bookings
//     const formattedBookings = [
//       ...hotelBookings.map((hotel) => ({
//         hotelId: hotel._id,
//         hotelName: hotel.name,
//         city: hotel.city,
//         country: hotel.country,
//         bookings: hotel.bookings
//           .filter((b: BookingType) => b.userId.toString() === userId)
//           .map((b) => ({
//             totalCost: b.totalCost,
//             checkIn: b.checkIn,
//             checkOut: b.checkOut,
//           })),
//       })),
//       ...packageBookings.map((pkg) => ({
//         packageId: pkg._id,
//         packageName: pkg.packageName,
//         type: pkg.type,
//         bookings: pkg.bookings
//           .filter((b: BookingType) => b.userId.toString() === userId)
//           .map((b) => ({
//             totalCost: b.totalCost,
//             checkIn: b.checkIn,
//             checkOut: b.checkOut,
//           })),
//       })),
//     ];

//     res.status(200).json(formattedBookings);
//   } catch (error) {
//     console.error("Error fetching bookings:", error);
//     res.status(500).json({ message: "Error fetching bookings" });
//   }
// });

// export default router;


// import express, { Request, Response } from "express";
// import verifyToken from "../middleware/auth.js";
// import Hotel from "../models/hotel.js";
// import Package from "../models/package.js";
// import { HotelType, PackageType } from "../shared/types.js";

// const router = express.Router();

// // /api/my-bookings
// router.get("/", verifyToken, async (req: Request, res: Response) => {
//   try {
//     const userId = req.userId; // Extract userId once for clarity

//     // Fetch hotel bookings
//     const hotels = await Hotel.find({
//       bookings: { $elemMatch: { userId } },
//     });

//     const hotelResults = hotels.map((hotel) => {
//       const userBookings = hotel.bookings.filter((booking) => booking.userId === userId);
//       return {
//         ...hotel.toObject(),
//         bookings: userBookings,
//       } as HotelType;
//     });

//     // Fetch package bookings
//     const packages = await Package.find({
//       bookings: { $elemMatch: { userId } },
//     });

//     const packageResults = packages.map((packageItem) => {
//       const userBookings = packageItem.bookings.filter((booking) => booking.userId === userId);
//       return {
//         ...packageItem.toObject(),
//         bookings: userBookings,
//       } as PackageType;
//     });

//     // Return results
//     return res.status(200).json({ hotels: hotelResults, packages: packageResults });
//   } catch (error) {
//     console.error("Error fetching bookings:", error);
//     return res.status(500).json({ message: "Unable to fetch bookings" });
//   }
// });

// export default router;
