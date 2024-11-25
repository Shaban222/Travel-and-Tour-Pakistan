import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {
  HotelSearchResponse,
  HotelType,
  PackageType,
  PaymentIntentResponse,
  UserType,
} from "../../backend/src/shared/types";
import { BookingFormData } from "./forms/BookingForm/BookingForm";

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

/* ---- Types ---- */
export type PackageData = {
  packageName: string;
  vehicle: string;
  numLocations: number;
  locations: {name: string, description: string}[];
  days: number;
  packageDescription: string;
  pricePerPerson: number;
  type: string;
  facilities: string[];
  departureDate: string; // ISO string
  arrivalDate: string;   // ISO string
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

// type BookingsResponse = {
//   hotels: HotelType[];
//   packages: PackageType[];
// };

/* ---- API Endpoints ---- */

// Fetch current user
export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Error fetching user");
  return response.json();
};

// User Registration
export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!response.ok) throw new Error("Error registering user");
  return response.json();
};

// User Login
export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.message);
  return body;
};

// Token Validation
export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Token invalid");
  return response.json();
};

// User Logout
export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok) throw new Error("Error during sign out");
};

/* ---- Hotels ---- */

// Add a Hotel
export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }
}

// Fetch User's Hotels
export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Error fetching hotels");
  return response.json();
};

// Fetch Hotel by ID
export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Error fetching hotel");
  return response.json();
};

// Update Hotel by ID
export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );
  if (!response.ok) throw new Error("Failed to update hotel");
  return response.json();
};

// Search Hotels
export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) value.forEach((v) => queryParams.append(key, v));
    else if (value) queryParams.append(key, value);
  }
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`
  );
  if (!response.ok) throw new Error("Error fetching hotels");
  return response.json();
};

// Fetch All Hotels
export const fetchHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels`);
  if (!response.ok) throw new Error("Error fetching hotels");
  return response.json();
};

// Fetch Hotel by ID
export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
  if (!response.ok) throw new Error("Error fetching hotel");
  return response.json();
};

/* ---- Bookings ---- */

// Create a Payment Intent
export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ numberOfNights }),
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!response.ok) throw new Error("Error fetching payment intent");
  return response.json();
};

// Book a Room
export const createRoomBooking = async (formData: BookingFormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    }
  );
  if (!response.ok) throw new Error("Error booking room");
};

// Fetch User's Bookings
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchMyBookings = async (): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Unable to fetch bookings");
  return response.json();
};

/* ---- Packages ---- */

// Add a Package
export const addPackage = async (packageData: PackageData): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/packages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Ensure cookies are sent with the request
    body: JSON.stringify(packageData),
  });
  if (!response.ok) {
    throw new Error("Failed to add package");
  }
};
// Fetch Business Owner's Packages
export const fetchMyPackages = async (): Promise<PackageType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/packages/for-owners`, {
    credentials: "include",
  });

  if (!response.ok) {
    // Log or handle non-200 responses
    const errorText = await response.text(); // Capture the raw error response
    console.error("Error response:", errorText);
    throw new Error("Error fetching packages");
  }

  try {
    return await response.json();
  } catch (err) {
    console.error("Failed to parse JSON response:", err);
    throw new Error("Unexpected response format");
  }
};

// Fetch All Packages
export const fetchPackages = async (): Promise<PackageType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/packages`,{
    credentials: "include",
  });
  if (!response.ok) throw new Error("Error fetching Packages");
  return response.json();
};

// Fetch Package by ID
export const fetchPackageById = async (packageId: string): Promise<PackageType> => {
  const response = await fetch(`${API_BASE_URL}/api/packages/${packageId}`,{
    credentials: "include",
  });
  if (!response.ok) throw new Error("Error fetching Package");
  return response.json();
};



// import { RegisterFormData } from "./pages/Register";
// import { SignInFormData } from "./pages/SignIn";
// import {
//   HotelSearchResponse,
//   HotelType,
//   PackageType,
//   PaymentIntentResponse,
//   UserType,
// } from "../../backend/src/shared/types";
// import { BookingFormData } from "./forms/BookingForm/BookingForm";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// export const fetchCurrentUser = async (): Promise<UserType> => {
//   const response = await fetch(`${API_BASE_URL}/api/users/me`, {
//     credentials: "include",
//   });
//   if (!response.ok) {
//     throw new Error("Error fetching user");
//   }
//   return response.json();
// };

// export const register = async (formData: RegisterFormData) => {
//   const response = await fetch(`${API_BASE_URL}/api/users/register`, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   });

//   if (!response.ok) {
//     throw new Error("Error fetching user");
//   }

//   return response.json();
// };

// export const signIn = async (formData: SignInFormData) => {
//   const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   });

//   const body = await response.json();
//   if (!response.ok) {
//     throw new Error(body.message);
//   }
//   return body;
// };

// export const validateToken = async () => {
//   const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
//     credentials: "include",
//   });

