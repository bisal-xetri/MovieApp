import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

import "./App.css";
import SearchIcon from "./search.svg";

const API_URL = "http://www.omdbapi.com?apikey=4989210c";
const movie1 = {
  Title: "Deadpool 2",
  Year: "2018",
  imdbID: "tt5463162",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BNmM4MWFlNGEtYjJjMC00ZGRlLWE5ZDMtZDRmODQ1ZTkxZjMwXkEyXkFqcGdeQXVyMTcwOTQzOTYy._V1_SX300.jpg",
};
const App = () => {
  const [Movies, setMovies] = useState([]);

  const [searchTerm,setSearchTerm]=useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Deadpool");
  }, []);
  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <img
          src={SearchIcon} // Corrected typo from "scr" to "src"
          alt="search"
          onClick={() => searchMovies(searchTerm)} // Search when clicking the icon
        />
      </div>
      {Movies?.length > 0 ? (
        <div className="container">
          {Movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
