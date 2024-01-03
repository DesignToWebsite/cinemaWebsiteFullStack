import React, { useState,useRef } from 'react';
import styled from 'styled-components';
import {fade, pageAnimation} from '../animation'
import { motion } from 'framer-motion';
import  "../style/profile_resrvation.css"
import { Link, useLocation, useParams } from 'react-router-dom';
import { data } from '../data/data';

const Reservation = () => {
  const location = useLocation();
  const url = location.pathname;

  const { id } = useParams();
  console.log(id)
  const movie = data.filter(item=>item.id == id)[0];

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [numReservations, setNumReservations] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedFood, setSelectedFood] = useState(Array(numReservations).fill(''));

  
    const handleFoodChangeForSeat = (seatIndex, foodValue) => {
      const newSelectedFood = [...selectedFood];
      newSelectedFood[seatIndex - 1] = foodValue;
      setSelectedFood(newSelectedFood);
    };


    const handleNumReservationsChange = (event) => {
      const value = parseInt(event.target.value);
      if (value >= 1 && value <= 5) {
      setNumReservations(value);
      }
    };


    const formRef = useRef();

    const getFoodPrice = (selectedFood) => {
      switch (selectedFood) {
        case 'popcorn':
          return 5;
        case 'snacks':
          return 10;
        case 'candies':
          return 5;
        case 'sodas':
          return 3;
        case 'juices':
          return 4;
        default:
          return 0;
      }
    };
    
    
    const handleSubmit = (event) => {
      event.preventDefault();
    

      if (selectedSeats.length === numReservations) {
        const seatPrice = numReservations * 10;
        const foodPrices = selectedFood.map((food) => getFoodPrice(food)).filter((price) => price !== undefined);
        

        if (foodPrices.length === numReservations) {
          const totalPrice = seatPrice + foodPrices.reduce((acc, curr) => acc + curr, 0);
    
          console.log("Form submitted with selected seats and food:", selectedSeats, selectedFood);
          console.log("Total Price: $", totalPrice);
    
          formRef.current && formRef.current.submit();
        } else {
          alert("Please select a food option for each seat.");
        }
      } else {
        alert(`Please select exactly ${numReservations} seats.`);
      }
    };
  
  
    const Seat = ({ isOccupied, isSelected, onClick }) => {
        const className = `seat ${isOccupied ? 'occupied' : ''} ${isSelected ? 'selected' : ''}`;
        return <StyledSeat className={className} onClick={onClick}></StyledSeat>;
    };

  
    const handleSeatClick = (seatIndex) => {
      // Check if the selected seat is already in the array
      if (selectedSeats.includes(seatIndex)) {
          // Deselect the seat
          setSelectedSeats(selectedSeats.filter((index) => index !== seatIndex));
      } else {
          // Check if the number of selected seats is less than the allowed number
          if (selectedSeats.length < numReservations) {
              // Select the seat
              setSelectedSeats([...selectedSeats, seatIndex]);
          }
      }
  };

