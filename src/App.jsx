import React, { useEffect, useState } from 'react';

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const searchMovies = async (title) => {
    const response = await fetch(`https://www.omdbapi.com?apikey=${import.meta.env.VITE_API_KEY}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('Superman');
  }, []);

  return (
    <div className='app'>
      <h1>MovieLand</h1>

      <div className="search">
        <input 
          type="text" 
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
          src={SearchIcon} 
          alt="search_icon" 
          onClick={() => searchMovies(searchTerm)}
        />

      </div>
      {
        movies?.length > 0 
          ? (
              <div className="container">
                {movies.map((movie) => (
                  <MovieCard movie={movie} />
                ))}
              </div>
          ) : (
            <h2>No movies found</h2>
          )  
      }

    </div>
  )
}

export default App