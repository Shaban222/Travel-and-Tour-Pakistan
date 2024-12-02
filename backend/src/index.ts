import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";

// Routes
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import myHotelRoutes from "./routes/my-hotels.js";
import hotelRoutes from "./routes/hotels.js";
import bookingRoutes from "./routes/my-bookings.js";
import packageRoutes from "./routes/packages.js";
import myPackageRoutes from "./routes/my-packages.js";
import roleRoutes from "./routes/roleRoutes.js";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// MongoDB Connection
const mongoURI = process.env.MONGODB_CONNECTION_STRING as string;
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Create __dirname manually for ES Module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express App Initialization
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Static Files
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-bookings", bookingRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/my-packages", myPackageRoutes);
app.use("/api/roles", roleRoutes);

// Fallback Route for SPA
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

// Server Initialization
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});





// import express, { Request, Response } from "express";
// import cors from "cors";
// import "dotenv/config";
// import mongoose from "mongoose";
// import userRoutes from "./routes/users.js";
// import authRoutes from "./routes/auth.js";
// import cookieParser from "cookie-parser";
// import path from "path";
// import { v2 as cloudinary } from "cloudinary";
// import myHotelRoutes from "./routes/my-hotels.js";
// import hotelRoutes from "./routes/hotels.js";
// import bookingRoutes from "./routes/my-bookings.js";
// import packageRoutes from "./routes/packages.js";
// import myPackageRoutes from "./routes/my-packages.js";
// import { fileURLToPath } from "url";
// import roleRoutes from "./routes/roleRoutes.js";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);


// // Create __dirname manually for ES Module environment
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// const app = express();
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL, 
//     credentials: true,
//   })
// );

// app.use(express.static(path.join(__dirname, "../../frontend/dist")));
// //app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/my-hotels", myHotelRoutes);
// app.use("/api/hotels", hotelRoutes);
// app.use("/api/my-bookings", bookingRoutes);
// app.use("/api/packages", packageRoutes);
// app.use("/api/my-packages", myPackageRoutes);
// // Use the role-based routes
// app.use("/api/roles", roleRoutes);

// app.get("*", (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
// });

// app.listen(7000, () => {
//   console.log("server running on localhost:7000");
// });
