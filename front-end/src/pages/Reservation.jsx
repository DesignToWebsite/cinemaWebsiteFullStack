import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { fade, pageAnimation } from "../animation";
import { motion } from "framer-motion";
import "../style/profile_resrvation.css";
import { Link, useLocation, useParams, useNavigate, redirect } from "react-router-dom";
import Login from "./Login";
import { LoadingIndicator } from "../style/style";
// import { data } from '../data/data';

const ReservationLogged = () => {
  const location = useLocation();
  const history = useNavigate();
  const url = location.pathname;
  const userId = localStorage.getItem("id");
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  // console.log(id)
  // console.log(user)
  console.log(user)
  const [error, setError] = useState(null)

  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [numReservations, setNumReservations] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedFood, setSelectedFood] = useState(
    Array(numReservations).fill("")
  );
  const [priceReservation, setPriceReservation] = useState(null);
  
// console.log(movie)

  //Get the data from the api
const [stopUse, setStopUse] = useState(true);
  useEffect(() => {
    const baseURL = `http://127.0.0.1:8000/api/movies/${id}?includeReservations=true`;
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(baseURL);
        setMovie(response.data);
        console.log(response)
        setPriceReservation(response?.data?.data?.price)
        // if (movie) {
          setLoading(false);
          setStopUse(false)
          
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  },[]);
// console.log(m)
console.log(priceReservation)
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
      case "popcorn":
        return 30;
      case "snacks":
        return 50;
      case "candies":
        return 30;
      case "sodas":
        return 20;
      case "juices":
        return 25;
      default:
        return 0;
    }
  };



  const Seat = ({ isOccupied, isSelected, onClick }) => {
    const className = `seat ${isOccupied ? "occupied" : ""} ${
      isSelected ? "selected" : ""
    }`;
    return <StyledSeat className={className} onClick={onClick}></StyledSeat>;
  };

  const handleSeatClick = (seatIndex) => {
    // Check if the selected seat is already in the array
    if (selectedSeats.includes(seatIndex)) {
      // Deselect the seat
      setSelectedSeats(selectedSeats.filter((index) => index !== seatIndex));
    } else {
      // Check if the number of selected seats is less than the allowed number
      if (
        selectedSeats.length < numReservations &&
        !occupiedSeats.includes(seatIndex)
      ) {
        // Select the seat
        setSelectedSeats([...selectedSeats, seatIndex]);
      }
    }
  };

  const seats = movie.data?.placesSalle || 60;
  const rows = 5; // Number of rows
  const seatsPerRow = seats / rows; // Number of seats per row

  // const occupiedSeats = movie.data.reservations; // Replace this with your actual occupied seats data

  const getReservedSeats = () => {
    const reservations = movie.data?.reservations || [];
    let seatsReserved = [];

    reservations.forEach((reservation) => {
      const seats = reservation.seats
        .split(",")
        .map((seat) => parseInt(seat.trim()));
      seatsReserved = seatsReserved.concat(seats);
    });

    // Remove duplicates, sort, and return the result
    return Array.from(new Set(seatsReserved)).sort((a, b) => a - b);
  };

  const occupiedSeats = getReservedSeats();

  const screen = {
    background: `linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${movie.data?.img}") center/cover no-repeat fixed`,
    height: "15rem",
    width: "90%",
    marginTop: "15px",
    marginBottom: "15px",
    marginLeft: "50px",
    marginRight: "50rem",
    transform: "rotateX(-45deg)",
    boxShadow: "0 3px 10px rgba(255, 255, 255, 0.75)",
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

  const [paymentLink,setPaymentLink] = useState(null);

  //store the data
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedSeats.length === numReservations) {
      const seatPrice = numReservations * priceReservation;
      // console.log(priceReservation)
      const foodPrices = selectedFood
        .map((food) => getFoodPrice(food))
        .filter((price) => price !== undefined);

      // if (foodPrices.length === numReservations) {
        const totalPrice =
          seatPrice + foodPrices.reduce((acc, curr) => acc + curr, 0);
        setPriceReservation(totalPrice)
        // formRef.current && formRef.current.submit();
        const reservation = {
          "userId": userId,
          "movieId": parseInt(id), // parseInt("10", 10);
          "placesReserved": numReservations,
          "seats": selectedSeats.join(','),
          "price": priceReservation,
          "paid": 0,
          "food":selectedFood.join(','),
        };
        // console.log(reservation)
        try{
          setLoading(true)
          const response = await axios.post(
            "http://127.0.0.1:8000/api/reservations",
            reservation
          );
          setPaymentLink(response.data)
          console.log("reservation success")
          // setLoading(false)
          
        }catch(error){
          setLoading(false);
          // setError( error.response.data)
          console.log("error in reservation : ", error.response.data);
        }

    } 
    else {
      alert(`Please select exactly ${numReservations} seats.`);
    }
  };
  if(paymentLink?.data.stripeLink){
    window.location.href = paymentLink.data?.stripeLink
  }


  return (
    <>
      {!stopUse && (
        <div className="profile_page">
          <StyledReservation
            variants={pageAnimation}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <H1 variants={fade}>
              Reservation for
              <span> {movie.data.name}</span>
            </H1>
            <StyledForm ref={formRef} onSubmit={handleSubmit}>
              <Label>
                First Name :
                <StyledInput
                  type="text"
                  value={firstName}
                  readOnly
                />
              </Label>
              <Label>
                Last Name :
                <StyledInput
                  type="text"
                  value={lastName}
                  readOnly
                />
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
                    onChange={(event) =>
                      handleFoodChangeForSeat(index + 1, event.target.value)
                    }
                  >
                    <StyledOption value="">Select an Option</StyledOption>
                    <StyledOption value="popcorn">Popcorn 30 DH</StyledOption>
                    <StyledOption value="snacks">
                      Sweet and Savory Snacks 50 DH
                    </StyledOption>
                    <StyledOption value="candies">Candies 30 DH</StyledOption>
                    <StyledOption value="sodas">Sodas 20 DH</StyledOption>
                    <StyledOption value="juices">Fruit Juices 25 DH</StyledOption>
                  </StyledSelect>
                </Label>
              ))}
            </StyledForm>

            <StyledSeatsContainer>
              <div className="container">
                <motion.div style={screen} variants={fade}></motion.div>
                <div className="seats-container">{generateSeats()}</div>
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
                  You have selected{" "}
                  <span id="count">{selectedSeats.length}</span> seat
                  {selectedSeats.length > 1 ? "s" : ""} (
                  {selectedSeats.map((seat, index) => (
                    <span key={index}>
                      {seat}
                      {index < selectedSeats.length - 1 ? ", " : ""}
                    </span>
                  ))}
                  ) for a price of {" "} DH
                  <span id="total">
                    {numReservations * priceReservation +
                      selectedFood.reduce(
                        (acc, food) => acc + getFoodPrice(food),
                        0
                      )}
                  </span>
                </>
              ) : (
                "You have not selected any seats."
              )}
            </StyledPrice>
            {/* <Link to="/profile"> */}
              
              <div className="buttonn">
              {loading ? (
                // Render loading indicator while loading
                <LoadingIndicator/>
              ) : (
                // Render login button when not loading
                <StyledButton
                variants={fade}
                // type="submit"
                onClick={handleSubmit}
              >
                Submit
              </StyledButton>
              )}
            </div>
            {/* </Link> */}
          </StyledReservation>
        </div>
      )}
    </>
  );
};

