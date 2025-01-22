import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Products.css'; // add a CSS file for styling
import axios from '../../components/axios'; // Make sure axios is correctly configured for API calls
import { NavLink } from 'react-router-dom';

function ProductForm() {
  const [formData, setFormData] = useState({
    category: "",
    gender: "",
    size: "",
    price: "",
    image: "",
  });

  const [signedUp, setSignedUp] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [responseMessage, setResponseMessage] = useState(""); // State to store response message

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // Submit the form data via POST request
    axios
      .post("/products.php", data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the correct content type for file uploads
        }
      })
      .then((response) => {
        const responseData = response.data;
        setSignedUp(true);
        setResponseMessage(responseData.message); // Display the backend response message
        window.alert(responseData.message); // Show the alert

        // Reset form data after alert is dismissed
        setFormData({
          category: "",
          gender: "",
          size: "",
          price: "",
          image: "",
        });
        setImagePreview(null); // Reset image preview
        setSignedUp(false); // Reset signedUp state if needed
      })
      .catch((error) => {
        console.error("Error submitting the product form:", error.response ? error.response.data : error.message);
        // Optionally, display the error message to the user
      });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file)); // Preview the image
    }
  };

  return (
    <div>
      <Sidebar />
      <nav className="navbar">
        <h2>Product Form App</h2>
      </nav>
      <div className="product-form-container">
        <h1 className="form-title">Product Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Category:
              <select
                name="category"
                value={formData.category}
                onChange={(event) => setFormData((prevFormData) => ({ ...prevFormData, category: event.target.value }))}>
                <option value="">Select a category</option>
                <option value="heels">Heels</option>
                <option value="flats">Flats</option>
                <option value="rubbers">Rubbers</option>
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              Gender:
              <select
                name="gender"
                value={formData.gender}
                onChange={(event) => setFormData((prevFormData) => ({ ...prevFormData, gender: event.target.value }))}>
                <option value="">Select a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              Shoe Size:
              <select
                name="size"
                value={formData.size}
                onChange={(event) => setFormData((prevFormData) => ({ ...prevFormData, size: event.target.value }))}>
                <option value="">Select a shoe size</option>
                {Array.from({ length: 11 }, (_, i) => 35 + i).map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={(event) => setFormData((prevFormData) => ({ ...prevFormData, price: event.target.value }))}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Image:
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img src={imagePreview} alt="Image Preview" style={{ width: 100, height: 100 }} />
              )}
            </label>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
          <button className="submit-btn" style={{ display: 'inline-block', padding: '10px 20px', marginLeft: '80px' }}>
            <NavLink to="/Rproducts" style={{ textDecoration: 'none', color: 'inherit' }}>
              View Uploads
            </NavLink>
          </button>

        </form>
        {signedUp && <p>{responseMessage}</p>}
      </div>
    </div>
  );
}

export default ProductForm;