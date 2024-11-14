import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";

const App = () => {
  const { isLoggedIn, userRole } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        {isLoggedIn && (
          <>
            <Route
              path="/hotel/:hotelId/booking"
              element={
                userRole === "traveler" ? (
                  <Layout>
                    <Booking />
                  </Layout>) : (
                    <Navigate to="/" />
                  )
              }
            />

<Route
              path="/my-bookings"
              element={
                userRole === "traveler" ? (
                <Layout>
                  <MyBookings />
                </Layout>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="/add-hotel"
              element={
                userRole === "business owner" ? (
                  <Layout>
                    <AddHotel />
                  </Layout>
                  ) : (
                    <Navigate to="/" />
                  )
              }
            />
            <Route
              path="/edit-hotel/:hotelId"
              element={
                userRole === "business owner" ? (
                <Layout>
                  <EditHotel />
                </Layout>
                ) : (
                <Navigate to="/" />
                )
              }
            />
            <Route
              path="/my-hotels"
              element={
                userRole === "business owner" ? (
                <Layout>
                  <MyHotels />
                </Layout>
                ):(
                  <Navigate to="/" />
                )
              }
            />
            {/* <Route
              path="/my-packages"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            /> */}
            
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