const seats = movie.placesSalle;
const rows = 5; // Number of rows
const seatsPerRow = seats / rows; // Number of seats per row
// Assuming you have an array of occupied seats like this
const occupiedSeats = movie.tableResere; // Replace this with your actual occupied seats data
const screen = {
  background: `linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${movie.img}") center/cover no-repeat fixed`,
  height: '15rem',
  width: '90%',
  marginTop: '15px',
  marginBottom: '15px',
  marginLeft: '50px',
  marginRight: '50rem',
  transform: 'rotateX(-45deg)',
  boxShadow: '0 3px 10px rgba(255, 255, 255, 0.75)',
};
const generateSeats = () => {
  const seatComponents = [];
  for (let row = 1; row <= rows; row++) {
    const rowSeats = [];
    for (let seatIndex = 1; seatIndex <= seatsPerRow; seatIndex++) {
      const seatNumber = (row - 1) * seatsPerRow + seatIndex;
      rowSeats.push(
        <Seat
          key={seatNumber}
          onClick={() => handleSeatClick(seatNumber)}
          isSelected={selectedSeats.includes(seatNumber)}
          isOccupied={occupiedSeats.includes(seatNumber)}
        />
      );
    }
    seatComponents.push(
      <div key={row} className="row">
        {rowSeats}
      </div>
    );
  }
  return seatComponents;
};

    return (
      <div className="profile_page">
      <StyledReservation variants={pageAnimation} initial="hidden" animate="show" exit="exit">
        <H1 variants={fade}>Reservation for 
        <span> {movie.name}</span>
        </H1>
        <StyledForm ref={formRef} onSubmit={handleSubmit}>
          <Label>
            First Name :
            <StyledInput type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
          </Label>
          <Label>
            Last Name :
            <StyledInput type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
          </Label>
          <Label>
            Seats Num :
            <StyledInput
            type="number"
            value={numReservations}
            onChange={handleNumReservationsChange}
            min="1"
            max="5"
            />
            </Label>
          {Array.from({ length: numReservations }, (_, index) => (
            <Label key={index}>
              Food Seat{index + 1}:
              <StyledSelect
                value={selectedFood[index]}
                onChange={(event) => handleFoodChangeForSeat(index + 1, event.target.value)}
              >
                <StyledOption value="">Select an Option</StyledOption>
                <StyledOption value="popcorn">Popcorn $5</StyledOption>
                <StyledOption value="snacks">Sweet and Savory Snacks $10</StyledOption>
                <StyledOption value="candies">Candies $5</StyledOption>
                <StyledOption value="sodas">Sodas $3</StyledOption>
                <StyledOption value="juices">Fruit Juices $4</StyledOption>
              </StyledSelect>
            </Label>
          ))}
        </StyledForm>

        <StyledSeatsContainer>
          <div className="container">
            <motion.div  style={screen} variants={fade}></motion.div>
            <div className="seats-container">
              {generateSeats()}
            </div>
            <ul className="showcase">
              <li>
                <Seat />
                <small>Available</small>
                </li>
                <li>
                <Seat isSelected />
                <small>Selected</small>
                </li>
                <li>
                <Seat isOccupied />
                <small>Taken</small>
              </li>
            </ul>
          </div>
        </StyledSeatsContainer>
            
        <StyledPrice className="text">
          {selectedSeats.length > 0 ? (
            <>
              You have selected <span id="count">{selectedSeats.length}</span> seat
              {selectedSeats.length > 1 ? 's' : ''} (
              {selectedSeats.map((seat, index) => (
                <span key={index}>
                  {seat}
                  {index < selectedSeats.length - 1 ? ', ' : ''}
                </span>
              ))}
              ) for a price of ${' '}
              <span id="total">
                {numReservations * 10 +
                  selectedFood.reduce((acc, food) => acc + getFoodPrice(food), 0)}
              </span>
            </>
          ) : (
            'You have not selected any seats.'
          )}
        </StyledPrice>
        <Link to="/profile">
          <StyledButton variants={fade} type="submit" onClick={handleSubmit}>
            Submit
          </StyledButton>
        </Link>
      </StyledReservation>
      </div>
    );
};


const StyledReservation = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
 
`;


const H1 = styled(motion.h1)`
  font-weight: lighter;
  font-size: 3rem;
  width: 70%;
  text-align: center;
  font-family: 'Inter', sans-serif;
  margin-bottom: 20px;
  margin-top: 3rem;
  span{
    display:block;
    font-weight:bold;
    margin-top : 10px;
    margin-bottom:10px;
  }
  @media (max-width: 850px) {
    font-size: 30px;
    margin-bottom: 20px;
  }
`;


const StyledForm = styled.form`
width:auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7); 
  color: white;
  padding: 5em 3em;
  border: 2px solid #a10101;
  border-radius: 10px;
  flex-wrap: wrap;
  @media (max-width: 850px) {
    padding: 20px;
  }
`;



const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

 
const StyledInput = styled.input`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-left: 30px; 
  display:flex;
  width:200px;
  background: rgba(255, 255, 255, 0.3);
  &:hover {
    background: black/*rgba(255, 255, 255, 0.5)*/; 
    color: white;
    border: 1px solid #a10101;
  }
  @media (max-width: 850px) {
    margin-left: 10px;
    font-size: 15px;
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
  width:200px;
  border-radius: 5px;
  font-family: 'Inter', sans-serif;
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


const StyledSeatsContainer = styled.div`
  perspective: 1000px;
  margin-bottom:20px;
`;


const StyledSeat = styled.div`
  background-color: #444454;
  height: 15px;
  width: 20px;
  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: 15px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  @media (max-width: 850px) {
    height: 10px;
    width: 15px;
    margin-left: 2px;
    margin-right: 2px;
    margin-bottom: 10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  &.selected {
    background-color: #770202;
  }
  &.occupied {
    background-color: #fff;
  }
  &:nth-of-type(3) {
    margin-right: 8rem;
    @media (max-width: 850px) {
      margin-right: 4rem;
    }
  }
  &:nth-last-of-type(3) {
    margin-left: 8rem;
    @media (max-width: 850px) {
      margin-left: 4rem;
    }
  }
  &:not(.occupied):hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;


const StyledPrice = styled.p`
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  @media (max-width: 850px) {
     font-size: 12px;
   }
`;


export default Reservation;

