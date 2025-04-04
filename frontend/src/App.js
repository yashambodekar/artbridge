import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ArtisanHome from "./pages/Artisan/ArtisanHome";
import ConsumerHome from "./pages/Consumer/ConsumerHome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sell from "./pages/Artisan/Sell";
import Courses from "./pages/Artisan/Courses";
import Cart from "./pages/Consumer/Cart";
import Events from "./pages/Consumer/Events";
import Shop from "./pages/Consumer/Shop";
import Payment from "./pages/Consumer/Payment";
import Footer from "./components/Footer";
import ArtisanNavbar from "./components/ArtisanNavbar";
import ConsumerNavbar from "./components/ConsumerNavbar";
import "./styles/App.css";

const getUserRole = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).role : null;
};

function App() {
  const userRole = getUserRole();

  return (
    // <Router>
    <>
      {userRole === "artisan" ? <ArtisanNavbar /> : userRole === "consumer" ? <ConsumerNavbar /> : null}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />

        {/* Protected Routes for Artisans */}
        <Route element={<PrivateRoute allowedRoles={["artisan"]} />}>
          <Route path="/Artisan/ArtisanHome" element={<ArtisanHome />} />
          <Route path="/Artisan/Sell" element={<Sell />} />
          <Route path="/Artisan/Courses" element={<Courses />} />
          {/* <Route path="/Profile" element={<Profile />} /> */}
        </Route>

        {/* Protected Routes for Consumers */}
        <Route element={<PrivateRoute allowedRoles={["consumer"]} />}>
          <Route path="/Consumer/ConsumerHome" element={<ConsumerHome />} />
          <Route path="/Consumer/Shop" element={<Shop />} />
          <Route path="/Consumer/Cart" element={<Cart />} />
          <Route path="/Consumer/Events" element={<Events />} />
          <Route path="/Consumer/Payment" element={<Payment />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
}

// hhgyutff
export default App;
