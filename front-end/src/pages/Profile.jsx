import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import MovieImage from "../assets/Cinema_Web_Site_Design2.jpg";
import { motion } from "framer-motion";
import { photoAnim, fade, pageAnimation, scrollAnim } from "../animation";
import "../style/profile_resrvation.css";
import { users } from "../data/users";
import { data } from "../data/data";
import { Link } from "react-router-dom";
const Profile = () => {
  //get the data
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  //Get the data from the api
  const connectedUser = 1;
  const baseURL = `http://127.0.0.1:8000/api/users/${connectedUser}?includeReservations=true`;
  // const userInfo = users[0];
  // const reservedMovies = userInfo.reservedMovies;

  // const movies = data.filter(item => reservedMovies.includes(item.id));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL);
        setUser(response.data);
        if (user) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [loading]);

  // const user.data = users[0];
  // loading ? console.log(user) : console.log();
  // const reservedMovies = user.data?.reservedMovies || null;
  // // const movies = movidata.filter((item) => reservedMovies.includes(item.id));
  // const movies = user.data?.reservations.filter(
  //   (item) => userId == connectedUser
  // );
  // // console.log(movies);

  // const reservations = user.data.reservedMovies.map((element, i) => {
  //   const reservedMovie = movies.find((movie) => movie.id === element);

  //   return {
  //     id: i, // You might want to use a unique identifier for each reservation
  //     movie_name: reservedMovie ? reservedMovie.name : "", // Assuming 'name' is the property you want
  //     seats: user.data.places[i],
  //     total_price: user.data.price[i++],
  //   };
  // });

  const [showReservations, setShowReservations] = useState(true);
  const [reservationWidth, setReservationWidth] = useState("100%");

  useEffect(() => {
    // Update the reservation width based on showReservations
    setReservationWidth(showReservations ? "100%" : "100%");
  }, [showReservations]);

  return (
    <div className="profile_page">
      <StyledProfile
        variants={pageAnimation}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {user.data && (
          <>
            <Info
              reservationWidth={reservationWidth}
              hasReservations={user.data?.reservations.length > 0}
            >
              <UserInfo>
                <div>
                  <p>
                    First Name : <span>{user.data.firstName}</span>
                  </p>
                  <p>
                    Last Name : <span>{user.data.lastName}</span>
                  </p>
                </div>
                <div>
                  <p className="email">
                    Email : <span>{user.data.email}</span>
                  </p>
                </div>
              </UserInfo>
              {/* <ReservationsButton
                variants={fade}
                onClick={() => setShowReservations(!showReservations)}
              >
                Reservations
              </ReservationsButton> */}
              {showReservations && user.data?.reservations.length === 0 ? (
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
                        {user.data?.reservations.map((reservation) => (
                          <StyledReservation
                            key={reservation.id}
                            variants={scrollAnim}
                            initial="show"
                            exit="hidden"
                          >
                            <div className="image">
                              
                              <Link to="/profile?deleted=true&&id=1">
                              <div className="delete">X</div>
                              </Link>
                            <MovieImg
                              variants={photoAnim}
                              src={reservation.movies.img}
                              alt=""
                              
                            />
                            </div>
                            <div className="info_card">
                            <p>
                              Movie: <span>{reservation.movies.name}</span>
                            </p>
                            <p>
                              Seats: <span>{reservation.seats}</span>
                            </p>
                            <p>
                              Total Price:{" "}
                              <span>${reservation.price}</span>
                            </p>
                            {reservation.paid ? (
                              <ButtonLink to={`/invoice/${reservation.id}`}>
                                View Invoice
                              </ButtonLink>
                            ) : (
                              <ButtonLink to={`/pay/${reservation.id}`}>
                                Pay Now
                              </ButtonLink>
                            )}
                            </div>
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
    </div>
  );
};

const StyledProfile = styled(motion.div)`
padding-top : 7em;
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
  width: ${(props) =>
    props.hasReservations
      ? props.reservationWidth
      : "80%"}; //Set width based on the prop, with a minimum width if no reservations
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
`;

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
  p span {
    padding: 10px;
    font-family: "Lato", sans-serif;
    @media (max-width: 600px) {
      font-size: 100%;
      padding: 0px;
      padding-left: 3px;
      width: 32%;
      font-weight: bold;
    }
  }
  .email {
    padding: 20px;
  }
`;

const NoReservations = styled(motion.div)`
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
  background: linear-gradient(to right, #4d01017a, #a10101);
  color: white;

  cursor: pointer;
  @media (max-width: 600px) {
    font-size: 10px;
    padding: 10px;
  }
`;

const StyledReservations = styled(motion.div)`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  padding-bottom: 20px;
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
    border-radius: 30px;
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
  flex: 0 0 auto; 
  white-space: normal; 
  color: white;
  /* padding: 10px 30px; */
  width : 250px;
  border: 2px solid #a10101;
  border-radius: 10px;
  position:relative;
  margin-right: 20px; 
  .info_card{
    padding : 20px 10px 20px 10px;
  }
  .image{
    position:relative;
    .delete{

      position : absolute;
      right :10px;
      top : 10px;
      font-weight : 700;
      /* font-size : 20px; */
      background-color : #000000;
      border-radius:50%;
      padding : 2px 5px;
    }
  }
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
    font-family: "Lato", sans-serif;
    @media (max-width: 600px) {
      font-size: 9px;
    }
  }
`;

const MovieImg = styled.img`
  width : 100%;
  height:200px;
  border-top-right-radius :10px;
  border-top-left-radius : 10px;
`;

const ButtonLink = styled(Link)`
  display: block;
  padding: 10px 20px;
  margin-bottom: 10px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  background: linear-gradient(to right, #4d01017a, #a10101);
  color: white;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  @media (max-width: 600px) {
    font-size: 14px;
    padding: 8px 16px;
  }
`;
export default Profile;
