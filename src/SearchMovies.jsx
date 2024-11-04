import searchMoviesAPI from "./api/searchMovies";

function SearchMovie() {


async function searchMovies(event){
      event.preventDefault();
      console.log("submitting");

      const query = "Jurassic Park";
      searchMoviesAPI(query);
      
}
  
  return (



    <form className="form" onSubmit={searchMovies}>
      <label className="label" htmlFor="query">
        Movie Name
      </label>
      <input
        className="input"
        type="text"
        name="query"
        placeholder="i.e. Jurrasic Park"
      />
      <button className="button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchMovie;
