import React from "react";
// import './Login.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import { ContainerLogin } from "../style/style";
function Login() {
  const handleLogin = () => {
    // Effectuez ici l'authentification ou la vérification du login
    // Si la connexion est réussie, redirigez vers la page "Fiche"
  };

  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const togglePasswordShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ContainerLogin>
      <div className="content">
        <div className="login">
          <div className="logo">
            <p>
              <span>Cine</span>Booking{" "}
            </p>
            <h3 className="welcome">Welcome back !</h3>
          </div>

          <div className="form">
            <div className="input_form">
              <input className="input" required type="email" id="email" />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input_form">
              <input
                className="input"
                required
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <label htmlFor="password">Password</label>
              <button className="eye" onClick={togglePasswordShow}>
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  // Icône d'œil pour afficher le mot de passe
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
            </div>
            <div className="buttonn">
              {/* <div className="forgot-password">Forgot password ? <a href="#">Click here</a></div> */}
              <button className="butt" onClick={handleLogin}>
                Login
              </button>
              <div className="account">
                Don't have an account ? <a href="/fiche">Regester here </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContainerLogin>
  );
}


export default Login;
