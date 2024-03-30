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
  const [formData, setFormData] = useState({ email: '', username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [signUp, setSignUp] = useState(false);

  const handleChange = ({ target: { name, value } }) => setFormData({ ...formData, [name]: value });
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(signupUser(formData)).unwrap()
      .then(() => toast.success("Please verify your email address."))
      .catch((error) => toast.error(error))
      .finally(() => setIsLoading(false));
  };

  const resendVerificationEmail = () => {
    setIsLoading(true);
    fetch(`http://localhost:5003/resend_code?email=${formData.email}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: formData.email }),
    })
      .then((res) => res.ok ? toast.success("Email sent successfully") : toast.error("Error sending email"))
      .catch((error) => toast.error("Error", error))
      .finally(() => setIsLoading(false));
  };

  const passwordGuidelines = usePasswordValidation(formData.password);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box sx={{ backgroundColor: theme.palette.secondary.main, padding: theme.spacing(7.5), borderRadius: theme.shape.borderRadius, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: theme.shadows[1] }}>
          <Box component="img" src="sta_logo.png" alt="STA Logo" sx={{ width: "60%" }} />
          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>Second Time Around</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField margin="normal" required fullWidth id="username" label="Username" name="username" value={formData.username} onChange={handleChange} variant="filled" />
            <TextField margin="normal" required fullWidth id="email" label="LUMS Email Address" name="email" value={formData.email} onChange={handleChange} variant="filled" />
            <TextField margin="normal" required fullWidth id="password" label="Password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} variant="filled"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <FormGroup>
              {Object.entries(passwordGuidelines).map(([key, isFulfilled]) => (
                <FormControlLabel key={key} control={<Checkbox checked={isFulfilled} disabled sx={{margin: 0, padding: "5px 5px 2px 10px",}}/>} label={key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')} sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.75rem' } }} />
              ))}
            </FormGroup>
            <Button type="submit" variant="contained" disabled={isLoading} onClick={() => setSignUp(true)} sx={{ mt: 2, mb: 2, backgroundColor: "primary.main", color: "black", '&:hover': { backgroundColor: "primary.dark" }, width: "50%" }}>
              Sign Up
            </Button>
            <Typography textAlign="center">
              <Link href="/login" variant="body2" sx={{ color:"black",textDecorationColor: "black", '&:hover': { color: "green", textDecorationColor: "green" } }}>Already a member? Log in now!</Link>
              <br />
              {signUp && (
                <Link
                  onClick={!isLoading ? resendVerificationEmail : undefined}
                  sx={{
                    textDecorationColor: 'black' ,
                    color: isLoading ? 'grey' : 'black',
                    cursor: isLoading ? 'default' : 'pointer',
                    '&:hover': isLoading ? {} : { color: 'green', textDecorationColor: 'green' },
                  }}
                  variant="body2"
                >
                  {isLoading ? "Sending..." : "Didn't receive verification email? Click here to resend."}
                </Link>
              )}


            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
