import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export default function Login() {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null); // State for error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    try {
      await login(email, password);
      // If login is successful, the context's login function should handle navigation
    } catch (err) {
      setError(err.message || "An error occurred during login."); // Set the error message
      console.error("Login error:", err); // Log the error for debugging
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100"> {/* Added background color */}
      <div className="w-[40%] bg-white p-8 rounded-xl shadow-md"> {/* Added padding and shadow */}
        <h3 className="text-2xl font-bold mb-6 text-center">Login</h3> {/* Centered title */}

        {error && ( // Display error message if it exists
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4"> {/* Reduced margin */}
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email" // Changed to email input type
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign in
          </button>

          <div className="mt-4 text-center"> {/* Centered link */}
            Not yet registered?{' '}
            <Link to="/Register" className="text-orange-500 hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}