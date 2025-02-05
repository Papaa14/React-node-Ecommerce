import './styles/App.css';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AppProvider } from './components/AppContext';
import Home from './pages/Home';
import Shoes from './pages/shoes';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import ProductPage from './pages/ProductPage';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin/App';
import Users from './pages/Admin/Users';
import ParentLayout from './pages/Admin/Outlets';
import Orders from './pages/Admin/Orders';
import Products from './pages/Admin/Products';
import Rproducts from './pages/Admin/Rproducts';
import MesssagesPage from './pages/messages';




function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <AppProvider>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/shoes" element={<Shoes />} />      
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/messages" element={<MesssagesPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/Rproducts" element={<Rproducts />} />
        {/* Admin Parent Route with Child Routes */}
        <Route path="/admin" element={<ParentLayout />}>
          <Route index element={<Admin />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
       
          {/* Add other admin child routes here */}
        </Route>

      </Routes>


      {location.pathname !== '/admin' && location.pathname !== '/Rproducts' && <Footer />}
    </AppProvider>
  );
}

export default App
