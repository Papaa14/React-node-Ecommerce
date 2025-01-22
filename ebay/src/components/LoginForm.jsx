import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import axios from "./axios";
import { AppContext } from "./AppContext";
import Notification from "./../components/Notification";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function LoginForm() {
  const [formData, setFormData] = useState({
    login_username_email: "",
    login_password: "",
  });

  const { isUserLogged, setIsUserLogged, handleLoginToken } = useContext(AppContext);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const navigate = useNavigate();

const [passwordVisible, setPasswordVisible] = useState(false);

const handleClickShowPassword = () => {
  setPasswordVisible(!passwordVisible);
};

  // Navigate to Home after user is logged in
  useEffect(() => {
    if (isUserLogged) {
      console.log("User is logged in, navigating to home");
      navigate("/", { replace: true }, () => {
        if (window.location.pathname !== "/") {
          console.error("Navigation to home failed");
        }
      });
    }
  }, [isUserLogged, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    axios
      .post("/login2.php", data)
      .then((response) => {
        console.log("Raw response data:", response.data);
        try {
          const jsonResponse = response.data;
          const loggedIn = jsonResponse.loggedin;
          setIsUserLogged(loggedIn);
          setNotificationText(jsonResponse.message);
          setShowNotification(true);

          if (loggedIn) {
            handleLoginToken(jsonResponse.token);
            localStorage.setItem("user", JSON.stringify(jsonResponse.user));

            // Check user type and redirect to different pages
            const userType = jsonResponse.user.type;
            if (userType === "admin") {
              navigate("/admin", { replace: true });
            } else {
              navigate("/", { replace: true });
            }
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
          setNotificationText("An error occurred while processing your request.");
          setShowNotification(true);
        }
      })
      .catch((error) => {
        console.error("Error submitting the form:", error);
        setNotificationText("Login failed. Please try again.");
        setShowNotification(true);
      });
  };

  return (
    <section className="login full-block">
      <div className="container login-content">
        <h2 className="login-title">Log in</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login_username_email">Username or email</label>
            <input
              id="login_username_email"
              onChange={handleChange}
              value={formData.login_username_email}
              type="text"
              placeholder="Username or Email"
              name="login_username_email"
              required
            />
          </div>
          <div>
            <label htmlFor="login_password">Password</label>
            <TextField
              id="login_password"
              onChange={handleChange}
              value={formData.login_password}
              type={passwordVisible ? "text" : "password"}
              onClick={handleClickShowPassword} 
              placeholder="password"
              name="login_password"
              required
              InputProps={{
                endAdornment:(
                  <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                     >
                      {passwordVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}  
            />
          </div>
          <div>
            <p>
              You don't have an account? <Link to={"./../signup"}>Sign Up here</Link>
            </p>
          </div>
          <button className="btn btn--form" type="submit" value="Log in">
            Log in
          </button>
        </form>
      </div>
      {showNotification && (
        <Notification show={showNotification} onClose={closeNotification} text={notificationText} />
      )}
    </section>
  );
}

const closeNotification = () => {
  setShowNotification(false);
  setNotificationText("");
  navigate( "/", { replace: true });
};

export default LoginForm;