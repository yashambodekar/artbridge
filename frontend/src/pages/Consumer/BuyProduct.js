import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./../../styles/BuyProduct.css"; // Assuming you have a CSS file for styling
import axios from "axios";

const BuyProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  // State for product details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [nearbyLocation, setNearbyLocation] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [contact, setContact] = useState("");
  const [quantity, setQuantity] = useState(1); // New state for quantity
  const [price, setPrice] = useState(0); // State to store product price
  const [error, setError] = useState("");
  const [artisanDetails, setArtisanDetails] = useState(null);

  // Fetch product price (optional, if not already available)
  React.useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`https://artisans-bridge.onrender.com/api/products/${productId}/price`);
        setPrice(res.data.price); // Assuming the backend returns the product price
      } catch (err) {
        console.error("Failed to fetch product details:", err);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const fetchCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=ac40a620c81943339ed894401d491898`
          );

          if (res.data.results.length > 0) {
            const components = res.data.results[0].components;

            // Extract address components
            setFlatNo(components.house_number || "");
            setNearbyLocation(components.road || "");
            setCity(components.city || components.town || components.village || "");
            setPincode(components.postcode || "");
            setState(components.state || "");
            setCountry(components.country || "");
          } else {
            alert("Unable to fetch location details.");
          }
        } catch (error) {
          console.error("Error fetching location:", error);
          alert("Failed to fetch location. Please try again.");
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Failed to get your location. Please try again.");
      }
    );
  };

  const handleBuy = async (e) => {
    e.preventDefault();

    if (!name || !email || !flatNo || !nearbyLocation || !city || !pincode || !state || !country || !contact || quantity < 1) {
      setError("Please fill in all required fields and ensure quantity is at least 1.");
      return;
    }

    const address = `${flatNo}, ${nearbyLocation}, ${city}, ${state}, ${country} - ${pincode}`;
    const totalPrice = price * quantity; // Calculate total price

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://artisans-bridge.onrender.com/api/products/buy",
        { productId, name, email, contact, address, quantity, totalPrice }, // Include quantity and totalPrice
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        setArtisanDetails(res.data.artisan);
        alert("Product purchased successfully!");
        navigate("/orders");
      }
    } catch (err) {
      console.error("Error in buying product:", err);
      setError("Failed to purchase product. Please try again.");
    }
  };

  return (
    <div className="buy-product-container">
      <h1>Buy Product</h1>
      <form onSubmit={handleBuy}>
        {error && <p className="error">{error}</p>}

        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <label>Contact:</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Enter your contact number"
          required
        />

        <h3>Address Details</h3>

        <label>Flat No:</label>
        <input
          type="text"
          value={flatNo}
          onChange={(e) => setFlatNo(e.target.value)}
          placeholder="Enter your flat number"
          required
        />

        <label>Nearby Location:</label>
        <input
          type="text"
          value={nearbyLocation}
          onChange={(e) => setNearbyLocation(e.target.value)}
          placeholder="Enter nearby location"
          required
        />

        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city"
          required
        />

        <label>Pincode:</label>
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter your pincode"
          required
        />

        <label>State:</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="Enter your state"
          required
        />

        <label>Country:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter your country"
          required
        />

        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Enter quantity"
          min="1"
          required
        />

        <p>Total Price: ₹{price * quantity}</p>

        <button type="button" onClick={fetchCurrentLocation}>
          Use Current Location
        </button>

        <button type="submit">Buy Now</button>
      </form>

      {artisanDetails && (
        <div className="artisan-details">
          <h2>Artisan Details</h2>
          <p>Name: {artisanDetails.name}</p>
          <p>Email: {artisanDetails.email}</p>
          <p>Contact: {artisanDetails.contact}</p>
        </div>
      )}
    </div>
  );
};

export default BuyProduct;
