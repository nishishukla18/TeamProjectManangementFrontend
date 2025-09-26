import { useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function Header() {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);

  return (
    <header className="w-full border-b bg-white shadow">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Company Logo" className="h-8 w-8" />
          <span className="font-bold text-lg">MyCompany</span>
        </div>
        {/* User Initial or Login Button */}
        {userData && userData.name ? (
          <div
            className="h-8 w-8 flex items-center justify-center rounded-full bg-red-500 text-white font-bold text-lg"
            title={userData.name}
          >
            {userData.name[0].toUpperCase()}
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 border border-gray-400 rounded-full hover:bg-gray-100 flex items-center gap-2 transition"
            >
              <span>Login</span>
              <FaArrowRight className="text-sm" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}