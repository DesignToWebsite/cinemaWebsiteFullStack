import { Routes, Route, useLocation } from "react-router-dom";
import GlobalStyle from "../style/GlobalStyle";
import WeeWeeklyMovies from "../components/ShowMovies/WeeklyMovies";
import Reservation from "../pages/Reservation";
import Profile from "../pages/Profile";
import Description from "../pages/Description";
import Login from "../pages/Login";
import Nav from "./Nav";
import Home_page from "./Home_page";
import SignUp from "../pages/SignUp";
import Movie_description from "./Movie_description";
import { useEffect, useState } from "react"
import styled from "styled-components";

function App() {
  const location = useLocation();

  // const [movies,setMovies] = useState([]);
  //   const [loading,setLoading] = useState(true);
  //   useEffect(()=>{
  //       const fetchData = async() =>{
  //           try{
  //               const MoviesData = await fetchMovies();
  //               setMovies(MoviesData.data);
  //           }catch(error){
  //               console.error();
  //           }finally{
  //               setLoading(false);
  //           }
  //       };
  //       fetchData();
  //   }, [loading]);
// let data = movies;
// console.log(movies)
  return (
    <>
      <GlobalStyle />
      <>
        <Nav />
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={<Home_page  />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/signUp"
            element={<SignUp  />}
          />
          <Route
            path="/profile"
            element={<Profile  />}
          />
          <Route
            path="/reservation/:id"
            element={<Reservation  />}
          />
          <Route
            path="/movie_page/:id"
            element={<Movie_description  />}
          />
        </Routes>
      </>
    </>
  );
}



export default App;
