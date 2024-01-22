



import React, { useState } from "react";
import axios from "axios";
// import './Login.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { ContainerLogin, ErrorMessage, LoadingIndicator } from "../style/style";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import styled from "styled-components";

const EditProfile = ()=> {
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  //user info
  const user = JSON.parse(localStorage.user);
  const [credentials, setCredentials] = useState(user);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      // Compare the original user data with the updated credentials
      const modifiedFields = Object.keys(credentials).reduce((acc, key) => {
        if (credentials[key] !== user[key]) {
          acc[key] = credentials[key];
        }
        return acc;
      }, {});
  
      if (Object.keys(modifiedFields).length === 0) {
        console.log("No changes to update.");
        setLoading(false)
        navigate("/profile");
        return;
      }
  
      // Make the PATCH request only with the modified fields
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/users/${user.id}`,
        modifiedFields
      );
  
      console.log("Modified");
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log(localStorage.getItem("user"));
      setLoading(false)
      navigate("/profile");
    } catch (error) {
      setLoading(false)
      if (error.response) {
        setError(error.response.data.message || "An error occurred.");
      } else if (error.request) {
        setError("No response received from the server.");
      } else {
        setError("An error occurred while processing the request.");
      }
    }
  };
  

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setCredentials((prevData) => ({ ...prevData, [name]: value }));
    console.log(credentials)
  }; 

 

  return (
    <ProfileStyle>
      {credentials &&
        <div className="content">
        <div className="login edit_profile">
            <h2 className="welcome">Edit your profile !</h2>
          <form className="form" >
            <div className="input_form">
              <input onChange={handleChange} defaultValue={credentials.firstName} className="input" required  name="firstName" type="text" id="firstName" />
              <label htmlFor="firstName">First Name : </label>
            </div>
            <div className="input_form">
              <input onChange={handleChange} defaultValue={credentials.lastName} className="input" required  name="lastName" type="text" id="lastName" />
              <label htmlFor="lastName">Last Name : </label>
            </div>
            <div className="input_form">
              <input onChange={handleChange} defaultValue={credentials.phone} className="input" required  name="phone" type="text" id="phone" />
              <label htmlFor="phone">Phone : </label>
            </div>
            <div className="input_form">
              <input onChange={handleChange} defaultValue={credentials.email} className="input" required  name="email" type="email" id="email" />
              <label htmlFor="email">Email</label>
            </div> 

            {error && <ErrorMessage>{error}</ErrorMessage>}

            
            <div className="buttonn">
              
              {loading ? (
                <LoadingIndicator />
              ) : (
                <button className="butt" onClick={handleEdit}>
                Edit your profile
              </button>
              )}
            </div>
          </form>
        </div>
      </div>}
    </ProfileStyle>
  );
}
const ProfileStyle = styled(ContainerLogin)`
    h2{
        margin-bottom : 1.2em;
    }
    form{
        width : 80%;
    }
`;

export default EditProfile;