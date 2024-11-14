import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const location = useLocation(); // Get the current route

  // Determine if the current page is SignIn, Register, or MyBookings
  const isAuthOrBookingsPage = ["/sign-in", "/register", "/my-bookings"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Conditionally render the Hero and SearchBar only on routes other than the Home, auth, and MyBookings pages */}
      {location.pathname !== "/" && !isAuthOrBookingsPage && (
        <>
          <Hero />
          <div className="container mx-auto mt-8">
            <SearchBar />
          </div>
        </>
      )}
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;



// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import Hero from "../components/Hero";
// import SearchBar from "../components/SearchBar";
// import { useLocation } from "react-router-dom";


// interface Props {
//   children: React.ReactNode;
// }

// const Layout = ({ children }: Props) => {
//   const location = useLocation(); // Get the current route

//   // Determine if the current page is SignIn or Register
//   const isAuthPage = location.pathname === "/sign-in" || location.pathname === "/register";

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       {/* Conditionally render the Hero and SearchBar only on routes other than the Home page and auth pages */}
//       {location.pathname !== "/" && !isAuthPage && (
//         <>
//           <Hero />
//           <div className="container mx-auto mt-8">
//             <SearchBar />
//           </div>
//         </>
//       )}
//       <div className="container mx-auto py-10 flex-1">{children}</div>
//       <Footer />
//     </div>
//   );
// };

// export default Layout;