const Reservation = ()=>{
  const { id } = useParams();

  return(
    <>
    {
      localStorage.getItem("isLoggedIn") && <ReservationLogged />
    }
    {
      !localStorage.getItem("isLoggedIn") && <Login reservation={true} reservationId={id}/>
    }
    </>
  )
}

const StyledReservation = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding-top:6em;
  .buttonn{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const H1 = styled(motion.h1)`
  font-weight: lighter;
  font-size: 3rem;
  width: 70%;
  text-align: center;
  font-family: "Inter", sans-serif;
  margin-bottom: 20px;
  margin-top: 3rem;
  span {
    display: block;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  @media (max-width: 850px) {
    font-size: 30px;
    margin-bottom: 20px;
  }
`;

const StyledForm = styled.form`
  width: auto;
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
  display: flex;
  width: 200px;
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
`;

const StyledButton = styled(motion.button)`
  padding: 13px 30px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  margin-top: 15px;
  margin-bottom: 2em;
  margin-top : 2em;
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
  width: 200px;
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

const StyledSeatsContainer = styled.div`
  perspective: 1000px;
  margin-bottom: 20px;
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
    cursor: not-allowed;
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
  font-family: "Inter", sans-serif;
  @media (max-width: 850px) {
    font-size: 12px;
  }
`;

export default Reservation;
