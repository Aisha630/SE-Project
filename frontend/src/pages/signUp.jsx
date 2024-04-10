import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { signupUser } from '../stores/authSlice.js';
import { Box, Button, Grid, TextField, Typography, ThemeProvider, IconButton, InputAdornment, Link, FormControlLabel, FormGroup, Checkbox, useMediaQuery } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../css/login.css';
import theme from '../themes/authThemes.js';
import { usePasswordValidation } from '../hooks/usePasswordValidation.js';
import TypingEffect from '../components/typing.jsx';

const SignUp = () => {
	const [formData, setFormData] = useState({ email: '', username: '', password: '' });
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [signUp, setSignUp] = useState(false);

	const dispatch = useDispatch();
	const md = useMediaQuery(theme.breakpoints.down('md'));
	const allTrue = obj => Object.values(obj).every(value => value); // Check if all values in an object are true

	const handleChange = ({ target: { name, value } }) => setFormData({ ...formData, [name]: value });
	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	useEffect(()=>{
		sessionStorage.removeItem('persist:root')
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		if (allTrue(passwordGuidelines)) {
			dispatch(signupUser(formData)).unwrap()
				.then(() => toast.success("Please verify your email address."))
				.catch((error) => { setSignUp(false); toast.error(error) })
				.finally(() => setIsLoading(false));
		}
		else {
			toast.error("Password does not meet the requirements");
			setIsLoading(false);
			setSignUp(false);
		}
	};

	const resendVerificationEmail = () => {
		setIsLoading(true);
		fetch(`http://localhost:5003/resend_code`, {
			method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: formData.email }),
		})
			.then((res) => res.ok ? toast.success("Email sent successfully") : toast.error("Error sending email"))
			.catch((error) => { setSignUp(false); toast.error("Error", error) })
			.finally(() => setIsLoading(false));
	};

	const passwordGuidelines = usePasswordValidation(formData.password);

	return (
		<ThemeProvider theme={theme}>
			{/* The following div is for the background image */}
			<div style={{
				minHeight: '100vh',
				width: '100vw',
				backgroundImage: "url('Group 6.svg')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundAttachment: "fixed",
				overflowY: 'auto',
			}}>
				{/* The following div is for the background overlay to darken the bg */}
				<Box sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '100vh',
					width: '100%',
					backgroundColor: 'rgba(0, 0, 0, 0.2)',
				}}>
					<Grid container spacing={1} sx={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', }}>

						{/* Shop text */}
						{!md ?
							<Grid item md={6} lg={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
								<TypingEffect text="Rediscover Hidden Gems on Campus!" speed={80} />
							</Grid> : <></>
						}

						<Grid item xs={12} sm={11} md={5} lg={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}>

							{/* Sign up form background */}
							<Box sx={{
								backgroundColor: theme.palette.secondary.dark,
								padding: 7, borderRadius: theme.shape.borderRadius,
								boxShadow: theme.shadows[1], display: "flex", flexDirection: "column", justifyContent: "stretch", alignItems: "stretch"
							}}>

								{/* Sign up form */}
								<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%', }}>

									{/* Sign up form fields */}
									<TextField margin="normal" required fullWidth id="username" label="Username" name="username"
										value={formData.username} onChange={handleChange} variant="filled" sx={{ input: "#084a08", }} />
									<TextField margin="normal" required fullWidth id="email" label="LUMS Email" name="email"
										value={formData.email} onChange={handleChange} variant="filled" sx={{ input: "#084a08", }} />
									<TextField margin="normal" required fullWidth id="password" label="Password" name="password" type={showPassword ? 'text' : 'password'}
										value={formData.password} onChange={handleChange} autoComplete="current-password" variant="filled"
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton aria-label="toggle password visibility" onClick={togglePasswordVisibility}>
														{showPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											),
										}} />

									{/* Password guidelines */}
									<FormGroup>
										{Object.entries(passwordGuidelines).map(([key, isFulfilled]) => (
											<FormControlLabel key={key} control={<Checkbox checked={isFulfilled} disabled sx={{ margin: 0, padding: "5px 5px 2px 10px", }} />} label={key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')} sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.75rem', } }} />
										))}
									</FormGroup>

									{/* Sign up button and links */}
									<Button type="submit" variant="contained" disabled={isLoading} onClick={() => setSignUp(true)} sx={{ mt: 2, mb: 2, backgroundColor: "#4a914d", color: "black", '&:hover': { backgroundColor: "#3e7840" }, width: "50%" }}>
										Sign Up
									</Button>

									<Typography textAlign="center">
										<Link href="/login" variant="body2" sx={{ color: "black", textDecorationColor: "black", '&:hover': { color: "#084a08", textDecorationColor: "#084a08" } }}>Already a member? Log in now!</Link>
										<br />

										{/* logic for resend verification email link and isloading state of email */}
										{signUp && (
											<Link
												onClick={!isLoading ? resendVerificationEmail : undefined}
												sx={{
													textDecorationColor: 'black',
													color: isLoading ? 'grey' : 'black',
													cursor: isLoading ? 'default' : 'pointer',
													'&:hover': isLoading ? {} : { color: '#084a08', textDecorationColor: '#084a08' },
												}}
												variant="body2"
											>
												{isLoading ? "Verifying details..." : "Didn't receive verification email? Click here to resend."}
											</Link>
										)}
									</Typography>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</div>
		</ThemeProvider>
	);
};

export default SignUp;
