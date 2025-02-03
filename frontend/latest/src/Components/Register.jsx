import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export default function Register() {
  const { addUser } = useContext(UserContext);

  const [username, setUsername] = useState('');

  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // State for displaying messages

  // ====> To Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass all necessary data to addUser
    addUser(username, email, password,  role)
      .then(() => {
        setMessage('User registered successfully!');
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Register</p>
        <p className="message">Signup now and get full access to our app.</p>
        {message && <p className="message">{message}</p>}
        <div className="flex">
          <label>
            <input
              className="input"
              type="text"
              placeholder="Enter your username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span>Username</span>
          </label>
        </div>
       
        <label>
          <input
            className="input"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span>Email</span>
        </label>
        <label>
          <input
            className="input"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span>Password</span>
        </label>
        <label>
          <input
            className="input"
            type="text"
            placeholder="Enter your role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
          <span>Role</span>
        </label>
        <button type="submit" className="submit">
          Submit
        </button>
        <p className="signin">
          Already have an account? <Link to="/Login">Signin</Link>
        </p>
      </form>
    </div>
  );
}
