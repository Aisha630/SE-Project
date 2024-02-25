import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signupUser } from '../stores/authSlice';
import { Box, Button, Container, TextField, Typography, ThemeProvider, createTheme, IconButton, InputAdornment, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../css/login.css';
import theme from '/Users/aisha/Desktop/SE Pr/frontend/src/themes/authThemes.js';

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
  const togglePassword = () => setShowPassword(!showPassword);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signupUser(formData))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error('Failed to sign up:', error);
        toast.error(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh',
      }}>
        <Box sx={{
          backgroundColor: theme.palette.secondary.main, padding: theme.spacing(10), borderRadius: theme.shape.borderRadius,
          display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: theme.shadows[1],
        }}>
          <Box component="img" src="sta_logo.png" alt="STA Logo" sx={{ width: "60%", height: 'auto' }} />
          <Typography component="h6" variant="h6" sx={{ fontWeight: "bold" }}>Second Time Around</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField margin="normal" required fullWidth id="username" label="Username" name="username"
              value={username} onChange={handleChange} variant="filled" />
            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email"
              value={email} onChange={handleChange} variant="filled" />
            <TextField margin="normal" required fullWidth id="password" label="Password" name="password" type={showPassword ? 'text' : 'password'}
              value={password} onChange={handleChange} autoComplete="current-password" variant="filled"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={togglePassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }} />
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: "primary.main", color: "black", '&:hover': { backgroundColor: "primary.dark" }, width: "50%" }}>
              Sign Up
            </Button>
            <Box textAlign="center">
              <Link href="/login" variant="body2" sx={{ color: "black", '&:hover': { color: "green", textDecorationColor: "green", }, textDecorationColor: "black", }}>
                Already a member? Log in now!
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
