import styled from "styled-components"
import Carousel from "./Carousel"
import { Container, LoadingIndicator } from "../style/style"
import { Autoplay } from "swiper/modules";

const TopMovies = ({movies}) =>{
    const moviesSelected =  movies.filter(item=>item.top)  ;
    return(
        <Movie data-test="topMovies">
            <div id="movies"></div>
            <h2>Top movies</h2>
            {moviesSelected.length == 0 && <LoadingIndicator style={{"margin":"auto"}} data-test="loading"/>}
            {moviesSelected.length > 0 && <Carousel moviesSelected={moviesSelected}/>}
            
        </Movie>
    )
}


const Movie = styled.div`

`

export default TopMovies