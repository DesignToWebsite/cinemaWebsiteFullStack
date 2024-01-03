import React from "react";
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'





function SignUp(){
   
    const handleLogin = () => {
        // Effectuez ici l'authentification ou la vérification du login
        // Si la connexion est réussie, redirigez vers la page "Fiche"
       
      };
    

    const [password , setPassword]= React.useState("");
    const[showPassword , setShowPassword]= React.useState(false);
    const handlePasswordChange = (e)=>{
        setPassword(e.target.value);
    };
    const togglePasswordShow =()=>{
        setShowPassword(!showPassword);
    }

   
    return(
       <div className="container1r">
            <div className="content">
                <div className="login">
                    <div className="logo">
                    <img className="image-logo" src="./logo.jpg" alt="logo" />
                    <h3 className="welcome">Welcome back !</h3>
                    </div>
                    
                    <div className="form">
                        <div className="input_form">
                            <input className="input" required type="text" id="firstName" />
                            <label htmlFor="firstName">First Name</label>
                        </div>
                        <div className="input_form">
                            <input className="input" required type="text" id="lastName" />
                            <label htmlFor="lastName">Last Name</label>
                        </div>
                        <div className="input_form">
                            <input className="input" required type="email" id="email" />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input_form">
                            <input className="input" required type="text" id="phone" />
                            <label htmlFor="phone">Phone</label>
                        </div>
                        <div className="input_form">
                         <input className="input" required 
                            type={showPassword ? 'text' : 'password'} 
                            id="password"
                            value={password}
                            onChange={handlePasswordChange} />
                            <label htmlFor="password">Password</label>
                            <button className="eye" onClick={togglePasswordShow}>
                                {showPassword ? (<FontAwesomeIcon icon={faEye} /> ):
                                // Icône d'œil pour afficher le mot de passe
                                (<FontAwesomeIcon icon={faEyeSlash} /> )
          
                                 }
                            </button>
                        </div>
                        <div className="input_form">
                         <input className="input" required 
                            type={showPassword ? 'text' : 'password'} 
                            id="confirmPassword"
                            value={password}
                            onChange={handlePasswordChange} />
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <button className="eye" onClick={togglePasswordShow}>
                                {showPassword ? (<FontAwesomeIcon icon={faEye} /> ):
                                // Icône d'œil pour afficher le mot de passe
                                (<FontAwesomeIcon icon={faEyeSlash} /> )
          
                                 }
                            </button>
                        </div>
                        <div className="buttonn">
                            <div className="forgot-password">Forgot password ? <a href="#">Click here</a></div>
                            <button className="butt" onClick={handleLogin}>Login</button>
                            <div className="account">Don't have an account ? <a  href="/fiche">Regester here </a></div>
                        </div>
                        
                    </div>
                
           
                </div>
            </div>
        
       </div>
    )
}

export default SignUp;