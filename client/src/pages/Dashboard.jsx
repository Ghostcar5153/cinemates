import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addToList, getLocal } from '../utils/storage';
import MovieGrid from '../components/MovieGrid';
import Navbar from '../components/Navbar';
import debounce from 'lodash.debounce';

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
        active ? 'bg-indigo-600 scale-105 shadow-lg' : 'bg-gray-700 hover:bg-gray-600'
      }`}
    >
      {label}
    </button>
  );
}

function Dashboard() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [tab, setTab] = useState('search');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const searchMovies = async () => {
    if (!query.trim()) return;
    try {
      setLoading(true);
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${import.meta.env.VITE_TMDB_KEY}`);
      const data = await res.json();
      const mapped = data.results.slice(0, 12).map((movie) => ({
        title: movie.title,
        overview: movie.overview,
        poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
        tmdb_id: movie.id,
        embed_url: `https://vidlink.pro/movie/${movie.id}`
      }));
      setMovies(mapped);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(searchMovies, 400);

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white p-6">
        <div className="flex justify-center mb-8 gap-4">
          {[
            { key: 'search', label: '🔍 Search' },
            { key: 'watchlist', label: '📺 Watchlist' },
            { key: 'history', label: '🕒 History' }
          ].map(({ key, label }) => (
            <TabButton key={key} label={label} active={tab === key} onClick={() => setTab(key)} />
          ))}
        </div>

        {message && <div className="text-center text-green-400 mb-4 font-semibold">{message}</div>}

        {tab === 'search' && (
          <>
            <div className="mb-8 flex justify-center">
              <input
                className="px-4 py-2 w-full max-w-md rounded-l bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Search a movie..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  debouncedSearch();
                }}
              />
              <button
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-r"
                onClick={searchMovies}
              >
                Search
              </button>
            </div>

            {loading && <p className="text-center text-gray-400">Loading movies...</p>}
            {!loading && movies.length === 0 && <p className="text-center text-gray-400">Start typing and hit "Search" to find movies 🎬</p>}

           <MovieGrid movies={movies} />

          </>
        )}

        {tab === 'watchlist' && (
          getLocal('watchlist').length > 0 ? <MovieGrid movies={getLocal('watchlist')} /> : <p className="text-center text-gray-400">Your watchlist is empty!</p>
        )}

        {tab === 'history' && (
          getLocal('history').length > 0 ? <MovieGrid movies={getLocal('history')} /> : <p className="text-center text-gray-400">You haven't watched anything yet.</p>
        )}
      </main>
    </>
  );
}

export default Dashboard;
