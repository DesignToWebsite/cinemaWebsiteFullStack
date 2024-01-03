
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MovieImage from '../assets/Cinema_Web_Site_Design2.jpg';
import { motion } from 'framer-motion'
import { photoAnim, fade, pageAnimation, scrollAnim} from '../animation'
import  "../style/profile_resrvation.css"
import { users } from '../data/users';
import { data } from '../data/data';
// import img from "../../images/Cinema_Web_Site_Design.jpg"
const Profile = () => {
  // Placeholder user information
  // const userInfo = {
  //   first_name: 'John',
  //   last_name: 'Doe',
  //   email: 'john.doe@example.com',
  // };

  const userInfo = users[0];

  // const resevations = userInfo.reservedMovies;
  const reservedMovies = userInfo.reservedMovies;
const movies = data.filter(item => reservedMovies.includes(item.id));

console.log(movies);

const reservations = userInfo.reservedMovies.map((element, i) => {
  const reservedMovie = movies.find(movie => movie.id === element);

  return {
    id: i , // You might want to use a unique identifier for each reservation
    movie_name: reservedMovie ? reservedMovie.name : '', // Assuming 'name' is the property you want
    seats: userInfo.places[i],
    total_price: userInfo.price[i++]
  };
});

  console.log(reservations)
  // const reservations = [
  //   {
  //     id: 1,
  //     movie_name: 'Movie 1',
  //     seats: ['A1', 'A2'],
  //     total_price: 20,
  //   },
  //   {
  //     id: 2,
  //     movie_name: 'Movie 2',
  //     seats: ['B1', 'B2'],
  //     total_price: 25,
  //   },
  //   {
  //     id: 3,
  //     movie_name: 'Movie 3',
  //     seats: ['C1', 'C2'],
  //     total_price: 35,
  //   },
  //   {
  //     id: 4,
  //     movie_name: 'Movie 4',
  //     seats: ['D1', 'D2'],
  //     total_price: 45,
  //   },
  //   {
  //     id: 5,
  //     movie_name: 'Movie 5',
  //     seats: ['E1'],
  //     total_price: 10,
  //   },
  //   {
  //     id: 6,
  //     movie_name: 'Movie 6',
  //     seats: ['B4', 'B6', 'C3', 'C6', 'D10'],
  //     total_price: 75,
  //   },
  //   {
  //     id: 7,
  //     movie_name: 'Movie 7',
  //     seats: ['B10', 'B7', 'C3', 'C8'],
  //     total_price: 85,
  //   },
  // ];

  const [showReservations, setShowReservations] = useState(false);
  const [reservationWidth, setReservationWidth] = useState('100%');

  useEffect(() => {
    // Update the reservation width based on showReservations
    setReservationWidth(showReservations ? '100%' : '100%');
  }, [showReservations]);

  return (
    <div className='profile_page'>
      <StyledProfile variants={pageAnimation} initial="hidden" animate="show" exit="exit">
        {userInfo && (
          <>
          <Info reservationWidth={reservationWidth} hasReservations={reservations.length > 0}>
            <UserInfo>
              <div>
                <p>First Name :   <span>{userInfo.first_name}</span></p>
                <p>Last Name :    <span>{userInfo.last_name}</span></p>
              </div>
              <div>
                <p className='email'>Email : <span>{userInfo.email}</span></p>
              </div>
            </UserInfo>
                <ReservationsButton variants={fade} onClick={() => setShowReservations(!showReservations)}>
                  Reservations
                </ReservationsButton>
              {showReservations && reservations.length === 0 ? (
                <NoReservations variants={fade}>
                  No reservations yet.
                </NoReservations>
              ) : (
                <>
                  {showReservations && (
                    <StyledReservations
                      variants={pageAnimation}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      reservationWidth={reservationWidth}
                    >
                      <ul>
                        {reservations.map((reservation) => (
                          <StyledReservation key={reservation.id}  variants={scrollAnim} initial="show" exit="hidden">
                            <motion.img variants={photoAnim} src={MovieImage} alt="" />
                            <p>Movie: <span>{reservation.movie_name}</span></p>
                            <p>Seats: <span>{reservation.seats.join(', ')}</span></p>
                            <p>Total Price: <span>${reservation.total_price}</span></p>
                          </StyledReservation>
                        ))}
                      </ul>
                    </StyledReservations>
                  )}
                </>
              )}
            </Info>
          </>
        )}
      </StyledProfile>
    </div >
  );
};


const StyledProfile = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;

`;


const Info = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
/* width:80% !important; */
  width: ${(props) => (props.hasReservations ? props.reservationWidth : '80%')}; //Set width based on the prop, with a minimum width if no reservations
  background-color: rgba(0, 0, 0, 0.7); 
  color: white;
  padding: 60px;
  border: 2px solid #a10101;
  border-radius: 10px;
  flex-wrap: wrap;
  margin-top: 2rem;
  margin-bottom: 2rem;
  @media (max-width: 600px) {
    padding: 20px;
    margin: 40px;
  }
`


const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  p:nth-child(2) {
    margin-top: 5px;
  }
  p span{
    padding: 10px;
    font-family: 'Lato', sans-serif;
    @media (max-width: 600px) {
    font-size: 100%;
    padding: 0px;
    padding-left: 3px;
    width: 32%;
    font-weight: bold;
    }
  }
  .email{
    padding: 20px;
  }
`;


const NoReservations =styled(motion.div)`
  color: white;
  padding: 10px 30px;
  font-size: 30px;
  font-weight: bold;
  margin-top: 30px;
`;


const ReservationsButton = styled(motion.button)`
  padding: 13px 30px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  margin-top: 15px;
  margin-bottom: 10px;
  background: linear-gradient(to right, black, red);
  color: white;
  
  cursor: pointer;
  @media (max-width: 600px) {
    font-size: 10px;
    padding: 10px;
  }
`;


const StyledReservations = styled(motion.div)`
  margin-top: 10px;
  display : flex;
  flex-wrap:wrap;
  width: 80%; 
  padding-bottom:20px;
  white-space: normal; 
  overflow-x: auto;
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #a10101 lightgray; /* Firefox */

  /* WebKit styles */
  &::-webkit-scrollbar {
    width: 12px;
    /* border-radius:30px; */
  }

  &::-webkit-scrollbar-track {
    background-color: lightgray;
    border-radius:30px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #a10101;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #a10101c0;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0; /* Reset margin to ensure no unexpected spacing */
    display: flex;
  }
`;


const StyledReservation = styled(motion.li)`
   /* Ensure each movie card is flexible within the container width */
  flex: 0 0 auto; /* This allows the element to shrink or grow as needed */
  white-space: normal; /* Reset white-space property for the movie details */
  color: white;
  padding: 10px 30px;
  border: 2px solid #a10101;
  border-radius: 10px;
  margin-right: 20px; /* Adjust as needed for spacing between movie cards */
  @media (max-width: 600px) {
      padding: 0%;
      margin: 3px;
    }
  p {
    margin: 5px 0;
    padding: 5px 0;
    @media (max-width: 600px) {
      margin: 0;
      font-size: 10px;
    }
  }

  p span {
    padding: 10px;
    font-family: 'Lato', sans-serif;
    @media (max-width: 600px) {
      font-size: 9px;
    }
  }
`;

export default Profile;
