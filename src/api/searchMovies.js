async function searchMoviesAPI(searchQuery, number) {
  const apiKey = import.meta.env.VITE_API_KEY;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchQuery}&page=${number}&include_adult=false`
    );
    if (!response.ok) {
      console.error("API request failed with status " + response.status);
      return { results: [] };
    }
    const data = await response.json();
    console.log("data fetched");
    return data;
  } catch (error) {
    console.error(error);
    return { results: [] };
  }
}

export default searchMoviesAPI;
