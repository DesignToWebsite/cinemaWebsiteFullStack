import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

const EditMovie = ({ movie, id }) => {
  const [show, setShow] = useState(false);
  const [movieData, setMovieData] = useState(movie);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Perform type conversion
    let convertedValue = type === "number" ? parseInt(value, 10) : value;
    // if (name == "top") {
    //   convertedValue = value == "on" ? true : false;
    // }
    setMovieData((prevData) => ({ ...prevData, [name]: convertedValue }));
  };

  const saveData = async (e) => {
    e.preventDefault();
    try {
      console.log(movieData);
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/movies/${id}`,
        movieData
      );
      console.log("Movie added successfully " + response.data);
      handleClose()
window.location.reload();
      // Navigate("/admin?movieUpdated=true");

    } catch (error) {
      console.error("error in saving data " + error.response.data.errors);
    }
  };
  return (
    <>
      <button onClick={handleShow} className="edit">
        Edit
      </button>

      <ModalStyle size="lg" show={show} onHide={handleClose} centered>
        {/* <Modal.Body> */}
        <StyledForm>
          <div className="input_form">
            <label htmlFor="name">Title</label>
            <input
              defaultValue={movieData.name}
              onChange={handleChange}
              className="input"
              required
              name="name"
              type="text"
              placeholder="Enter the movie title"
            />
          </div>
          <div className="input_form">
            <label htmlFor="image">Image url</label>
            <input
              onChange={handleChange}
              defaultValue={movieData.img}
              className="input"
              required
              name="img"
              type="text"
              placeholder="https://www.image.jpg"
            />
          </div>
          <div className="input_form">
            <label htmlFor="description">Description</label>
            <textarea
              defaultValue={movieData.description}
              placeholder="Description"
              onChange={handleChange}
              rows="5"
              name="description"
              type="text"
            ></textarea>
          </div>
          <div className="input_form">
            <label htmlFor="year">Year of Release</label>
            <input
              defaultValue={movieData.year}
              placeholder="Enter the year the movie was released"
              onChange={handleChange}
              type="number"
              name="year"
              id="year"
            />
          </div>
          <div className="input_form">
            <label htmlFor="video">Video</label>
            <input
              defaultValue={movieData.video}
              onChange={handleChange}
              type="text"
              name="video"
              id="video"
              placeholder="Enter the youtube video id"
            />
          </div>
          <div className="input_form">
            <label htmlFor="actors">Actors</label>
            <input
              defaultValue={movieData.actors}
              placeholder="Format: Actor1, Actor2,..."
              onChange={handleChange}
              type="text"
              name="actors"
              id="actors"
            />
          </div>
          <div className="input_form">
            <label htmlFor="category">Categories</label>
            <input
              defaultValue={movieData.category}
              placeholder="Format: action, horror"
              onChange={handleChange}
              type="text"
              name="category"
              id="category"
            />
            {/* <small>Format: action, horror</small> */}
          </div>
          <div className="input_form">
            <label htmlFor="star">Star</label>
            <input
              defaultValue={movieData.star}
              placeholder="enter the number of star"
              onChange={handleChange}
              type="number"
              name="star"
              id="star"
            />
          </div>
          <div className="input_form">
            <label htmlFor="day">Day</label>
            <input
              defaultValue={movieData.day}
              placeholder="Enter the day of the movie"
              onChange={handleChange}
              type="text"
              name="day"
              id="day"
            />
          </div>
          <div className="input_form">
            <label htmlFor="time">Time</label>
            <input
              defaultValue={movieData.time}
              onChange={handleChange}
              type="text"
              name="time"
              id="time"
              pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
              placeholder="Enter the time : HH:MM"
            />
            {/* <small>Format: HH:MM</small> */}
          </div>
          <div className="input_form">
            <label htmlFor="salle">Salle</label>
            <input
              defaultValue={movieData.salle}
              placeholder="Format: s1"
              onChange={handleChange}
              type="text"
              name="salle"
              id="salle"
            />
          </div>

          <div className="input_form">
            <label htmlFor="price">Price</label>
            <input
              defaultValue={movieData.price}
              placeholder="Enter the price"
              onChange={handleChange}
              type="number"
              name="price"
              id="price"
            />
          </div>
          <div className="input_form">
            <label htmlFor="placesRoom">Room places</label>
            <input
              defaultValue={movieData.placesRoom}
              placeholder="Enter the places that exist in the cinema room"
              onChange={handleChange}
              type="number"
              name="placesRoom"
              id="placesRoom"
            />
          </div>
          <div className="input_form">
            <label htmlFor="age">Age</label>
            <input
              defaultValue={movieData.age}
              placeholder="Enter the minimum age for viewers (e.g., 12+, 16+, 18+,...)"
              onChange={handleChange}
              type="text"
              name="age"
              id="age"
            />
          </div>
          
          <div className="input_form">
            <label htmlFor="top"> Top</label>
            <StyledSelect name="top"
              id="top" value={false}>
              <StyledOption value={false}>False</StyledOption>
              <StyledOption value={true}>True</StyledOption>
            </StyledSelect>
          </div>
          <StyledButton variant="primary" onClick={saveData}>
            Save Changes
          </StyledButton>
        </StyledForm>

        {/* </Modal.Body> */}
      </ModalStyle>
    </>
  );
};

const ModalStyle = styled(Modal)`
  background-color : #00000077;
  border-radius:10px;
  .modal-content {
    background-color : black;

  }
`

const StyledForm = styled.form`
  width: auto;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5em 3em;
  border: 2px solid #a10101;
  border-radius: 10px;
  flex-wrap: wrap;
  .input_form {
    display: grid;
    grid-template-columns: 1fr 4fr;
    @media (max-width: 850px) {
      grid-template-columns: 1fr 2fr;
    }
    label {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    input,
    textarea {
      padding: 10px 20px;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      margin-bottom: 10px;
      margin-left: 30px;
      display: flex;
      background: rgba(255, 255, 255, 0.3);
      &:hover {
        background: black /*rgba(255, 255, 255, 0.5)*/;
        color: white;
        border: 1px solid #a10101;
      }
      @media (max-width: 850px) {
        margin-left: 10px;
        font-size: 15px;
      }
    }
  }
  @media (max-width: 850px) {
    padding: 20px;
  }
`;

const StyledButton = styled(motion.button)`
  padding: 13px 30px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  margin-top: 15px;
  margin-bottom: 20px;
  background: linear-gradient(to right, black, #770202);
  color: white;
  cursor: pointer;
  @media (max-width: 850px) {
    /* width: 25%; */
  }
`;

const StyledOption = styled.option`
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const StyledSelect = styled.select`
  margin-right: 1px;
  margin-left: 30px;
  padding: 10px 2px;
  font-size: 15px;
  border: none;
  /* width: 200px; */
  border-radius: 5px;
  font-family: "Inter", sans-serif;
  transition: background 0.3s ease;
  background: rgba(255, 255, 255, 0.3);
  &:hover {
    background: black;
    color: white;
    border: 1px solid #a10101;
  }
  @media (max-width: 850px) {
    margin-left: 10px;
  }
`;

export default EditMovie;
