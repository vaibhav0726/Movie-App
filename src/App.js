import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import Favorites from "./components/Favorites";
import RemoveFavorite from "./components/RemoveFavorite";

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const getMovieRequestHandler = async () => {
      const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=c0cb9123`;
      const response = await fetch(url);
      const responseJSON = await response.json(); // converts our http response to JSON
      console.log(responseJSON);
      if (responseJSON.Search) setMovies(responseJSON.Search);
    };
    getMovieRequestHandler();
  }, [searchValue]);

  useEffect(() => {
    // because we used stringify to store the data
    const movieFavorite = JSON.parse(
      localStorage.getItem("react-movie-app-favorite")
    );
    if (movieFavorite) setFavorites(movieFavorite);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favorite", JSON.stringify(items));
  };

  const addFavoriteMovie = (movie) => {
    for (let idx of favorites) {
      if (idx.imdbID === movie.imdbID) {
        return;
      }
    }
    const newFavoriteMovie = [...favorites, movie];
    setFavorites(newFavoriteMovie);
    saveToLocalStorage(newFavoriteMovie);
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteMovie = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    if (newFavoriteMovie) {
      setFavorites(newFavoriteMovie);
      saveToLocalStorage(newFavoriteMovie);
    }
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <Navbar heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          favoriteMovieHandler={addFavoriteMovie}
          FavoriteComponent={Favorites}
          title="Add To Favorite"
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <Navbar heading="Favorites" />
      </div>
      <div className="row">
        <MovieList
          movies={favorites}
          favoriteMovieHandler={removeFavoriteMovie}
          FavoriteComponent={RemoveFavorite}
          title="Remove From Favorite"
        />
      </div>
    </div>
  );
}

export default App;
