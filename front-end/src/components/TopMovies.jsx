import styled from "styled-components"
import Carousel from "./Carousel"
import { Container } from "../style/style"

const TopMovies = ({movies}) =>{
    const moviesSelected =  movies.filter(item=>item.top)  ;
    // console.log(moviesSelected)
    return(
        <Movie>
            <div id="movies"></div>
            <h2>Top movies</h2>
            <Carousel moviesSelected={moviesSelected}/>
        </Movie>
    )
}


const Movie = styled.div`

`

export default TopMovies