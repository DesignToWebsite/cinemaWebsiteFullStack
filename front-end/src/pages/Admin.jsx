import styled from "styled-components";
import AddMovie from "../components/AddMovie";
import { useEffect, useState } from "react";
import { fetchMovies } from "../data/api";
import TableMovies from "../components/TableMovies";
import axios from "axios";
import SearchInput from "../components/SearchInput";

const Admin = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(localStorage.getItem("id"));
  // const [pages, setPages] = useState(1);
  const [current_page, setCurrent_page] = useState(localStorage.getItem("current_page") || 1);

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


  const nextPage = (e)=>{
    // console.log()
    setCurrent_page(e.target.innerText)
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }

  const pagination = [];
  for (let i = 0; i < last_page; i++) {
    pagination.push(
      <div key={i}>
        <button onClick={nextPage} className="btn_pg">
          {i+1}
        </button>
      </div>
    );
  }

  return (
    <AdminStyle>
      <div className="title">
        <h1>Movies List</h1>
        <AddMovie setMovies={setMovies} />
      </div>
      <div  className="search">
        <SearchInput setCurrent_page={setCurrent_page} setlast_page={setlast_page} setMovies={setMovies} />
      </div>

      <TableMovies movies={movies} current_page={current_page} />

      <Pagination>{pagination}</Pagination>
    </AdminStyle>
  );
};

const AdminStyle = styled.div`
  padding-top: 7em;
  text-align: center;
  margin-bottom: 2em;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      width: fit-content;
      background-color: transparent !important;
      border: none;
      padding-left: 1em;
      margin: 0;
    }
  }
`;
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
export default Admin;
