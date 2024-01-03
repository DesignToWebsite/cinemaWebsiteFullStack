import styled from "styled-components"
import cinema from "../assets/cinema.jpg"
import TopMovies from "./TopMovies";
import Header from "./Header";
import Categories from "./Categories";


const Home_page = () =>{
    return (
        <Home_style>
            <Header/>
            <TopMovies />
            <Categories />
            
        </Home_style>
    )
}


const Home_style = styled.div`
    
`;

export default Home_page;