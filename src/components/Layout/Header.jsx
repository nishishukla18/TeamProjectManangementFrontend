import { useState } from "react";
import AuthDialog from "../../pages/AuthDialog";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate()
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white shadow">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Company Logo" className="h-8 w-8" />
          <span className="font-bold text-lg">MyCompany</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <button
        onClick={()=>navigate('/login')}
        className="px-4 py-2 border border-gray-400 rounded-full  hover:bg-gray-100 flex items-center gap-2 transition"
      >
        <span>Login</span>
        <FaArrowRight className="text-sm" />
      </button>

       
        </div>
      </div>

      {/* Auth Dialog */}
      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
}
