import { useState } from "react";
import searchMoviesAPI from "../api/searchMovies";
import MovieCard from "./MovieCard";

function SearchMovie() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [isMovieFound, setIsMovieFound] = useState(true);
  const [displayButton ,setDisplayButton] = useState(false);

  const maxPageDisplay = 5;

  function calculatePageRange(currentPage, totalPages, maxPageDisplay) {
    let startPage, endPage;

    if (totalPages <= maxPageDisplay) {
      //Case when the total pages are less than the max page to display
      startPage = 1;
      endPage = totalPages;
    } else {
      //Calculate the number of pages to show before and after the current page
      const maxPagesBeforeCurrentPage = Math.floor(maxPageDisplay / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPageDisplay / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrentPage) {
        //Current page is near the start
        startPage = 1;
        endPage = maxPageDisplay;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        //Current page is near the end
        startPage = totalPages - maxPageDisplay + 1;
        endPage = totalPages;
      } else {
        // Current page is somewhere in the middle
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    return { startPage, endPage };
  }

  async function searchMovies(number) {
    const results = await searchMoviesAPI(query, number);
    if (!results) {
      setIsMovieFound(false); // Set isMovieFound to false if no results are returned
      setMovies([]);
      setTotalPages(0);
    } else {
      setMovies(results.results);
      setTotalPages(results.total_pages);
      setIsMovieFound(results.results.length > 0); // Set isMovieFound to true if movies are found, false otherwise
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (query !== "") {
      searchMovies(1);
      setDisplayButton(true);
    }
  }
  function nextPage() {
    setCurrentPage((prev) => {
      const newPage = Math.min(prev + 1, totalPages);
      searchMovies(newPage);
      return newPage;
    });
  }

  function prevPage() {
    setCurrentPage((prev) => {
      const newPage = Math.max(prev - 1, 1);
      searchMovies(newPage);
      return newPage;
    });
  }

  function goToPage(number) {
    setCurrentPage(number);
    searchMovies(number);
    setActivePage(number);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <label className="label" htmlFor="query">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="i.e. Jurrasic Park"
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="button" type="submit" disabled={query.trim() === ""}>
          Search
        </button>
      </form>
      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard movieDetails={movie} key={movie.id} />
          ))}
      </div>
      {!isMovieFound ? (
        <p
          style={{
            margin: "37px auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Not Found ... Please Search Again
        </p>
      ) : (
        displayButton ? (
        <div>
          {query !== "" ? (
            <div className="pagination">
              <button onClick={prevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <button onClick={nextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>):("")
  )}

      {!isMovieFound ? (
        ""
      ) : (
        <div className="pageButtons">
          {(() => {
            const { startPage, endPage } = calculatePageRange(
              currentPage,
              totalPages,
              maxPageDisplay
            );
            return [...Array(endPage - startPage + 1).keys()].map((number) => {
              const pageNumber = startPage + number;
              return (
                <button
                  key={number}
                  onClick={() => goToPage(pageNumber)}
                  style={
                    pageNumber === activePage
                      ? { backgroundColor: "#f0f024" }
                      : {}
                  }
                >
                  {pageNumber}
                </button>
              );
            });
          })()}
        </div>
      )}
    </>
  );
}

export default SearchMovie;
