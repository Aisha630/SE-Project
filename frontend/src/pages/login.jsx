import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../stores/authSlice.js';
import { Box, Button, TextField, Typography, ThemeProvider, IconButton, InputAdornment, Link, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import theme from '../themes/authThemes.js';
import '../css/login.css';
import { useMediaQuery } from '@mui/material';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const md = useMediaQuery(theme.breakpoints.down('md'));

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
      <div style={{
        minHeight: '100vh', // Ensure at least full viewport height
        backgroundImage: "url('back1.webp')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        overflowY: 'auto', // Enable vertical scrolling
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4, // Adjust padding as needed, based on your design
          minHeight: '100vh', // Ensure Box takes at least full viewport height for centering
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Add a semi-transparent background
        }}>
          <Grid container spacing={1} sx={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', }}>
            {!md ?
              <Grid item xs={12} md={7} lg={7} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
                {/* <Typography variant="h3" color="white" gutterBottom>
              Welcome to Second Time Around!
            </Typography> */}
                <Typography variant="h4" color="white" gutterBottom sx={{ maxWidth: "50%" }}>
                  Rediscover Hidden Gems on Campus!
                </Typography>
              </Grid> : <></>}

            <Grid item xs={12} sm={12} md={5} lg={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
              <Box sx={{
                backgroundColor: theme.palette.secondary.dark,
                padding: 7, borderRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[1], display: "flex", flexDirection: "column", justifyContent: "stretch", alignItems: "stretch"
              }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%', }}>
                  <TextField margin="normal" required fullWidth id="username" label="Username" name="username"
                    value={credentials.username} onChange={handleChange} variant="filled" sx={{ input: "#084a08", }} />
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

                  <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: "#4a914d", color: "black", '&:hover': { backgroundColor: "#3e7840" }, width: "50%" }}>
                    Log In
                  </Button>
                  <Box textAlign="center" sx={{ mb: 1 }}>
                    <Link href="/signup" variant="body2" sx={{ color: "black", '&:hover': { color: "#084a08", textDecorationColor: "#084a08", }, textDecorationColor: "black", }}>
                      Not a member? Sign up now!
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Login;

