import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addToList } from "../utils/storage";
import Navbar from "../components/Navbar";

function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (id) {
      addToList("history", {
        tmdb_id: id,
        embed_url: `https://vidlink.pro/movie/${id}`,
        title: "Watched Movie",
        poster: "",
      });

      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`)
        .then((res) => res.json())
        .then(setMovie)
        .catch(console.error);
    }
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 flex flex-col md:flex-row items-start gap-6">
        {/* Player */}
        <div className="flex-1 w-full max-w-5xl mx-auto">
          {id ? (
            <iframe
              src={`https://vidlink.pro/movie/${id}?primaryColor=00f2ff&secondaryColor=a2a2a2&iconColor=eefdec&icons=default&player=default&title=false&poster=true&autoplay=false&nextbutton=false`}
              allowFullScreen
              className="w-full aspect-video rounded-xl shadow-xl border-2 border-indigo-500"
            />
          ) : (
            <p className="text-white text-lg">Invalid movie ID.</p>
          )}
        </div>

        {/* Sidebar Panel */}
        {movie && (
          <div className="w-full md:max-w-sm bg-gray-900 rounded-xl shadow-lg p-4">
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <p className="text-sm text-gray-400 mb-4">{movie.overview}</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  const roomId = crypto.randomUUID().slice(0, 6); // temporary id
                  navigate(`/party/${roomId}?movie=${id}`);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded font-semibold"
              >
                🎉 Start Party
              </button>
              <button
                onClick={() => addToList("watchlist", {
                  tmdb_id: id,
                  embed_url: `https://vidlink.pro/movie/${id}`,
                  title: movie.title,
                  poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                })}
                className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded font-semibold"
              >
                🔖 Save for Later
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Watch;
