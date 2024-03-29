import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../stores/authSlice.js';
import { Box, Button, Container, TextField, Typography, ThemeProvider, IconButton, InputAdornment, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import theme from '../themes/authThemes.js';
import '../css/login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const togglePassword = () => setShowPassword(!showPassword);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(credentials)).unwrap();
      navigate("/");
    } catch (error) {
      console.error('Failed to login:', error);
      toast.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh',
      }}>
        <Box sx={{
          backgroundColor: theme.palette.secondary.main, padding: theme.spacing(9), borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[1],
        }}>
          <Box component="img" src="sta_logo.png" alt="STA Logo" sx={{ width: "60%", height: 'auto' }} />
          <Typography component="h6" variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>Second Time Around</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField margin="normal" required fullWidth id="username" label="Username" name="username"
              value={credentials.username} onChange={handleChange} variant="filled" sx={{ input: "green" }} />
            <TextField margin="normal" required fullWidth id="password" label="Password" name="password" type={showPassword ? 'text' : 'password'}
              value={credentials.password} onChange={handleChange} autoComplete="current-password" variant="filled"
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
              Log In
            </Button>
            <Box textAlign="center">
              <Link href="/signup" variant="body2" sx={{ color: "black", '&:hover': { color: "green", textDecorationColor: "green", }, textDecorationColor: "black", }}>
                Not a member? Sign up now!
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;










