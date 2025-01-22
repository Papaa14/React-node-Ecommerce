import { useEffect, useState } from 'react';
import axios from '../../components/axios';
import Sidebar from './Sidebar';
import './Rproducts.css';
import { MdDelete } from "react-icons/md";

function Rproducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    axios.get("/getProducts.php") // Replace with your actual API path
      .then((response) => {
        const data = response.data;
        if (data.error) {
          setError(data.error); // Handle error from API
        } else {
          setProducts(data.products); // Set Products from API response
        }
        setLoading(false); // Set loading to false when data is received
      })
      .catch((error) => {
        setError('Failed to fetch data'); // Handle axios fetch error
        setLoading(false); // Set loading to false when error occurs
      });
  }, []);

  const handleDelete = (idproduct) => {
    axios.delete(`/deleteProducts.php?idproduct=${idproduct}`) // Replace with your actual API path
      .then((response) => {
        const data = response.data;
        if (data.error) {
          setError(data.error); // Handle error from API
        } else {
          setProducts(products.filter(products => products.idproduct !== idproduct)); // Remove the deleted order from the state
        }
      })
      .catch((error) => {
        setError('Failed to delete Product'); // Handle axios fetch error
      });
  };

  if (loading) {
    return <div>Loading...</div>; // Render a loading message while data is being fetched
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div  className="main">
      <Sidebar/>
      <h2>Products List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>            
            <th>Category</th>
            <th>Price</th>
            <th>Size</th>
            <th>Gender</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((products) => (
            <tr key={products.idproduct}>
              <td>{products.idproduct}</td>
              <td>{products.category}</td>
              <td>{products.price}</td>
              <td>{products.size}</td>
              <td>{products.gender}</td>
              <td>{products.image}</td>
              <td>
              <MdDelete  onClick={() => handleDelete(products.idproduct)} style={{ cursor: 'pointer' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Rproducts;