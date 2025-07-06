import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../../styles/Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("https://artisans-bridge.onrender.com/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data && res.data.products) {
        setCartItems(res.data.products);
      }
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "https://artisans-bridge.onrender.com/api/cart/remove",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(res.data.cart.products); // Update UI with new cart
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const getTotalPrice = () =>
    cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const handleBuy = (productId) => {
      navigate(`/consumer/buyproduct/${productId}`);
    };
    

  return (
    <div className="cart-container">
      <h1>My Cart</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(({ product, quantity }) => (
              <div key={product._id} className="cart-item">
                <img
                  src={`https://artisans-bridge.onrender.com/${product.image}`}
                  alt={product.name}
                  className="cart-image"
                />
                <div className="cart-details">
                  <h2>{product.name}</h2>
                  <p>Qty: {quantity}</p>
                  <p className="price">₹{product.price}</p>
                  <button className="buy-btn" onClick={() => handleBuy(product._id)}>
                  Buy
                </button>
                  <button className="remove-btn" onClick={() => handleRemove(product._id)}>
                    Remove
                  </button>
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
