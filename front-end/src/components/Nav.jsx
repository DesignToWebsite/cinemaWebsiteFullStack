import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Container_zineb } from "../style/style";
import { useEffect } from "react";

const Nav = ({isAdmin}) =>{ 
    const navigate = useNavigate();
    const logout = () =>{
        localStorage.clear();
        navigate('/login')
        window.location.reload()
    }
   
    return (
            <NavStyle>
                <Logo>
                    <Link data-test="logo"  to="/home"><span>Cine</span>Booking </Link>
                </Logo>
                <List data-test="navbar">
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/movies">Movies</Link></li>
                    {
                        localStorage.getItem("isLoggedIn") != null &&
                        (
                        <>
                            <li><Link to="/profile">Profile</Link></li>
                            {JSON.parse(localStorage.getItem("user"))?.email == "admin.nimda@gmail.com"   && <li><Link to="/admin">Admin</Link> </li>}
                            <li onClick={(logout)}><Link to="/login" >Logout</Link> </li>
                        </>)
                    }
                    {
                        !localStorage.getItem("isLoggedIn") &&
                        (
                            <>
                                <li data-test="login"><Link to="/login">Login</Link></li>
                                <li data-test="signup"><Link to="/signUp">SignUp</Link></li>
                            </>
                        )
                    }
                    
                </List>
            </NavStyle>
)}


const NavStyle = styled(Container_zineb)`
    position:absolute;
    width:100%;
    color : #dddddd;
    display: flex;
    align-items:center;
    justify-content:space-between;
    padding-top:1.5em;
    padding-bottom:1.5em;
`;
const List = styled.ul`
    display: flex;
    flex-direction:row;
    margin-bottom: 0;
    /* align-items:center; */
    li{
        padding-left: 1.5em;        
        a{
            color: #dddddd;
            font-weight: 600;
            list-style-type: none;
            &:hover{
              text-decoration:underline;
              padding-bottom:10px;
            }
        }
    }
    
`;
const Logo = styled.div`

    
    a{
        display:flex;
        align-items:center;
        color:#ffffff;
        font-weight: bold;
        font-size:20px;
        span{
        margin-right:5px;
        color :#770202;
        font-weight:bold;
        font-size:30px;
    }
    }
`;

export default Nav;