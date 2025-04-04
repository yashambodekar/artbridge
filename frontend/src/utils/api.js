import axios from "axios";

// Set up Axios instance with base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Change this if your backend is hosted elsewhere
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Authorization token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication APIs
export const loginUser = (credentials) => API.post("/auth/login", credentials);
export const signupUser = (userData) => API.post("/auth/signup", userData);

// Artisan APIs
export const addProduct = (productData) => API.post("/products", productData);
export const getArtisanProducts = () => API.get("/products/my-products");

// Consumer APIs
export const getAllProducts = () => API.get("/products");
export const addToCart = (productId) => API.post(`/cart/${productId}`);
export const getCartItems = () => API.get("/cart");

// Course APIs
export const addCourse = (courseData) => API.post("/courses", courseData);
export const getAllCourses = () => API.get("/courses");

// Order APIs
export const placeOrder = (orderData) => API.post("/orders", orderData);
export const getOrders = () => API.get("/orders/my-orders");

export default API;
