// api.js
import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/movies?includeReservations=true';
const MoviesInfo = baseURL + '/api/movies?includeReservations=true';

export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${MoviesInfo}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
