import React, { useContext, useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";

function EmailVerify() {
  axios.defaults.withCredentials = true;
  const { backendUrl, getUserData, userData, isLoggedin } =
    useContext(AppContext);

  const navigate = useNavigate();
  const otpRefs = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Handle OTP input
  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    if (value && idx < 5) {
      otpRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("Text").slice(0, 6).split("");
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
    try {
      setLoading(true);
      const otpValue = otp.join("");
      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp: otpValue }
      );

      if (data.success) {
        toast.success(data.message || "Email verified successfully");
        await getUserData();
        navigate("/");
      } else {
        toast.error(data.message || "Failed to verify email");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify email");
    } finally {
      setLoading(false);
    }
  };

  // Redirect if already verified
  useEffect(() => {
    if (isLoggedin && userData?.isAccountVerified) {
      navigate("/");
    }
  }, [isLoggedin, userData, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Verify Your Email
        </h2>
        <p className="mt-2 text-center text-gray-600 text-sm">
          Enter the 6-digit OTP sent to your email
        </p>

        <form onSubmit={handleVerify} className="mt-6">
          <div
            className="flex justify-between gap-2 sm:gap-3"
            onPaste={handlePaste}
          >
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
                  className="w-10 h-12 sm:w-12 sm:h-14 bg-gray-100 text-gray-900 text-lg sm:text-xl rounded-lg outline-none text-center focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
              ))}
          </div>

          <button
            type="submit"
            className="mt-6 w-full h-11 rounded-full text-white font-medium text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-50 shadow-md"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmailVerify;
