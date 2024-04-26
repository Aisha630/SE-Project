import React, { useState, useEffect, } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { signupUser } from '../stores/authSlice.js';
import { Box, Button, Grid, TextField, Typography, ThemeProvider, IconButton, InputAdornment, Link, FormControlLabel, FormGroup, Checkbox, useMediaQuery } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../css/login.css';
import theme from '../themes/authThemes.js';
import { usePasswordValidation } from '../hooks/usePasswordValidation.js';
import TypingEffect from '../components/typing.jsx';
import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const SignUp = () => {
	const [formData, setFormData] = useState({ email: '', username: '', password: '', gender: '' });
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [signUp, setSignUp] = useState(false);
	const [signupToken, setSignupToken] = useState({ reset_token: '' }); // This is state for the credentials for resetting password
	const [gender, setGender] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const md = useMediaQuery(theme.breakpoints.down('md'));
	const allTrue = obj => Object.values(obj).every(value => value); // Check if all values in an object are true

	const handleChange = ({ target: { name, value } }) => {
		if (!signUp) setFormData({ ...formData, [name]: value });
		else setSignupToken({ ...signupToken, [name]: value });
	};

	const handleGenderChange = (event) => {
		setGender(event.target.value);
		setFormData({ ...formData, gender: event.target.value });
	  };

	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	useEffect(() => {
		sessionStorage.removeItem('persist:root')
	}, [])

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);
		if (!signUp) {
			if (!formData.gender) {
				toast.error("Please select a gender");
				setIsLoading(false);
				setSignUp(false);
				return;
			}
			if (allTrue(passwordGuidelines)) {
				dispatch(signupUser(formData)).unwrap()
					.then(() => {
						toast.success("Please verify your email address.");
						setSignUp(true);
					})
					.catch((error) => { setSignUp(false); toast.error(error) })
					.finally(() => setIsLoading(false));
			}
			else {
				toast.error("Password does not meet the requirements");
				setIsLoading(false);
				setSignUp(false);
			}
		}
		else {
			const res = await fetch(`http://localhost:5003/verify`, {
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token: signupToken.reset_token }),
			})

			const data = await res.json();
			if (res.status === 200) {
				toast.success(data.message);
				navigate('/login');
			} else {
				toast.error(data.error);
			}
			setIsLoading(false);

		}
	}

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
									{signUp ? (
										<TextField margin="normal" required fullWidth id="reset_token" label="Verification Code" name="reset_token" value={signupToken.reset_token} onChange={handleChange}/>
									) : (
										<>
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
											<Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          									<FormLabel component="legend" sx={{ marginRight: 2 }}>Gender:</FormLabel>
          									<RadioGroup
          									  row
          									  aria-label="gender"
          									  name="gender"
          									  value={formData.gender}
          									  onChange={handleChange}
          									>
          									  <FormControlLabel value="girl" control={<Radio />} label="Female" />
          									  <FormControlLabel value="boy" control={<Radio />} label="Male" />
          									</RadioGroup>
        									</Box>
											
										</>)}

										

									{/* Sign up button and links */}
									<Button type="submit" variant="contained" disabled={isLoading} sx={{ mt: 2, mb: 2, backgroundColor: "#4a914d", color: "black", '&:hover': { backgroundColor: "#3e7840" }, width: "50%" }}>
										Sign Up
									</Button>

									<Typography textAlign="center">
										{!isLoading && !signUp &&
											<>
											<Typography variant='body2' component={'span'}>Already a member? {}</Typography>
												<Link href="/login" variant="body2" sx={{ color: "#084a08", textDecorationColor: "black", '&:hover': { color: "#084a08", textDecorationColor: "#084a08", textDecoration:'underline' }, textDecoration:'none' }}>
													Log in now!
													</Link>
												<br />
											</>
										}
										{(!signUp && isLoading) &&
											<>
												<Typography variant="body2" sx={{ color: "gray",}}>Verifying details</Typography>
												<br />
											</>
										}

										{/* logic for resend verification email link and isloading state of email */}
										{signUp && (
											<>
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
													{isLoading ? " Loading..." : "Click here to resend token."}
												</Link>
											</>
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
