import React, { useState } from "react";
// import './Login.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import styled from "styled-components";

import { ContainerLogin } from "../style/style";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name)
    // console.log(value)
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users",
        formData
      );
      console.log("User signed up secceddfully", response.data);
      navigate(location.state?.from || '/')
    } catch (error) {
      console.log("Error signing up: ", error.response.data);
    }
  };
  const handleFormSubmit = (e) =>{
    if(password != formData.password){
        alert("Passwords do not match");
        return;
    }
    
    handleSubmit(e);
  }

  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const togglePasswordShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ContainerLogin>
      <div className="content">
        <div className="login">
          <div className="logo">
            <p>
              <span>Cine</span>Booking{" "}
            </p>
            <h3 className="welcome">Welcome !</h3>
          </div>

          <form className="form" onSubmit={handleFormSubmit}>
            <div className="input_form">
              <input className="input" onChange={handleChange}  required type="text" name="firstName" id="firstName" />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="input_form">
              <input className="input" onChange={handleChange}  required type="text" name="lastName" id="lastName" />
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="input_form">
              <input className="input" onChange={handleChange} required type="email" name="email" id="email" />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input_form">
              <input className="input" onChange={handleChange}  required type="text" name="phone" id="phone" />
              <label htmlFor="phone">Phone</label>
            </div>
            <div className="input_form">
              <input
                className="input"
                required
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={handleChange} 
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
            <div className="input_form">
              <input
                className="input"
                required
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                onChange={handlePasswordChange}
              />
              <label htmlFor="confirmPassword">Confirm password</label>
              <button className="eye" onClick={togglePasswordShow}>
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  // Icône d'œil pour afficher le mot de passe
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
            </div>
            <div className="buttonn">
              <button type="submit" className="butt">
                Sign up
              </button>
              <div className="account">
                You have an account ? <a href="/fiche">login here </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ContainerLogin>
  );
}


export default SignUp;
