const MovieList = (props) => {
  const FavoriteComponent = props.FavoriteComponent;
  return (
    <>
      {props.movies.map((movie) => {
        return (
          <div
            key={movie.imdbID}
            className="image-container d-flex justify-content-start m-3"
          >
            <img src={movie.Poster} alt="movie"></img>
            <div
              onClick={() => {
                props.favoriteMovieHandler(movie);
              }}
              className="overlay d-flex align-items-center justify-content-center"
            >
              <FavoriteComponent title={props.title} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MovieList;
