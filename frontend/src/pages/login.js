import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../stores/authSlice';
import '../css/login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { username, password } = credentials;
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials))
      .unwrap()
      .then(() => navigate("/"))
      .catch((error) => {
        console.error('Failed to login:', error);
        toast.error("Invalid credentials", {
          position: "top-center",
          autoClose: 5000,
          pauseOnHover: true,
        });
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleChange}
        />
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <i
            onClick={() => setShowPassword(!showPassword)}
            className={`password-icon fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        <p className="signup-link">
          Not a member? <Link to="/signup">Sign up now</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
