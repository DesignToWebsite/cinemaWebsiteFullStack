import { useEffect, useState } from "react"
import styled from "styled-components"
import cinema from "../assets/cinema.jpg"
import TopMovies from "./TopMovies";
import Header from "./Header";
import Categories from "./Categories";
import { fetchMovies } from "../data/api"


const Home_page = () =>{
    const [movies,setMovies] = useState([]);
    const [loading,setLoading] = useState(localStorage.getItem("id"));
    useEffect(()=>{
        const fetchData = async() =>{
            try{
                const MoviesData = await fetchMovies();
                setMovies(MoviesData.data);
                // console.log(movies)
            }catch(error){
                console.error();
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    }, [loading]);
// console.log(movies)
    // const [dataExist, setDataExist] = useState(false);
    // if(movies ){
    //     setDataExist(true);
    // } 
    return (

        <Home_style>
            <Header/>
            {!loading &&
                <>
                    <TopMovies movies={movies}/>
                    <Categories movies={movies}/>
                </>
            }
            
        </Home_style>
    )
}


const Home_style = styled.div`
    /* padding-top : 7em; */
    
`;

export default Home_page;