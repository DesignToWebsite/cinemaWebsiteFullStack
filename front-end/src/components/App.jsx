import {  Routes, Route, useLocation} from "react-router-dom"
import GlobalStyle from "../style/GlobalStyle"

//import SignUp from "./Authetification_system/SignUp.css"
import WeeWeeklyMovies from "../components/ShowMovies/WeeklyMovies"
import Reservation from "../pages/Reservation"
import Profile from "../pages/Profile"
import Description from "../pages/Description"
import Login from "../pages/Login"
import Nav from "./Nav"
import Home_page from "./Home_page"
import SignUp from "../pages/signUp"
import Movie_description from "./Movie_description"
import { useState } from "react"
function App() {
  const location = useLocation();
  return (
    <>
    <GlobalStyle />
    <>
      <Nav/>
          <Routes location={location} key={location.pathname}>
              <Route path="/" Component={Home_page}/>
              <Route path="/login" Component={Login} />
              <Route path="/signUp" Component={SignUp} />
              <Route path="/profile" Component={Profile} />
              <Route path="/movies" Component={WeeWeeklyMovies} />
              <Route path="/description/:id" Component={Description} />
              <Route path="/reservation/:id" Component={Reservation} />
              {/* <Route path="/reservationCompleted/:id" Component={Reservation} /> */}
              <Route path="/movie_page/:id"  Component={Movie_description} />
          </Routes>

      </>
     
    </>
  )
}

export default App
