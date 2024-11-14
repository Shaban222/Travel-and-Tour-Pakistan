import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import logoDesign from "../components/logo_design.svg";
import backgroundImage from "../components/background-image.jpg";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";

const Header = () => {
  const { isLoggedIn, userRole } = useAppContext();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const location = useLocation(); // Get the current route

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSearchBar(true); // Show SearchBar after a delay
    }, 400);
    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  // Check if user is on the home page
  const isHomePage = location.pathname === "/";

  return isHomePage ? (
    // Header1 (for Home Page)
    <div
      className="relative bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})`, height: "100vh" }}
    >
      <div className="container mx-auto flex justify-between items-center w-full p-4">
        <Link to="/" className="flex items-center">
          <img src={logoDesign} alt="Logo" className="h-10 w-auto mr-4" />
          <span className="text-4xl text-white font-bold tracking-tight">
            Travel and Tour Pakistan
          </span>
        </Link>
    
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <>
              {/* Conditional Links based on User Role */}
              {userRole === "traveler" && (
                <Link
                  className="flex items-center text-white px-4 py-2 font-semibold hover:bg-gradient-to-r from-green-500 to-green-700 rounded-md transition duration-300"
                  to="/my-bookings"
                >
                  My Bookings
                </Link>
              )}
              {userRole === "business owner" && (
                <Link
                  className="flex items-center text-white px-4 py-2 font-semibold hover:bg-gradient-to-r from-green-500 to-green-700 rounded-md transition duration-300"
                  to="/my-hotels"
                >
                  My Hotels
                </Link>
              )}
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="rounded flex bg-white items-center text-blue-600 px-4 py-2 font-semibold hover:bg-gradient-to-r from-green-500 to-green-700 hover:text-white"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
      <div className="text-center mt-24">
        <h1 className="text-5xl text-white font-extrabold animate-fade-in delay-150">
          Find Your Next Stay
        </h1>
        <p className="text-xl text-white mt-2 max-w-md mx-auto animate-fade-in delay-300">
          Search low prices on hotels for your dream vacation...
        </p>
      </div>
      {/* Conditionally render the SearchBar only on the home page */}
      {showSearchBar && (
        <div className="mt-12 ml-20 mr-20 animate-fade-in delay-400">
          <SearchBar />
        </div>
      )}
    </div>
  ) : (
    // Header2 (for other routes)
    <div className="bg-gray-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">TourandTravelPakistan.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              {/* Conditional Links based on User Role */}
              {userRole === "traveler" && (
                <Link
                  className="flex items-center text-white px-4 py-2 font-semibold hover:bg-gradient-to-r from-green-500 to-green-700 rounded-md transition duration-300"
                  to="/my-bookings"
                >
                  My Bookings
                </Link>
              )}
              {userRole === "business owner" && (
                <Link
                  className="flex items-center text-white px-4 py-2 font-semibold hover:bg-gradient-to-r from-green-500 to-green-700 rounded-md transition duration-300"
                  to="/my-hotels"
                >
                  My Hotels
                </Link>
              )}
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="rounded flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gradient-to-r from-green-500 to-green-700 hover:text-white"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
