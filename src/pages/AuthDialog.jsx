import React, { useContext, useState } from 'react'
import { MdPerson, MdEmail, MdLock } from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import toast from "react-hot-toast";

function AuthDialog() {
  const navigate = useNavigate()
  const { backendUrl, setIsLoggedin ,getUserData} = useContext(AppContext)
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    axios.defaults.withCredentials = true;
    if (state === 'Sign Up') {
  const res = await axios.post(backendUrl + '/api/auth/register', { name, email, password });
  if (res.data.success) {
    toast.success(res.data.message || "Registration successful! Please verify your email.");
    // store email and userId for verification step
    localStorage.setItem("verifyEmail", email);
    localStorage.setItem("verifyUserId", res.data.userId);
    navigate('/email-verify', { state: { email, userId: res.data.userId } });
  } else {
    toast.error(res.data.message);
  }
}
     else {
      const res = await axios.post(backendUrl + '/api/auth/login', { email, password });
      if (res.data.success) {
        setIsLoggedin(true);
        await getUserData(); // Wait for userData to be set
        toast.success("Login Successful ✅");
        navigate('/');
      } else {
        toast.error(res.data.message);
      }
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {state === 'Sign Up' ? 'Create account' : 'Sign in'}
          </h2>
          <p className="text-gray-600 text-sm">
            {state === 'Sign Up' ? 'Create your account' : 'Sign in to your account'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8">
          <div className="space-y-4">
            {state === 'Sign Up' && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MdPerson className="text-gray-400 text-lg" />
                </div>
                <input
                  onChange={e => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MdEmail className="text-gray-400 text-lg" />
              </div>
              <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MdLock className="text-gray-400 text-lg" />
              </div>
              <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              />
            </div>

            {state === 'Sign In' && (
              <div className="text-right">
                <p 
                  onClick={() => navigate('/reset-password')}
                  className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer transition-colors duration-200"
                >
                  Forgot password?
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {state}
            </button>
          </div>

          {/* Toggle between Sign Up and Sign In */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            {state === 'Sign Up' ? (
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <span
                  onClick={() => setState('Sign In')}
                  className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer transition-colors duration-200"
                >
                  Sign in 
                </span>
              </p>
            ) : (
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <span
                  onClick={() => setState('Sign Up')}
                  className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer transition-colors duration-200"
                >
                  Sign up 
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthDialog
