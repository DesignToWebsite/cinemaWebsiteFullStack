import { useState } from "react"
import { Container, Container_zineb } from "../style/style"
import Carousel from "./Carousel"
import {styled} from 'styled-components'
// import { movies } from "../data/movies";
import { data } from "../data/data"

const Categories = () =>{
    const [selectedCategory, setSelectedCategory] = useState('Horror');
    const moviesSelected = data.filter(item=> item.category.includes(selectedCategory) ==true );

   
    return(
        <Categorie>
            <h2>Our popular Categories</h2>
            <div className="cat">
                <ul>
                    <li onClick={() => setSelectedCategory('Science Fiction')}>Science Fiction</li>
                    <li onClick={() => setSelectedCategory('Action')}>Action</li>
                    <li onClick={() => setSelectedCategory('Horror')}>Horror</li>
                    <li onClick={() => setSelectedCategory('Mystery')}>Mystery</li>
                    <li onClick={() => setSelectedCategory('Comedy')}>Comedy</li>
                </ul>
            </div>
            <div className="movies">
                <Carousel moviesSelected={moviesSelected} />
                {/* <Carousel /> */}
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
`;



export default Categories;