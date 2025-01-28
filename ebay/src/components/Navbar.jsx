import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import "../styles/base.css";
import "../styles/Navbar.css";
import { AppContext } from "./AppContext";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { TbMessageCircle } from "react-icons/tb";

function Navbar() {
  const { isUserLogged, handleLogout } = useContext(AppContext);
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);

  function logOut() {
    handleLogout();
    navigate("/login");
  }

  const commonLinks = (
    <>
      <li><NavLink className="page" to="/">Home</NavLink></li>
      <li><NavLink className="page" to="/shoes">Products</NavLink></li>
      <li><NavLink className="page" to="/contactUs">Contact Us</NavLink></li>
    </>
  );

  const loggedInLinks = (
    <>
      {user.type === 'admin' ? (
        <>
          <li>
            <span className="navlinkName">Hello {user.username || "Guest"}, Welcome to Admin Dashboard</span>
          </li>
        </>
      ) : (
        <>
          <li><NavLink to="/cart"><img src="./../src/assets/shopping-cart.svg" width="30px" alt="Cart" /></NavLink></li>
          <li><NavLink to="/cart"><TbMessageCircle size={30}/></NavLink></li>
          <li><NavLink to="/checkout">Checkout</NavLink></li>
          <li><span className="navlinkName">Hello {user.username || "Guest"}</span></li>
        </>
      )}
      <li>
        <NavLink to="/" onClick={() => { setIsOpen(false); logOut(); }} className="custom-active-class">
          <FiLogOut /> Log Out
        </NavLink>
      </li>
    </>
  );

  const loggedOutLinks = (
    <>
      <li><NavLink className="page" to="/login">Log In</NavLink></li>
      <li><NavLink className="page" to="/signup">Sign Up</NavLink></li>
    </>
  );

  return (
    <header className="full-block">
      <div className="header-navigation-container" id="scroll-container">
        <div className="container">
          <div className="navigation">
            <div className="navigation-right-side">
              <div className="navbar-icon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FiX /> : <FiMenu />}
              </div>
              <nav className={`navbar-menu ${isOpen ? 'open' : ''}`}>
                <ul>
                  {/* Render common links only if the user is not an admin */}
                  {user.type !== 'admin' && commonLinks}
                  {isUserLogged ? loggedInLinks : loggedOutLinks}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;