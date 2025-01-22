import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./../styles/Footer.css"
import { AppContext } from "./AppContext";
import { SiGmail } from "react-icons/si";
import { FaFacebook } from "react-icons/fa6";

function Footer() {
  const { isUserLogged } = useContext(AppContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const currentyear = new Date().getFullYear();

  let navbarItems;
  // ... (rest of the code remains the same)

  if (!location.pathname.startsWith('/admin')) {
    return (
      <footer className="footer-section full-block">
        <div className="container">
          <div className="footer-section-left-side">
            <ul>
              <li><NavLink to="#"><SiGmail /></NavLink></li>
              <li><NavLink to="#"><FaFacebook /></NavLink></li>
            </ul>
          </div>

          <div className="footer-section-copyright">
            <p>&copy; {currentyear}. All rights reserved.</p>
            <ul>
              <li>Terms and Conditions Apply</li>
            </ul>
          </div>
        </div>
      </footer>
    );
  } else {
    return null; // don't render the footer for admin routes
  }
}

export default Footer;