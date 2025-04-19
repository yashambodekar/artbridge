import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductConsumers = () => {
  const { productId } = useParams();
  const [consumers, setConsumers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConsumers = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${productId}/consumers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConsumers(res.data);
      } catch (err) {
        console.error("Failed to fetch consumers:", err);
        setError("Failed to fetch consumers. Please try again.");
      }
    };

    fetchConsumers();
  }, [productId]);

  return (
    <div className="consumers-container">
      <h1>Consumers</h1>
      {error && <p className="error">{error}</p>}
      {consumers.length === 0 ? (
        <p>No consumers have purchased this product yet.</p>
      ) : (
        <ul>
          {consumers.map((consumer) => (
            <li key={consumer.consumerId}>
              <p><strong>Name:</strong> {consumer.name}</p>
              <p><strong>Email:</strong> {consumer.email}</p>
              <p><strong>Contact:</strong> {consumer.contact}</p>
              <p><strong>Address:</strong> {consumer.address}</p>
              <p><strong>Quantity:</strong> {consumer.quantity}</p>
              <p><strong>Total Price:</strong> ₹{consumer.totalPrice}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductConsumers;