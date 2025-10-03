import { useContext, useState, useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function Header() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, userData, setUserData } = useContext(AppContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout function
  const logout = async() => {
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl + '/api/auth/logout');
      data.success && setIsLoggedin(false);
      data.success && setUserData(false)
      navigate('/login')
    } catch (error) {
       toast.error(data.message || "Failed to logout");
    }
    setIsLoggedin(false);
    setUserData(null);
    navigate("/login");
    

    setDropdownOpen(false);
  };

  // Send verification OTP function
  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`);
      if (data.success) {
        toast.success(data.message || "OTP sent to your email");
        navigate("/email-verify");
        setDropdownOpen(false);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

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
          <div className="relative" ref={dropdownRef}>
            {/* User Initial */}
            <div
              className="h-8 w-8 flex items-center justify-center rounded-full bg-red-500 text-white font-bold text-lg cursor-pointer"
              title={userData.name}
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              {userData.name[0].toUpperCase()}
            </div>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border z-50">
                <ul className="py-2 text-sm text-gray-700">
                  {!userData.isAccountVerified && (
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={sendVerificationOtp} // ✅ call function on click
                    >
                      Verify Email
                    </li>
                  )}

                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500 font-medium"
                    onClick={logout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/login")}
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
