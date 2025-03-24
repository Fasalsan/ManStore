// Login.js
import React, { useState } from 'react';
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
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
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

  const style = {
    backgroundImage: `url(${mybg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "",
    width: "100%",
  };

  return (
    <div style={style} className="h-screen flex">
    <div className="w-full flex flex-row-reverse justify-center items-center">
      {loading ? (
        <Loading /> 
      ) : (
        <div className="bg-[#f6f6fd] w-[30%] px-6 py-9 rounded-2xl shadow-2xl">
          <div className="flex justify-center w-full items-center pb-7">
            <h1 className="text-2xl font-bold text-[#163c82]">Login</h1>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          
          <form className="flex flex-col gap-4 items-center" onSubmit={handleLogin}>
            <input
              className={FormInputStyle}
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={FormInputStyle}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-[#163c82] px-7 py-2 text-white rounded-lg"
              type="submit"
            >
              Login
            </button>
          </form>

          <div className="flex gap-4 pt-2 justify-end items-center">
            No account? <a href="/register" className="text-blue-600">Sign Up</a>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}

export default Login;