//   if (!response.ok) {
//     throw new Error("Token invalid");
//   }

//   return response.json();
// };

// export const signOut = async () => {
//   const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
//     credentials: "include",
//     method: "POST",
//   });

//   if (!response.ok) {
//     throw new Error("Error during sign out");
//   }
// };

// export const addMyHotel = async (hotelFormData: FormData) => {
//   const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
//     method: "POST",
//     credentials: "include",
//     body: hotelFormData,
//   });

//   if (!response.ok) {
//     throw new Error("Failed to add hotel");
//   }

//   return response.json();
// };

// // Fetch hotels for business owner
// export const fetchMyHotels = async (): Promise<HotelType[]> => {
//   const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
//     credentials: "include",
//   });

//   if (!response.ok) {
//     throw new Error("Error fetching hotels");
//   }
//   return response.json();
// };

// export const fetchMyPackages = async (): Promise<PackageType[]> => {
//   const response = await fetch(`${API_BASE_URL}/api/my-packages`, {
//     credentials: "include",
//   });

//   if (!response.ok) {
//     throw new Error("Error fetching packages");
//   }

//   return response.json();
// };

// export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
//   const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
//     credentials: "include",
//   });

//   if (!response.ok) {
//     throw new Error("Error fetching Hotels");
//   }

//   return response.json();
// };

// export const updateMyHotelById = async (hotelFormData: FormData) => {
//   const response = await fetch(
//     `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
//     {
//       method: "PUT",
//       body: hotelFormData,
//       credentials: "include",
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to update Hotel");
//   }

//   return response.json();
// };

// export type SearchParams = {
//   destination?: string;
//   checkIn?: string;
//   checkOut?: string;
//   adultCount?: string;
//   childCount?: string;
//   page?: string;
//   facilities?: string[];
//   types?: string[];
//   stars?: string[];
//   maxPrice?: string;
//   sortOption?: string;
// };

// export const searchHotels = async (
//   searchParams: SearchParams
// ): Promise<HotelSearchResponse> => {
//   const queryParams = new URLSearchParams();
//   queryParams.append("destination", searchParams.destination || "");
//   queryParams.append("checkIn", searchParams.checkIn || "");
//   queryParams.append("checkOut", searchParams.checkOut || "");
//   queryParams.append("adultCount", searchParams.adultCount || "");
//   queryParams.append("childCount", searchParams.childCount || "");
//   queryParams.append("page", searchParams.page || "");

//   queryParams.append("maxPrice", searchParams.maxPrice || "");
//   queryParams.append("sortOption", searchParams.sortOption || "");

//   searchParams.facilities?.forEach((facility) =>
//     queryParams.append("facilities", facility)
//   );

//   searchParams.types?.forEach((type) => queryParams.append("types", type));
//   searchParams.stars?.forEach((star) => queryParams.append("stars", star));

//   const response = await fetch(
//     `${API_BASE_URL}/api/hotels/search?${queryParams}`
//   );

//   if (!response.ok) {
//     throw new Error("Error fetching hotels");
//   }

//   return response.json();
// };

// export const fetchHotels = async (): Promise<HotelType[]> => {
//   const response = await fetch(`${API_BASE_URL}/api/hotels`);
//   if (!response.ok) {
//     throw new Error("Error fetching hotels");
//   }
//   return response.json();
// };

// export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
//   const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
//   if (!response.ok) {
//     throw new Error("Error fetching Hotels");
//   }

//   return response.json();
// };

// export const createPaymentIntent = async (
//   hotelId: string,
//   numberOfNights: string
// ): Promise<PaymentIntentResponse> => {
//   const response = await fetch(
//     `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
//     {
//       credentials: "include",
//       method: "POST",
//       body: JSON.stringify({ numberOfNights }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Error fetching payment intent");
//   }

//   return response.json();
// };

// export const createRoomBooking = async (formData: BookingFormData) => {
//   const response = await fetch(
//     `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify(formData),
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Error booking room");
//   }
// };
// type BookingsResponse = {
//   hotels: HotelType[];
//   packages: PackageType[];
// };

// export const fetchMyBookings = async (): Promise<BookingsResponse> => {
//   const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
//     credentials: "include",
//   });

//   const responseBody = await response.text();

//   if (!response.ok) {
//     console.error("Error fetching bookings:", responseBody);
//     throw new Error("Unable to fetch bookings");
//   }

//   return JSON.parse(responseBody);
// };


// // export const fetchMyBookings = async (): Promise<HotelType[]> => {
// //   const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
// //     credentials: "include",
// //   });

// //   const responseBody = await response.text(); // Get response as text

// //   if (!response.ok) {
// //     console.error("Error fetching bookings:", responseBody); // Log the error response
// //     throw new Error("Unable to fetch bookings");
// //   }

// //   return JSON.parse(responseBody); // Parse it to JSON
// // };
