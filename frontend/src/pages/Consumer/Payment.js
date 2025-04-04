import React, { useState } from "react";
import "./../../styles/Payment.css"; // Create this CSS file

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const handlePayment = () => {
    alert(`Payment successful using ${paymentMethod}`);
    // Later, integrate this with backend API
  };

  return (
    <div className="payment-container">
      <h1>Complete Your Payment</h1>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <p><strong>Item:</strong> Handmade Pottery Set</p>
        <p><strong>Price:</strong> ₹1,500</p>
        <p><strong>Shipping:</strong> ₹50</p>
        <hr />
        <p><strong>Total:</strong> ₹1,550</p>
      </div>

      <div className="payment-methods">
        <h2>Select Payment Method</h2>
        <label>
          <input
            type="radio"
            name="payment"
            value="credit-card"
            checked={paymentMethod === "credit-card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Credit/Debit Card
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="upi"
            checked={paymentMethod === "upi"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          UPI / QR Code
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          PayPal
        </label>
      </div>

      <button className="pay-btn" onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;
