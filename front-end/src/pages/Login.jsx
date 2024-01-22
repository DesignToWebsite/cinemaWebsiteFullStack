import React, { useState } from "react";
import axios from "axios";
// import './Login.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { ContainerLogin, ErrorMessage, LoadingIndicator } from "../style/style";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import styled from "styled-components";

const Login = ({reservation, reservationId})=> {
  
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  //user info
  const [credentials, setCredentials] = useState({email:"",password:""});
  const [loading, setLoading] = useState(false); 
  //Login : usint laravel apo
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post(
        `http://127.0.0.1:8000/api/login`,
        credentials
      );
      
      reservation
        ? navigate(`/reservation/${reservationId}`)
        : navigate("/");
      
        setLoading(true)
  
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("id", response.data.data.id);
      localStorage.setItem("user", JSON.stringify(response.data.data));
    } catch (error) {
      setLoading(false)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.message || "An error occurred.");
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("An error occurred while processing the request.");
      }
    }
  };
  

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setCredentials((prevData) => ({ ...prevData, [name]: value }));
  }; 

  const [showPassword, setShowPassword] = React.useState(false);
 
  const togglePasswordShow = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <ContainerLogin>
      <div className="content">
        <div className="login">
          <div className="logo">
            <p>
              <span>Cine</span>Booking
            </p>
            <h3 className="welcome">Welcome back !</h3>
          </div>

          <form className="form" novalidate>
            <div className="input_form">
              <input onChange={handleChange} className="input" required  name="email" type="email" id="email" />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input_form">
              <input
                name="password"
                className="input"
                required
                onChange={handleChange} 
                type={showPassword ? "text" : "password"}
                id="password"
              />
              <label htmlFor="password">Password</label>
              <button className="eye" onClick={togglePasswordShow}>
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  // Icône d'œil pour afficher le mot de passe
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="buttonn">
            {loading ? (
                // Render loading indicator while loading
                <LoadingIndicator />
              ) : (
                // Render login button when not loading
                <button className="butt" onClick={handleLogin}>
                  Login
                </button>
              )}
              <div className="account">
                Don't have an account ? <a href="/fiche">Register here </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ContainerLogin>
  );
}


export default Login;
