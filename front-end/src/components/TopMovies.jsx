import styled from "styled-components"
import Carousel from "./Carousel"
import { Container } from "../style/style"

const TopMovies = () =>{
    return(
        <Movie>
            <div id="movies"></div>
            <h2>Top movies</h2>
            <Carousel />
        </Movie>
    )
}


const Movie = styled.div`

`

export default TopMovies