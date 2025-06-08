import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-400 cursor-pointer" onClick={() => navigate("/")}>🎬 Cinemates</h1>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm">Hi, {user.name}</span>
            <button onClick={() => { logout(); navigate("/login"); }} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")} className="text-sm hover:underline">Login</button>
            <button onClick={() => navigate("/register")} className="text-sm hover:underline">Register</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
