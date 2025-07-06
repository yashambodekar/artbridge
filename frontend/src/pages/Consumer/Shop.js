import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../../styles/Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend API
    axios.get("https://artisans-bridge.onrender.com/api/products/AllProducts")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post("https://artisans-bridge.onrender.com/api/cart/add", 
        { productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`${product.name} added to cart!`);
    } catch (err) {
      console.error("Failed to add to cart", err);
      alert("Could not add to cart.");
    }
  };
  
  return (
    <div className="shop-container">
      <h1>Shop Products</h1>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img
               src={product.image ? `https://artisans-bridge.onrender.com/${product.image}` : "https://via.placeholder.com/150"}
               alt={product.name}
               className="product-image"
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">₹{product.price}</p>
              <p>By: <strong>{product.artisan?.name || "Unknown"}</strong></p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
