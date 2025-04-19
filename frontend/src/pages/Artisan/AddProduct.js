import React, { useState } from "react";
import "./../../styles/AddProduct.css"; // Create this CSS file for styling

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("image", product.image);

   

    try {

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to add a product.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": `Bearer ${token}`,
        },  
      });

      const data = await response.json();

      if (response.ok) {
        alert("Product added successfully!");
        setProduct({ name: "", description: "", price: "", image: null });
      } else {
        alert( data.message || "Error adding product!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
