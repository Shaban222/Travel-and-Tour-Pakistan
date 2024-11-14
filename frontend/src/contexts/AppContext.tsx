import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { UserType } from "../../../backend/src/shared/types";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
  userRole: string | null;
  user: UserType | null; // Add user type here
};

const AppContext = React.createContext<AppContextType | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null); // Initialize user state

  // Fetch the current user's data
  const { isError } = useQuery<UserType>(
    "validateToken",
    apiClient.fetchCurrentUser,
    {
      retry: false,
      onSuccess: (userData) => {
        console.log("User Data:", userData);
        setUserRole(userData.role); // Assuming `role` is part of the user data returned
        setUser(userData); // Store the user data
      },
      onError: () => {
        setUserRole(null);
        setUser(null); // Clear user data on error
      },
    }
  );

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
        stripePromise,
        userRole,
        user, // Provide user in context
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
