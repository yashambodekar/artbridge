import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ArtisanHome from "./pages/Artisan/ArtisanHome";
import ConsumerHome from "./pages/Consumer/ConsumerHome";
import Login from "./pages/Login";
import Sell from "./pages/Artisan/Sell";
import Courses from "./pages/Artisan/Courses";
import AddCourse from "./pages/Artisan/AddCourse";
import AddProduct from "./pages/Artisan/AddProduct";
import ConsumerCourses from "./pages/Consumer/ConsumerCourses";
import Cart from "./pages/Consumer/Cart";
import Events from "./pages/Consumer/Events";
import Shop from "./pages/Consumer/Shop";
import ArtisanLayout from "./pages/Artisan/ArtisanLayout";
import ConsumerLayout from "./pages/Consumer/ConsumerLayout";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CourseManage from "./pages/Artisan/CourseManage";
import CourseView from "./pages/Consumer/CourseView";
import BuyProduct from "./pages/Consumer/BuyProduct";
import ProductConsumers from "./pages/Artisan/productConsumer";
import ArtisanSignup from "./pages/ArtisanSignup";
import ConsumerSignup from "./pages/ConsumerSignup";
import "./styles/App.css";

const getUserRole = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).role : null;
};

function App() {
  const userRole = getUserRole();
  console.log("Rendering App");
  console.log("User Role:", userRole);

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ArtisanSignup" element={<ArtisanSignup />} />
        <Route path="/ConsumerSignup" element={<ConsumerSignup />} />

        {/* Protected Routes for Artisans inside ArtisanLayout */}
        <Route element={<PrivateRoute allowedRoles={["Artisan"]} />}>
          <Route path="/Artisan" element={<ArtisanLayout />}>
            <Route path="ArtisanHome" element={<ArtisanHome />} />
            <Route path="Sell" element={<Sell />} />
            <Route path="Courses" element={<Courses />} />
            <Route path="AddProduct" element={<AddProduct />} />
            <Route path="AddCourse" element={<AddCourse />} />
            <Route path="ManageCourse/:courseId" element={<CourseManage />} />
            <Route path="ProductConsumers/:productId" element={<ProductConsumers />} />
          </Route>
        </Route>

        {/* Protected Routes for Consumers */}
        <Route element={<PrivateRoute allowedRoles={["Consumer"]} />}>
          <Route path="/Consumer" element={<ConsumerLayout />}>
            <Route path="ConsumerHome" element={<ConsumerHome />} />
            <Route path="ConsumerCourses" element={<ConsumerCourses />} />
            <Route path="Cart" element={<Cart />} />
            <Route path="Events" element={<Events />} />
            <Route path="Shop" element={<Shop />} />
            <Route path="ViewCourse/:courseId" element={<CourseView />} />
            <Route path="buyproduct/:productId" element={<BuyProduct />} />
          </Route>
        </Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
