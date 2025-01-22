import { useEffect, useState } from 'react';
import axios from '../../components/axios';
import Sidebar from './Sidebar';
import './Orders.css';
import { MdDelete } from "react-icons/md";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    axios.get("/getOrders.php") // Replace with your actual API path
      .then((response) => {
        const data = response.data;
        if (data.error) {
          setError(data.error); // Handle error from API
        } else {
          setOrders(data.users); // Set users from API response
        }
        setLoading(false); // Set loading to false when data is received
      })
      .catch((error) => {
        setError('Failed to fetch data'); // Handle axios fetch error
        setLoading(false); // Set loading to false when error occurs
      });
  }, []);

  const handleDelete = (orderId) => {
    axios.delete(`/deleteOrder.php?orderId=${orderId}`) // Replace with your actual API path
      .then((response) => {
        const data = response.data;
        if (data.error) {
          setError(data.error); // Handle error from API
        } else {
          setOrders(orders.filter(order => order.orderId !== orderId)); // Remove the deleted order from the state
        }
      })
      .catch((error) => {
        setError('Failed to delete order'); // Handle axios fetch error
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
      <h2>Orders List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>            
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Order Date</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.email}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.address}</td>
              <td>{order.orderDate}</td>
              <td>{order.name}</td>
              <td>
              <MdDelete  onClick={() => handleDelete(order.orderId)} style={{ cursor: 'pointer' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Orders;