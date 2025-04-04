import React, { useState } from "react";
import "./../../styles/Sell.css"; // Create this CSS file
import { useNavigate } from "react-router-dom";

const Sell = () => {
  const navigate = useNavigate();

  // Sample product data (replace with API later)
  const [products] = useState([
    {
      id: 1,
      name: "Handmade Necklace",
      price: "₹500",
      description: "Beautiful handcrafted necklace",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Wooden Carving",
      price: "₹800",
      description: "Traditional wooden carving art",
      image: "https://via.placeholder.com/150",
    },
  ]);

  return (
    <div className="sell-container">
      <h1>My Products</h1>

      <button className="new-product-btn" onClick={() => navigate("/addproduct")}>
        + New Product
      </button>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="price">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sell;
