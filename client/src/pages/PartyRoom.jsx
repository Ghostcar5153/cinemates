import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { usePartySocket } from "../hooks/usePartySocket";

function PartyRoom() {
  const { roomId } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const movieId = query.get("movie");
  const [movie, setMovie] = useState(null);

  const currentUser = { name: "Guest", avatar: "" };
  const { participants } = usePartySocket(roomId, currentUser);

  useEffect(() => {
    if (movieId) {
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_KEY}`)
        .then((res) => res.json())
        .then(setMovie)
        .catch(console.error);
    }
  }, [movieId]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
        <h1 className="text-3xl font-bold text-center mb-6">🎉 Party Room: {roomId}</h1>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Video Player */}
          <div className="flex-1 w-full max-w-6xl mx-auto">
            {movieId ? (
              <iframe
                src={`https://vidlink.pro/movie/${movieId}?primaryColor=00f2ff&secondaryColor=a2a2a2&iconColor=eefdec&icons=default&player=default&title=false&poster=true&autoplay=false&nextbutton=false`}
                allowFullScreen
                className="w-full aspect-video rounded-xl shadow-xl border-2 border-indigo-500"
              />
            ) : (
              <p className="text-white text-lg">No movie selected.</p>
            )}
          </div>

          {/* Movie Info, Chat Placeholder, and Participants */}
          <div className="w-full lg:max-w-sm bg-gray-900 rounded-xl shadow-lg p-4">
            {movie ? (
              <>
                <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                <p className="text-sm text-gray-400 mb-4">{movie.overview}</p>
              </>
            ) : (
              <p className="text-gray-500">Loading movie info...</p>
            )}

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">👥 Participants</h3>
              <div className="space-y-2">
                {participants.length === 0 ? (
                  <p className="text-gray-500">No participants yet.</p>
                ) : (
                  participants.map((user) => (
                    <div
                      key={user.id}
                      className="bg-gray-800 p-2 rounded flex items-center justify-between"
                    >
                      <span className="text-white font-medium">{user.name}</span>
                      <span className="text-gray-500 text-xs">#{user.id.slice(0, 6)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">💬 Chat (coming soon)</h3>
              <div className="bg-gray-800 p-3 rounded text-sm text-gray-400">
                Chat features are under development.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PartyRoom;
