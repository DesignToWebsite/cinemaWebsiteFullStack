import { Routes, Route, useLocation } from "react-router-dom";
import GlobalStyle from "../style/GlobalStyle";
import Reservation from "../pages/Reservation";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Nav from "./Nav";
import Home_page from "./Home_page";
import SignUp from "../pages/SignUp";
import Movie_description from "./Movie_description";
import { useEffect, useState } from "react";
import PaymentForm from "./PaymentForm";
import Invoice from "./Invoice";
import EditProfile from "../pages/EditProfile";
import Admin from "../pages/Admin";
import Movies from "../pages/Movies";

function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isLoggedIn")
  );
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(()=>{
    if (localStorage.getItem("user")) {
      const userAuthen = JSON.parse(localStorage.getItem("user"));
      if (
        userAuthen.firstName == "admin" &&
        userAuthen.lastName == "nimda" &&
        userAuthen.email == "admin.nimda@gmail.com"
      ) {
        setIsAdmin(true);
      }
    }
    
  },[isAuthenticated])



  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isLoggedIn"));
    if (localStorage.getItem("user")) {
      const userAuthen = JSON.parse(localStorage.getItem("user"));
      if (
        userAuthen.firstName == "admin" &&
        userAuthen.lastName == "nimda" &&
        userAuthen.email == "admin.nimda@gmail.com"
      ) {
        setIsAdmin(true);
      }
    }
  }, [localStorage]);
  return (
    <>
      <GlobalStyle />
      <>
        <Nav isAdmin={isAdmin} />
        <Routes location={location} key={location.pathname}>
          <Route path="/home" element={<Home_page />} />
          <Route path="/" element={<Home_page />} />
{
  !isAuthenticated &&(
    <>
    <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
    </>
  )
}
          {isAuthenticated && (
            <>
              
              <Route path="/profile" element={<Profile />} />
              <Route path="/payReservation/:id" element={<PaymentForm />} />
              <Route path="/invoice/:id" element={<Invoice />} />
              <Route path="/editProfile" element={<EditProfile />} />
              <Route path="/profile/:id" element={<Profile />} />
            </>
          )}
          <Route path="/reservation/:id" element={<Reservation />} />
          <Route path="/movie_page/:id" element={<Movie_description />} />
         {isAdmin && <Route path="/admin" element={<Admin />} />}
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </>
    </>
  );
}

export default App;
