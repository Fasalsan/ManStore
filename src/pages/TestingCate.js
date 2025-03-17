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
      const response = await axios.post(`${Config.base_url}UserLogin`, {
        email,
        password,
      });
  
      const { token, user } = response.data;
  
      // Save the token
      localStorage.setItem("authToken", token);
  
      console.log("Logged in user:", user);
  
      setLoading(false);
  
      // Redirect to dashboard on success
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
  
      // Show error message
      if (error.response) {
        setError(error.response.data.message || "Login failed");
      } else {
        setError("Network error. Please try again.");
      }
  
      // Explicitly redirect back to login (optional, you're already there)
      navigate("/");  // <- this line ensures you stay on login page
    }
  };
  

  

  const style = {
    backgroundImage: `url(${mybg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "",
    width: "100%",
  };

  return (

        <div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url("https://www.jovafurniture.com/js/htmledit/kindeditor/attached/20180830/20180830172123_26217.jpg")' }}
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
               type="text"
               name='email'
                className="w-full px-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your email"
              />
            </div>
    
            <div>
              <label htmlFor="password" className="block text-sm text-white mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
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
    
  );
}

export default Login;
