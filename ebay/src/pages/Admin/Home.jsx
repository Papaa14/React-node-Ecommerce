import React, { useState, useEffect } from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill }
  from 'react-icons/bs'
import axios from '../../components/axios';



function Home() {
  const [userCount, setUserCount] = useState(null);
  const [Rorder, setRorder] = useState(null);
  const [Rproducts, setRproducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user count data
    axios.get("/user.php") // Replace with your actual API path
      .then((response) => {
        const data = response.data;
        if (data.error) {
          setError(data.error); // Handle error from API
        } else {
          setUserCount(data.userCount); // Set user count from API response
        }
      })
      .catch((error) => {
        setError('Failed to fetch data'); // Handle axios fetch error
      });

    
    // Fetch Rorder data
    axios.get("/Rproducts.php") // Replace with your actual API path
      .then((response) => {
        const data = response.data;
        if (data.error) {
          setError(data.error); // Handle error from API
        } else {
          setRproducts(data.Rproducts); // Set Rorder from API response
        }
      })
      .catch((error) => {
        setError('Failed to fetch data'); // Handle axios fetch error
      });
    

    // Fetch Rorder data
    axios.get("/Rorder.php") // Replace with your actual API path
      .then((response) => {
        const data = response.data;
        if (data.error) {
          setError(data.error); // Handle error from API
        } else {
          setRorder(data.Rorder); // Set Rorder from API response
        }
      })
      .catch((error) => {
        setError('Failed to fetch data'); // Handle axios fetch error
      });
  }, []);
  
  return (
    <main className='main-container'>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>ORDERS</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>Total Orders: {Rorder}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>Total Products: {Rproducts}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>Total Users: {userCount}</h1>
        </div>
      </div>
    </main>
  )
}

export default Home