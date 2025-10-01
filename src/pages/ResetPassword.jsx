import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const {backendUrl} = useContext(AppContext)
  axios.defaults.withCredentials = true
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);
  const [loading, setLoading] = useState(false);

  // handle OTP input changes
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // only digits
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1].focus();
    }
  };
  // handle backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  // handle paste event
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
  const onSubmitEmail = async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(backendUrl+'/api/auth/send-reset-otp',{email})
      data.success?toast.success(data.message):toast.error(data.message)
      data.success && setIsEmailSent(true)
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
}

  }
  const onSubmitOTP = async(e)=>{
     e.preventDefault();
    const otpValue = otp.join("");
    setOtp(otp);  // keep it as array
    setIsOtpSubmited(true);
  }
  const onChngingPassword = async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(backendUrl+'/api/auth/reset-password',{email, 
        otp: otp.join(""),   // ✅ convert array -> string
        newPassword: password })
      data.success?toast.success(data.message):toast.error(data.message)
      data.success && navigate('/login')
    } catch (error) {
      toast.error(error.message)
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col gap-6 items-center md:max-w-[423px] w-[380px] bg-white rounded-2xl shadow-lg p-6 sm:p-10">
        {/* Step 1: Enter email */}
{!isEmailSent && (
  <form
    onSubmit={onSubmitEmail}
    className="w-full flex flex-col gap-4"
  >
    <div className="relative w-full">
      <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="Email"
        required
        className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-xl 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
        transition-all duration-200 bg-gray-50 focus:bg-white"
      />
    </div>

    <button
      type="submit"
      className="w-full h-11 rounded-full text-white text-sm bg-indigo-500 hover:opacity-90 transition-opacity"
    >
      Send OTP
    </button>
  </form>
)}
        {/* Step 2: Enter OTP */}
        {!isOtpSubmited && isEmailSent && (
          <form onSubmit={onSubmitOTP} className="mt-6 w-full">
            <p className="text-sm text-blue-500 mb-2">
              Enter the 6-digit OTP sent to your email
            </p>
            <div
              className="grid grid-cols-6 gap-2 sm:gap-3 w-full"
              onPaste={handlePaste}
            >
              {otp.map((val, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  ref={(el) => (otpRefs.current[i] = el)}
                  value={val}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-full h-12 bg-indigo-50 text-gray-900 text-xl 
                  rounded-md outline-none text-center focus:ring-2 focus:ring-indigo-500"
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full h-11 rounded-full text-white font-medium 
              text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 transition-colors 
              disabled:opacity-50 shadow-md"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {/* Step 3: Enter new password */}
        {isOtpSubmited && isEmailSent && (
          <form
            onSubmit={onChngingPassword}
            className="relative w-full"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MdLock className="text-gray-400 text-lg" />
            </div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter new password"
              required
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
              transition-all duration-200 bg-gray-50 focus:bg-white"
            />
            <button
              type="submit"
              className="mt-4 w-full h-11 rounded-full text-white text-sm bg-indigo-500 hover:opacity-90 transition-opacity"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
