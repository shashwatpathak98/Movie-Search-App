/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
function movieDetailsCard({ movieDetails }) {
  return (
    <div className="card" key={movieDetails.id}>
      <a
        href={`https://www.themoviedb.org/movie/${movieDetails.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="card--image"
          width={185}
          height={278}
          src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
          alt={movieDetails.title + " poster"}
          title={"click to find out more info..."}
        />
      </a>
      <div className="card--content">
        <div className="card--center">
        <h2 className="card--title">{movieDetails.title}</h2>
        <p>
          <small>RELEASE DATE: {movieDetails.release_date}</small>
        </p>
        <p>
          <small>RATING: {movieDetails.vote_average}</small>
        </p>
       
        <p className="card--desc">{movieDetails.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default movieDetailsCard;
