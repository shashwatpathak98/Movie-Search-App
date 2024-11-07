/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import Rating from "@mui/material/Rating";
function movieDetailsCard({ movieDetails }) {

    const roundedRating = Math.ceil(movieDetails.vote_average * 2) / 2;
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
          <p className="rating--card">
          <small style={{display:"flex" , justifyContent:"center", alignContent:"center", gap:"1rem"}}>
          RATING:
          <small> {movieDetails.vote_average}</small>
         
            <Rating
                name="read-only"
                value={roundedRating}
                precision={0.5}
                max={10}
                readOnly
              />
             
              
             
              
            </small>
          </p>

          <p className="card--desc">{movieDetails.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default movieDetailsCard;
