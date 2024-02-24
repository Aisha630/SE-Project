import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Paper, Grid, TextField, Button, Typography, Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../stores/authSlice';
import '../css/login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const useStyles = makeStyles((theme) => ({
  // ... other styles
  logo: {
    margin: 'auto',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    width: theme.spacing(7), // Adjust the size as necessary
    height: theme.spacing(7), // Adjust the size as necessary
  },
  // ... other styles
}));


const Login = () => {
  const classes = useStyles();
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

  // return (
  //   <div className="login-container">
  //     <form className="login-form" onSubmit={handleSubmit}>
  //       <input
  //         type="text"
  //         name="username"
  //         placeholder="Username"
  //         value={username}
  //         onChange={handleChange}
  //       />
  //       <div className="password-input-container">
  //         <input
  //           type={showPassword ? "text" : "password"}
  //           name="password"
  //           placeholder="Password"
  //           value={password}
  //           onChange={handleChange}
  //         />
  //         <i
  //           onClick={() => setShowPassword(!showPassword)}
  //           className={`password-icon fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
  //         />
  //       </div>
  //       <button type="submit" className="login-button">Login</button>
  //       <p className="signup-link">
  //         Not a member? <Link to="/signup">Sign up now</Link>
  //       </p>
  //     </form>
  //   </div>
  // );

  return (<div className={classes.root}>
    <Grid container alignItems="center" justify="center">
      <Paper className={classes.paper} elevation={3}>
        <Avatar alt="Website Logo" src={logo.png} className={classes.logo} />
        <Typography variant="h5" gutterBottom>
          Second Time Around
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField label="Username" variant="outlined" className={classes.input} />
          <TextField label="Password" variant="outlined" type="password" className={classes.input} />
          <TextField label="Email" variant="outlined" type="email" className={classes.input} />
          <Button variant="contained" color="primary" className={classes.button}>
            Sign up
          </Button>
        </form>
        <Typography className={classes.footer}>
          Already a user? <Link href="#">Log in</Link>
        </Typography>
      </Paper>
    </Grid>
  </div>
  );
  // return (
  //   <div className="login-form-container">
  //     <form onSubmit={handleSubmit}>
  //       <div className="form-header">
  //         <h1>Second Time Around</h1>
  //       </div>
  //       <div className="form-body">
  //         {/* Input fields */}
  //         <input type="text" placeholder="Username" />
  //         <input type="password" placeholder="Password" />
  //         <input type="email" placeholder="Email Address" />
  //         {/* Other form fields */}
  //         <button type="submit">Sign up</button>
  //       </div>
  //       <div className="form-footer">
  //         <span>Already a user? <a href="/login">Log in</a></span>
  //       </div>
  //     </form>
  //   </div>
  // );
};

export default Login;
