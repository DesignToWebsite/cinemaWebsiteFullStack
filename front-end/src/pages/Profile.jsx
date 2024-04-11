import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import MovieImage from "../assets/Cinema_Web_Site_Design2.jpg";
import { motion } from "framer-motion";
import { photoAnim, fade, pageAnimation, scrollAnim } from "../animation";
import "../style/profile_resrvation.css";
import { Link, useParams } from "react-router-dom";
import closeBtn from "../assets/x-button.png";
import editBtn from "../assets/editing.png";
const Profile = () => {
  //get the data
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("id");
  // const hasReservations = useState(null)
  const { id } = useParams();
  console.log(id);
  const baseURL = `http://127.0.0.1:8000/api/users/${userId}?includeReservations=true`;
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL);
        setUser(response.data);
        if (user) {
          setLoading(false);
          if (id) {
            const updateData = {
              paid: true,
            };
            const id_res_paid = user.data.reservations.filter(
              (item) => item.stripeId == id
            )[0].id;
            const url = `http://127.0.0.1:8000/api/reservations/${id_res_paid}`;
            console.log(url);
            const updateReservation = await axios.patch(url, updateData);
            if (updateReservation) {
              setUpdated(true);
            }
            console.log(
              "Reservation updated successfully:",
              updateReservation.data
            );
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [loading]);

  const updatePaidStatus = (reservationId) => {
    setUser((prevUser) => {
      console.log(prevUser);
      const updateReservations = prevUser?.data?.reservations.map(
        (reservation) => {
          if (reservation.stripeId === reservationId) {
            // Update the 'paid' property to true (1)
            return { ...reservation, paid: 1 };
          }
          return reservation;
        }
      );

      return {
        ...prevUser,
        data: {
          ...prevUser.data,
          reservations: updateReservations,
        },
      };
    });
  };

  useEffect(() => {
    if (updated && id) {
      console.log(user.data);
      updatePaidStatus(id);
      console.log(user.data);
    }
  }, [updated]);

  const [showReservations, setShowReservations] = useState(true);

  const updateDeleteStatus = (reservationId) =>{
    setUser((prevUser) =>{
      const updateReservation = prevUser?.data?.reservations.filter((reservation) =>{
        return reservation.id !== reservationId
      });
      return {
        ...prevUser,
        data:{
          ...prevUser.data,
          reservations : updateReservation,
        },
      }
    })
  }

  const deleteMovie = async (id) => {
    console.log(id);

    // Show confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this reservation?"
    );
    if (confirmDelete) {
      try {
        // Make the DELETE request
        const detelte = await axios.delete(`http://127.0.0.1:8000/api/reservations/${id}`);
        // Handle success, e.g., update the UI or perform any additional actions
        if(detelte){
          updateDeleteStatus(id)
        }
        console.log("Reservation deleted successfully");
      } catch (error) {
        // Handle the error, e.g., show an error message to the user
        console.error("Error deleting reservation:", error.response.data);
      }
    }
  };

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
            // hasReservations={user.data?.reservations.length > 0}
            >
              <Link to="/editProfile">
                <button className="changeInfo">
                  <img src={editBtn} alt="" />
                </button>
              </Link>
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
                      // reservationWidth={reservationWidth}
                    >
                      {
                        <ul>
                          {user.data?.reservations.map((reservation) => (
                            <StyledReservation
                              key={reservation.id}
                              variants={scrollAnim}
                              initial="show"
                              exit="hidden"
                            >
                              <div className="image">
                                <button
                                  className="delete" data-test='deleteReservation'
                                  onClick={() => deleteMovie(reservation.id)}
                                >
                                  {/* <div > */}
                                  <img src={closeBtn} alt="" />
                                  {/* </div> */}
                                </button>
                                <MovieImg
                                  variants={photoAnim}
                                  src={reservation.movies.img}
                                  alt=""
                                />
                              </div>
                              <div className="info_card">
                                <p>
                                  Movie:{" "}
                                  <span>
                                    {reservation.movies.name.slice(0, 15)}...
                                  </span>
                                </p>
                                <p>
                                  Seats: <span>{reservation.seats}</span>
                                </p>
                                <p>
                                  Total Price: <span>{reservation.price}DH</span>
                                </p>
                                {reservation.paid ? (
                                  <ButtonLink to={`/invoice/${reservation.id}`}>
                                    View Invoice
                                  </ButtonLink>
                                ) : (
                                  <ButtonLink
                                    onClick={(e) =>
                                      (window.location.href =
                                        reservation.stripeLink)
                                    }
                                  >
                                    Pay Now
                                  </ButtonLink>
                                )}
                              </div>
                            </StyledReservation>
                          ))}
                        </ul>
                      }
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
  padding-top: 7em;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const Info = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 60px;
  border: 2px solid #a10101;
  border-radius: 10px;
  flex-wrap: wrap;
  margin-top: 2rem;
  margin-bottom: 2rem;
  position : relative;
  .changeInfo{
    background-color : transparent;
    border : none;
    color :white;
    font-weight : bold;
    border-radius : 5px;
    position : absolute;
    top: 30px;
    right : 30px;
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
  position: relative;
  width: 95%;
  margin-top: 10px;
  padding-bottom: 20px;
  white-space: normal;
  overflow-x: auto;
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #a10101 lightgray; /* Firefox */
  ul {
    display: flex;
  }
  /* WebKit styles */
  &::-webkit-scrollbar {
    width: 12px;
    border-radius: 30px;
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
  width: 250px;
  border: 2px solid #a10101;
  border-radius: 10px;
  position: relative;
  margin-right: 20px;
  .info_card {
    padding: 20px 10px 20px 10px;
  }
  .image {
    position: relative;
    .delete {
      border: none;
      background-color: transparent;
      position: absolute;
      right: 10px;
      top: 10px;
      font-weight: 700;
      font-size: 15px;
      /* color : #a10101; */
      /* background-color : black; */
      border-radius: 50%;
      /* width : 20px; */
      text-align: center;
      /* padding : 2px 5px; */
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
  width: 100%;
  height: 200px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const ButtonLink = styled(Link)`
  /* position : relative; */
  /* bottom :-10px; */
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
