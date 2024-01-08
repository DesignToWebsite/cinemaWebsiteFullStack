import styled from "styled-components"
import cinema from "../assets/cinema.jpg"
import { Container_zineb } from "../style/style";


const Header = () =>{
    return (
        <>
            <HeaderStyle>
                <Content>
                    <h1>Your Movie Reservation Hub</h1>
                    <p>
                    Embark on your cinematic journey at CineBooking! Discover the latest blockbusters, reserve your seats with ease, and create memorable moments with friends. Your go-to platform for seamless movie reservations. Book now and experience the thrill like never before!                    </p>
                    <a href="#movies">
                        <button className="reserve">Reserve now</button>
                    </a>
                </Content>
            </HeaderStyle>
        </>
    )
}

const HeaderStyle = styled.div`
    min-height:100vh;
    width:100vw;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.538) , rgba(0, 0, 0, 0.656)), url(${cinema}) center/cover no-repeat fixed;
    background-size:cover;
    margin-bottom: 2em;
    /* padding-bottom:7em; */
    
`;
const Content = styled(Container_zineb)`
    
    max-width: 70%;
    background:linear-gradient(to right, rgba(0, 0, 0, 0.829), rgba(0, 0, 0, 0.04));
    min-height : 100vh;
    color : white;
    display:flex;
    flex-direction:column;
    align-items:baseline;
    justify-content:center;
    h1{
        font-size:3.2em;
        font-weight:bold;
        margin-bottom:20px;
    }
    p{
        opacity:.8;
        padding: 2em 0;
        font-weight:lighter;
    }
    .reserve{
        font-size:18px;
        background-color:red;
        padding:12px 30px;
        color:white;
        font-weight:bold;
        /* background:#9B0304; */
        background:linear-gradient(to right,rgba(0, 0, 0, 0.909), #770202 );
        border: none;
        border-radius:20px;
        border : 2px solid black;
        &:hover{
            background:transparent;
            border : 4px solid transparent;
        }
    }
`;

export default Header;