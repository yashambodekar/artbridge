import React, { useState } from "react";
import "./../../styles/Cart.css"; // Create this CSS file
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  // Sample cart items (replace with API later)
  const [cartItems] = useState([
    {
      id: 1,
      name: "Handmade Earrings",
      price: 300,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Painted Vase",
      price: 1200,
      image: "https://via.placeholder.com/100",
    },
  ]);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="cart-container">
      <h1>My Cart</h1>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-image" />
                <div className="cart-details">
                  <h2>{item.name}</h2>
                  <p className="price">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <h2>Total: ₹{getTotalPrice()}</h2>
            <button className="checkout-btn" onClick={() => navigate("/checkout")}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
