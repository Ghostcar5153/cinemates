import { useState } from "react";
import { Link } from "react-router-dom";

function MovieGrid({ movies }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (!movies || movies.length === 0)
    return <p className="text-center text-gray-400 mt-10">No movies found.</p>;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.tmdb_id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105"
          >
            <div className="relative h-72 overflow-hidden">
              <img
                src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Image'}
                alt={movie.title}
                className="w-full h-full object-cover object-top"
              />
              <button
                onClick={() => setSelectedMovie(movie)}
                className="absolute bottom-2 right-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 text-sm rounded shadow-md"
              >
                👁 View
              </button>
            </div>
            <div className="p-3">
              <h3 className="text-white font-semibold truncate text-center">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl max-w-3xl w-full p-6 relative">
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-3 right-3 text-white text-xl hover:text-red-500"
            >
              ✖
            </button>
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={selectedMovie.poster || 'https://via.placeholder.com/300x450?text=No+Image'}
                alt={selectedMovie.title}
                className="w-full md:w-1/3 h-auto rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-white text-2xl font-bold mb-2">{selectedMovie.title}</h2>
                <p className="text-gray-400 text-sm mb-4">{selectedMovie.overview}</p>
                <div className="flex gap-4">
                  <Link
                    to={`/watch/${selectedMovie.tmdb_id}`}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow-md"
                  >
                    ▶️ Play
                  </Link>
                  <button
                    onClick={() => {
                      const current = JSON.parse(localStorage.getItem('watchlist')) || [];
                      const exists = current.some(m => m.tmdb_id === selectedMovie.tmdb_id);
                      if (!exists) {
                        current.push(selectedMovie);
                        localStorage.setItem('watchlist', JSON.stringify(current));
                      }
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow-md"
                  >
                    🔖 Watch Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MovieGrid;
