import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Optional: background blur effect */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/5a4oHeF6f9HbFUZyG8sHk9IhMYR.jpg')`,
          filter: 'blur(4px)',
        }}
      />

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-indigo-400 drop-shadow-md">
          Welcome to <span className="text-pink-400">Cinemates</span> 🎬
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Discover. Watch. Share the magic of movies.
        </p>

        <Link
          to="/dashboard"
          className="mt-8 px-8 py-3 text-lg font-semibold rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-lg"
        >
          🎥 Enter Cinemates
        </Link>
      </div>
    </div>
  );
}

export default App;
