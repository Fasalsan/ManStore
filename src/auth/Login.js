import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../components/shared/Loading';
import { Config } from '../util/config';
import axios from 'axios';
import FormInputStyle from '../components/styel/formInputStyel';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${Config.base_url}UserLogin`,
        { email, password },
        { timeout: 20000 }
      );

      const { token, user } = response.data;

      localStorage.setItem('authToken', token);
      console.log('Logged in user:', user);

      setLoading(false);
      if (token) {
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (error) {
      setLoading(false);

      if (error.code === 'ECONNABORTED') {
        setError('Request timed out. Please try again.');
      } else if (error.response) {
        setError(error.response.data.message || 'Login failed');
      } else {
        setError('Network error. Please try again.');
      }
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
            style={{
              backgroundImage:
                'url("https://png.pngtree.com/thumb_back/fh260/background/20210903/pngtree-clothing-store-casual-fashion-mens-photography-photos-with-pictures-image_796891.jpg")',
            }}
          >
            <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm transition-all duration-500"></div>

            <div className="relative z-10 w-full max-w-md backdrop-blur-xl shadow-xl rounded-2xl p-8 border">
              <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label htmlFor="email" className="block text-sm text-white mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={FormInputStyle}
                    placeholder="Enter your email"
                    required
                    autoFocus
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
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 bg-white/80 text-black hover:bg-white font-semibold py-2 rounded-xl"
                >
                  Sign In
                </button>

                {/* Show error message if any */}
                {error && (
                  <p className="text-red-300 text-sm text-center mt-2">{error}</p>
                )}
              </form>

              <p className="text-sm text-white text-center mt-4">
                Don't have an account?{' '}
                <Link to="/register" className="text-white underline hover:text-blue-200">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
