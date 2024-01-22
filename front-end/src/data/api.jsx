// api.js
import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/movies?includeReservations=true';
const MoviesInfo = 'http://127.0.0.1:8000/api/movies?includeReservations=true';

export const fetchMovies = async (id) => {
  try {
    if(id){
      const url = `${MoviesInfo}&&pages=${id}`
      const response = await axios.get(url)
      console.log(url)
      return response.data;

    }
    else{
    const url = `${MoviesInfo}`
    const response = await axios.get(url);
    return response.data;

    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
