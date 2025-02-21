// Login.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/shared/Loading';
import { Config } from '../util/config';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // For navigation after login

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      // Send login request to API
      const response = await axios.post(`${Config.base_url}UserLogin`, {
        email,
        password,
      });

      // Extract token and user data from response
      const { token, user } = response.data;

      // Save the token (e.g., in localStorage for persistence)
      localStorage.setItem("authToken", token);

      console.log("Logged in user:", user);

      setLoading(false);
      // Redirect to dashboard or any protected route
      await navigate("/dashboard");
    } catch (error) {

      // Handle errors, e.g., invalid credentials
      if (error.response) {
        setLoading(false);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setError(error.response.data.message || "Login failed");
       
      } else {
        setError("Network error. Please try again.");
      }
    }
  };


  return (
    <div className='absolute bg-hero bg-no-repeat bg-cover w-full h-screen flex justify-center items-center '>
      {loading && (<Loading />)}
      <div className='bg-white w-[30%] px-6 py-9 rounded-2xl shadow-2xl'>


        <div className='flex justify-center items-center pb-7'>
          <h1 className='text-2xl font-medium text-orange-700'>Login</h1>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form
          className='flex flex-col gap-4 items-center blur-none z-0 relative'
          onSubmit={handleLogin}>
          <input
            className='border border-[#f5a65d] w-full px-4 py-2 focus:outline-none rounded-lg'
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='border border-[#f5a65d] w-full px-4 py-2 focus:outline-none rounded-lg'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className='bg-orange-700 px-7 py-2 text-white rounded-lg'
            type="submit">Login</button>
        </form>
        <div className='flex gap-4 pt-2 justify-end items-center'>No account ? <a href='/register' className='text-blue-600'> Sign Up</a></div>

      </div>
    </div>
  );
}

export default Login;
