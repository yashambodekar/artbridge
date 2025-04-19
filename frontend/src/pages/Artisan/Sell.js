import React, { useState, useEffect } from "react";
import "./../../styles/Sell.css"; // Ensure this CSS file exists
import { useNavigate } from "react-router-dom";

const Sell = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You need to log in to view your products.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:5000/api/products/my-products", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // 🔥 Send token for authentication
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/products/delete/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      // Remove deleted course from UI
      setProducts(products.filter((p) => p._id !== productId));
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleViewConsumers = (productId) => {
    navigate(`/Artisan/ProductConsumers/${productId}`);
  };
  

  return (
    <div className="sell-container">
      <h1>My Products</h1>

      <button className="new-product-btn" onClick={() => navigate("/Artisan/AddProduct")}>
        + New Product
      </button>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : products.length === 0 ? (
        <p>No products found. Add a new product!</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={`http://localhost:5000/${product.image}`} alt={product.name} className="product-image" />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p className="price">₹{product.price}</p>
              <button onClick={() => handleViewConsumers(product._id)}>View Consumers</button>
              <button className="delete-btn" onClick={() => handleDelete(product._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sell;
