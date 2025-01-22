import React from "react";
import "./../styles/GetProductsForm.css";

function GetProductsForm({ handleChange, handleSubmit, gender, category, price, resetOnClick }) {
  return (
    <section className="clothes-accessories full-block">
      <div className="container clothes-accessories-content">
        <form className="clothes-accessories-form" onSubmit={handleSubmit}>       
          <div className="clothes-accessories-group">
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              value={category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="heels">Heels</option>
              <option value="rubbers">Rubbers</option>
              <option value="flats">Flats</option>
            </select>
          </div>
          <div className="clothes-accessories-group">
            <label>Gender:</label>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={handleChange}
              />{" "}
              Men
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={handleChange}
              />{" "}
              Women
            </label>
          </div>
          <div className="clothes-accessories-group">
            <label htmlFor="price">Sort by price:</label>
            <input
              type="range"
              id="price"
              name="price"
              min="1500"
              max="15000"
              step="100"
              value={price}
              onChange={handleChange}
            />
            <span id="priceValue">&lt;{price}</span>
          </div>
          <input
            type="reset"
            className="getProductsBtns"
            onClick={resetOnClick}
          />
          <button className="btn btn--form getProductsBtns" type="submit" value="Search">
            Search
          </button>
        </form>
      </div>
    </section>
  );
}

export default GetProductsForm;