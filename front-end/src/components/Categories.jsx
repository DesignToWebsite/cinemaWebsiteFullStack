import { useEffect, useState } from "react"
import { Container, Container_zineb, LoadingIndicator } from "../style/style"
import Carousel from "./Carousel"
import {styled} from 'styled-components'
// import { movies } from "../data/movies";
// import { data } from "../data/data"

// import { fetchMovies } from "../data/api"


const Categories = (movies) =>{
    
    const [selectedCategory, setSelectedCategory] = useState('Action');
    // console.log(moviecs)
    // const moviesData = movies;
    const moviesSelected = movies ? movies.movies.filter(item=> item.category.includes(selectedCategory) ==true ) : [] ;

   
    return(
        <Categorie data-test="categories_section">
            <h2>Our popular Categories</h2>
            <div className="cat">
                <ul data-test="categories">
                <li className={selectedCategory === 'Science Fiction' ? 'active' : ''} onClick={() => setSelectedCategory('Science Fiction')}>Science Fiction</li>
                    <li className={selectedCategory === 'Action' ? 'active' : ''} onClick={() => setSelectedCategory('Action')}>Action</li>
                    <li className={selectedCategory === 'Adventure' ? 'active' : ''} onClick={() => setSelectedCategory('Adventure')}>Adventure</li>
                    <li className={selectedCategory === 'Mystery' ? 'active' : ''} onClick={() => setSelectedCategory('Mystery')}>Mystery</li>
                    <li className={selectedCategory === 'Comedy' ? 'active' : ''} onClick={() => setSelectedCategory('Comedy')}>Comedy</li>
                </ul>
            </div>
            <div className="movies">

            {moviesSelected.length == 0 &&
                    <LoadingIndicator style={{"margin":"auto"}} data-test="loading"/>
                }

                {moviesSelected.length > 0 &&
                    <Carousel moviesSelected={moviesSelected} />
                }
            </div>
        </Categorie>
    )
}

const Categorie = styled(Container_zineb)`
    
    .cat{
        ul{
            display:flex;
            /* align-items:center; */
            justify-content:center;
            li{
                cursor: pointer;
                font-size:20px;
                font-weight:600;
                margin-right:20px;
                background:#770202;
                padding : 10px 25px;
                border-radius:5px;
            }
        }
    }
    .active{
        background-color:  #3b1111f2 !important;
    }
`;



export default Categories;