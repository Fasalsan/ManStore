// Login.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/shared/Loading';
import { Config } from '../util/config';
import axios from 'axios';
import FormInputStyle from '../components/styel/formInputStyel';
import mybg from '.././components/image/mybg.jpg'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const response = await axios.post(
        `${Config.base_url}UserLogin`,
        { email, password },
        { timeout: 20000 } // <-- Timeout added here
      );
  
      const { token, user } = response.data;
  
      localStorage.setItem("authToken", token);
      console.log("Logged in user:", user);
  
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
  
      if (error.code === 'ECONNABORTED') {
        setError("Request timed out. Please try again.");
      } else if (error.response) {
        setError(error.response.data.message || "Login failed");
      } else {
        setError("Network error. Please try again.");
      }
  
      navigate("/");
    }
  };
  


  return (
    <div className="h-screen flex">
      <div className="w-full flex flex-row-reverse justify-center items-center">
        {loading ? (
          <Loading />
        ) : (
          <div
            className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: 'url("https://png.pngtree.com/thumb_back/fh260/background/20210903/pngtree-clothing-store-casual-fashion-mens-photography-photos-with-pictures-image_796891.jpg")' }}
          >
            <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm transition-all duration-500"></div>

            <div className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/30">
              <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label htmlFor="email" className="block text-sm text-white mb-1">
                    Email
                  </label>
                  <input
                    type="gmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={FormInputStyle}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm text-white mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={FormInputStyle}
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 bg-white/80 text-black hover:bg-white font-semibold py-2 rounded-xl"
                >
                  Sign In
                </button>
              </form>

              <p className="text-sm text-white text-center mt-4">
                Don't have an account?{' '}
                <a href="/register" className="text-white underline hover:text-blue-200">
                  Register here
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
