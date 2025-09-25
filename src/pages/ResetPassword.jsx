import { useRef } from "react";

export default function ResetPassword() {
  const otpRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col gap-6 items-center md:max-w-[423px] w-[380px] bg-white rounded-2xl shadow-lg p-6 sm:p-10">
        <div className="w-full">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="••••••"
            className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <p className="text-sm text-blue-500">Enter the 6-digit OTP sent to your email</p>
        {/* OTP Inputs */}
        <div className="grid grid-cols-6 gap-2 sm:gap-3 w-full ">
          {Array(6)
            .fill("")
            .map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                ref={(el) => (otpRefs.current[i] = el)}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-full h-12 bg-indigo-50 text-gray-900 text-xl rounded-md outline-none text-center focus:ring-2 focus:ring-indigo-500"
              />
            ))}
        </div>

        <button
          type="button"
          className="mt-6 w-full h-11 rounded-full text-white text-sm bg-indigo-500 hover:opacity-90 transition-opacity"
        >
          Verify Email
        </button>
      </div>
    </div>
  );
}
