import dotenv from "dotenv";
dotenv.config();

async function searchMoviesAPI(searchQuery) {
  const apiKey = import.meta.env.VITE_API_KEY;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default searchMoviesAPI;
