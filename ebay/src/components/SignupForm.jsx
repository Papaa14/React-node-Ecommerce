import React, { useState, useEffect } from "react";
import "./../styles/SignupForm.css";
import axios from "./axios";
import { Link, useNavigate } from "react-router-dom";
import Notification from "./../components/Notification";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
    address: "",
    terms: false,
  });
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");
  const [signedUp, setSignedUp] = useState(false);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const navigate = useNavigate();

  const closeNotification = () => {
    setShowNotification(false);
    setNotificationText("");
    if (signedUp) {
      navigate("/login");
    }
  };

  function validation() {
    let errors = [];
    if (!formData.terms) {
      errors.push("You have to agree with terms and conditions");
    }

    if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      errors.push("Invalid name. Please enter a name without special characters.");
    }

    if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(formData.username)) {
      errors.push("Invalid username. It must start with a letter and can contain only letters and numbers.");
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email) || formData.email.length > 70) {
      errors.push("Invalid email. Email should be a valid address and cannot exceed 70 characters.");
    }

    if (!/^\d{1,70}$/.test(formData.phone) || formData.phone.length > 70) {
      errors.push("Invalid phone number. Phone number should only contain digits and cannot exceed 70 characters.");
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(formData.password)) {
      errors.push("Invalid password. Password should contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.");
    }

    if (formData.password !== formData.password2) {
      errors.push("Passwords do not match.");
    }

    if (formData.address.length > 128) {
      errors.push("Address exceeds the maximum length of 128 characters.");
    }

    return errors;
  }

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleClickShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validation();

    setErrors(validationErrors);

    if (validationErrors.length > 0) {
      setNotificationText(validationErrors.join(", "));
      setShowNotification(true);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    axios
      .post("http://localhost:9091/register", {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        address: formData.address,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const responseData = response.data;
        setMessage(responseData.message);
        setNotificationText(response.data.message);
        setShowNotification(true);

        if (responseData.message === "Signed up Successfully") {
          setSignedUp(true);
          setTimeout(() => navigate('/login'),3000);
        }
      })
      .catch((error) => {
        console.error("Error submitting the form:", error);
      });
  };

  useEffect(() => {
    if (message !== "") {
      setNotificationText(message);
      setShowNotification(true);
    }
  }, [message]);

  return (
    <section className="signup full-block">
      <div className="container signup-content">
        <h2 className="signup-title">Sign up</h2>
        <form id="signupForm" className="signup-form" onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                type="number"
                placeholder="Phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="password">Password</label>
              <TextField
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                onClick={handleClickShowPassword}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {passwordVisible ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <label htmlFor="password2">Repeat Password</label>
              <TextField
                id="password2"
                type={passwordVisible ? "text" : "password"}
                placeholder="Repeat Password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                onClick={handleClickShowPassword}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {passwordVisible ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="signup_terms">
              <input
                id="terms"
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />
              <label htmlFor="terms">
                Please indicate your consent for our company <br /> to utilize
                this data for internal application purposes.
              </label>
            </div>
          </div>
          <div>
            <p>
              You already have an account? <Link to={"./../login"}>Log in</Link>
            </p>
          </div>
          <button className="btn btn--form" type="submit" value="Signup">
            Sign up
          </button>
        </form>
      </div>
      {showNotification && <Notification show={showNotification} onClose={closeNotification} text={notificationText} />}
    </section>
  );
}

export default SignupForm;
