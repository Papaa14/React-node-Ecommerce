import { useEffect, useState } from 'react';
import axios from '../../components/axios';
import Sidebar from './Sidebar';
import './Users.css';


function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    axios.get("/getUserData.php") // Replace with your actual API path
      .then((response) => {
        const data = response.data;
        if (data.error) {
          setError(data.error); // Handle error from API
        } else {
          setUsers(data.users); // Set users from API response
        }
        setLoading(false); // Set loading to false when data is received
      })
      .catch((error) => {
        setError('Failed to fetch data'); // Handle axios fetch error
        setLoading(false); // Set loading to false when error occurs
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render a loading message while data is being fetched
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }


  return (
    
    <div  className="main">
      <Sidebar/>
      <h2>Users List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.iduser}>
              <td>{user.iduser}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Users