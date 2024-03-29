import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { signupUser } from '../stores/authSlice.js';
import { Box, Button, Container, TextField, Typography, ThemeProvider, IconButton, InputAdornment, Link, FormControlLabel, FormGroup, Checkbox } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../css/login.css';
import theme from '../themes/authThemes.js';
import { usePasswordValidation } from '../hooks/usePasswordValidation.js';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });
  const { email, username, password } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const passwordGuidelines = usePasswordValidation(password);
  const dispatch = useDispatch();

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
      .then((response) => {
        console.log("Signed up successfully", response);
        toast.success("Please verify your email address to complete the registration process.");
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
          backgroundColor: theme.palette.secondary.main, padding: theme.spacing(7.5), borderRadius: theme.shape.borderRadius,
          display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: theme.shadows[1],
        }}>
          <Box component="img" src="sta_logo.png" alt="STA Logo" sx={{ width: "60%", height: 'auto' }} />
          <Typography component="h6" variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>Second Time Around</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField margin="normal" required fullWidth id="username" label="Username" name="username"
              value={username} onChange={handleChange} variant="filled" />
            <TextField margin="normal" required fullWidth id="email" label="LUMS Email Address" name="email"
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
            <FormGroup >
              {Object.entries(passwordGuidelines).map(([key, isFulfilled]) => (
                <FormControlLabel
                  key={key}
                  control={<Checkbox checked={isFulfilled} disabled sx={{
                    margin: 0, padding: "5px 5px 2px 10px",
                    '& .MuiSvgIcon-root': {
                      fontSize: '1rem',
                    },
                  }} />}
                  label={key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')} sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: '0.75rem',
                    },
                  }}
                />
              ))}
            </FormGroup>
            <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2, backgroundColor: "primary.main", color: "black", '&:hover': { backgroundColor: "primary.dark" }, width: "50%" }}>
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
