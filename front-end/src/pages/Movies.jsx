import SearchInput from "../components/SearchInput";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Card_movie from "../components/Card_movie";
import styled from "styled-components";

const Movies = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [pages, setPages] = useState(1);
  const [current_page, setCurrent_page] = useState(1);

  const [last_page, setlast_page] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl =
          "http://127.0.0.1:8000/api/movies?includeReservations=true";

        const MoviesData = await axios.get(`${baseUrl}&&page=${current_page}`);
        // console.log(MoviesData)

        setMovies(MoviesData.data);
        setlast_page(MoviesData.data.meta.last_page);
      } catch (error) {
        console.error();
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [loading, current_page]);
  // console.log(last_page);

  const nextPage = (e) => {
    // console.log()
    setCurrent_page(e.target.innerText);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // console.log(movies?.data)
  const pagination = [];
  for (let i = 0; i < last_page; i++) {
    pagination.push(
      <div key={i}>
        <button onClick={nextPage} className="btn_pg">
          {i + 1}
        </button>
      </div>
    );
  }
  // console.log(movies)
  return (
    <MoviesStyle data-test="moviesSection">
      <SearchInput setMovies={setMovies} />
      <div className="movies">
        {(movies?.data && movies.data.length>0 )?
          movies.data.map((item) => {
            return <Card_movie  key={item.id} movie_item={item} />;
          }) : <p>No movie exist</p>
        }

      </div>
      <Pagination >{pagination}</Pagination>

    </MoviesStyle>
  );
};

const MoviesStyle = styled.div`
    padding-top : 7em;
    .movies{
        display:flex;
        flex-wrap : wrap;
        align-items:center;
        justify-content:center;
        /* flex-direction : column; */
        .styledCard{
            width:300px !important;
            margin : 20px;
            .img img{
                width:100%;
                height:300px;
            }
            .content{
                display:flex;
                flex-direction:column;
                text-align:center;
                align-items:center;
                justify-content:center;
            }
        }
    }
`

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2em auto;

  button {
    padding: 5px 10px;
    font-weight: bold;
    background-color: #a10101;
    border: none;
    margin-right: 10px;
    color: white;
  }
`;
export default Movies;