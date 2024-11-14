export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "traveler" | "business owner";  // Add role type
};

export type HotelType = {
  checkOut: string | number | Date;
  checkIn: string | number | Date;
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: BookingType[];
};

export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
};

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};

export type PackageType = {
  _id: string;
  userId: string;
  packageName: string;
  packageDescription: string;
  locations: {
    name: string;
    description: string;
  }[];
  totalCost: number;
  imageUrl: string;
  createdAt: Date;
  lastUpdated: Date;
  bookings: BookingType[]; 
};

export type PackageSearchResponse = {
  data: PackageType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
