import styled from "styled-components";
import EditMovie from "./EditMovie";
import axios from "axios";

const TableMovies = ({ movies, current_page }) => {
// console.log(movies)

  const deleteMovie = async (id, current_page) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/movies/${id}`
        );
        localStorage.setItem('current_page', current_page);
        console.log("deleted succes")
            window.location.reload();
      } catch (error) {
        console.error("Error white deleting the movie " + error.response.data);
      }
    }
  };

  // console.log(movies.data)
  return (
    <Table>
      <thead>
        <tr>
          <th className="img" style={{ width: "20%" }}>
            Movie Image
          </th>
          <th style={{ width: "20%" }}>Movie Name</th>
          <th style={{ width: "10%" }}>Room</th>
          <th style={{ width: "10%" }}>Price</th>
          <th style={{ width: "10%" }}>Rese.</th>
          <th style={{ width: "15%" }}>Time</th>
          <th style={{ width: "15%" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
        movies?.data?.map((movie) => {
            
          const totalReservations = movie.reservations
            .filter((reservation) => reservation.paid)
            .reduce((sum, reservation) => sum + reservation.placesReserved, 0);

          return (
            <tr key={movie.id}>
              <td className="img">
                <img src={movie.img} alt="" />
              </td>
              <td>{movie.name}</td>
              <td>{movie.salle}</td>
              <td>{movie.price} DH</td>
              <td>{totalReservations}</td>
              <td>
                {movie.day} {movie.time}
              </td>
              <td>
                <button className="delete" onClick={()=>deleteMovie(movie.id, current_page)}>
                  Delete
                </button>
                <EditMovie id={movie.id} movie={movie} />
              </td>
            </tr>
          );
        })
        }

        {/* Add more rows for additional movies */}
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  margin: auto;
  border-collapse: collapse;
  margin-bottom: 2em;
  width:80%;
  img {
    width: 100%;
    max-height: 200px;
  }
  th {
    font-weight: 600;
  }
  th,
  td {
    padding: 0.5em;
    text-align: left;

    /* border : 1px solid #bd0101; */
  }

  th {
    background-color: #bd0101;
  }
  button {
    border: none;
    border-radius: 5px;
    padding: 0.3em 0.5em;
    font-weight: 600;
    cursor: pointer;
    width: 80%;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.delete {
      background-color: #bd0101;
      color: white;
      margin-right: 0.5em;
    }
    &.edit {
      background-color: #014f01;
      color: white;
    }
  }
  .img {
    @media (max-width: 850px) {
      display: none;
      width: 0%;
    }
  }
`;

export default TableMovies;
