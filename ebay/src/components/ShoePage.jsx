import React, { useState, useEffect } from "react";
import GetProductsForm from "./GetProductsForm";
import axios from "./axios";
import ProductCard from "./ProductCard";

function Shoepage({ type }) {
  const [formValues, setFormValues] = useState({
    search: "",
    category: "",
    price: 1500,
    gender: "",
  });
  const [products, setProducts] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const resetOnClick = () => {
    setFormValues({
      search: "",
      category: "",
      price: 1500,
      gender: "",
    });
    fetchData({
      search: "",
      category: "",
      price: 1500,
      gender: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetchData(formValues);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async (filters = {}) => {
    try {
      const params = {
        type: type,
        category: filters.category || formValues.category,
        price: filters.price || formValues.price,
        name: filters.search || formValues.search,
        gender: filters.gender || formValues.gender,
      };
      
      console.log("Fetching data with parameters:", params); // Log parameters
  
      const response = await axios.get("/api.php", { params });
      
      console.log("Products fetched:", response.data); // Log fetched products
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setProducts([]);
    }
  };

  const productsToRender = products.map(product => (
    <ProductCard
      key={product.idproduct}
      productId={product.idproduct}
      productType={product.category}
      outofstock={false}
      size={product.size}
      price={product.price}
      gender={product.gender}
      image={product.image}
    />
  ));

  return (
    <div>
      <GetProductsForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        category={formValues.category}
        price={formValues.price}
        search={formValues.search}
        gender={formValues.gender} // Pass gender to the form
        resetOnClick={resetOnClick}
      />
      <section className="products-section products-accessories full-block" id="on-sale">
        <div className="container">
          <h2 className="pageTitle">Discover Store</h2>
          <div className="grid-container a" id="clothes_grid">
            {productsToRender}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shoepage;