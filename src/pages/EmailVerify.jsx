import React, { useContext, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from "react-hot-toast";
import { AppContext } from '../context/AppContext';

function EmailVerify() {
  axios.defaults.withCredentials = true;
  const { backendUrl, setIsLoggedin } = useContext(AppContext);

  const otpRefs = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || localStorage.getItem("verifyEmail") || "";
  const userId = location.state?.userId || localStorage.getItem("verifyUserId") || "";

  // Handle OTP input
  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    if (idx < 5 && value) otpRefs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('Text').slice(0, 6).split('');
    const newOtp = [...otp];
    pasteData.forEach((char, idx) => {
      if (otpRefs.current[idx]) {
        newOtp[idx] = char;
      }
    });
    setOtp(newOtp);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length < 6) {
      toast.error("Please enter the complete OTP.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { userId, otp: otpValue });
     if (data.success) {
      toast.success(data.message);
      localStorage.removeItem("verifyEmail");
      localStorage.removeItem("verifyUserId");
      setIsLoggedin(false); // ✅ force login step, don't mark logged in yet
      navigate('/login');   // go to login
}
 else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <p className="text-sm text-blue-500">Enter the 6-digit OTP sent to your email</p>
      <form onSubmit={handleVerify} className="mt-6">
        <div className="grid grid-cols-6 gap-2 sm:gap-3 w-full" onPaste={handlePaste}>
          {Array(6)
            .fill("")
            .map((_, i) => (
              <input
                key={i}
                required
                type="text"
                maxLength="1"
                ref={(el) => (otpRefs.current[i] = el)}
                value={otp[i]}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center focus:ring-2 focus:ring-indigo-500"
              />
            ))}
        </div>
        <button
          type="submit"
          className="mt-6 w-full h-11 rounded-full text-white text-sm bg-indigo-500 hover:opacity-90 transition-opacity"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </form>
    </div>
  );
}

export default EmailVerify;