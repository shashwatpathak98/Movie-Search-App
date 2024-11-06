/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
function movieDetailsCard({ movieDetails }) {
  return (
    <div className="card" key={movieDetails.id}>
      <img
        className="card--image"
        src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movieDetails.poster_path}`}
        alt={movieDetails.title + " poster"}
      />
      <div className="card--content">
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
  );
}

export default movieDetailsCard;
