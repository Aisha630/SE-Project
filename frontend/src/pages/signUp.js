import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signupUser } from '../stores/authSlice';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });
  const { email, username, password } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signupUser(formData))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error('Failed to sign up:', error);
        toast.error(error, {
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
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={email}
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
          ></i>
        </div>
        <button type="submit" className="login-button">Sign Up</button>
        <p className="signup-link">Already a member? <a href="/login">Log in now</a></p>
      </form>
    </div>
  );
}

export default SignUp;
