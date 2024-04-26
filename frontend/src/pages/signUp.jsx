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
import FormLabel from '@mui/material/FormLabel';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SignUp = () => {
	const [formData, setFormData] = useState({ email: '', username: '', password: '', gender: '' });
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [signUp, setSignUp] = useState(false);
	const [signupToken, setSignupToken] = useState({ reset_token: '' }); // This is state for the credentials for resetting password
	const [gender, setGender] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();
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

	useEffect(() => {
		const timer = setTimeout(() => {
			AOS.init({
				duration: 1200,
				mirror: false,
			});
			AOS.refresh();
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	const passwordGuidelines = usePasswordValidation(formData.password);

	return (
		<ThemeProvider theme={theme}>
			{/* The following div is for the background image */}
			<Grid style={{
				minHeight: '100vh',
				width: '100%',
				backgroundImage: "url('login.svg')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				maxWidth: "100%",
			}}>
				{/* The following div is for the background overlay to darken the bg */}
				<Box sx={{
					minHeight: '100vh',
					width: '100%',
					backgroundColor: 'rgba(0, 0, 0, 0.2)',
				}}>
					{/* The following grid item is for the logo */}
					<Grid item xs={12} sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", p: 3 }}>
						<IconButton sx={{ ml: 1, m: 0, p: 0 }}>
							<img src="/sta_logo2.png" alt="Logo" style={{ height: '40px' }} />
						</IconButton>
					</Grid>

					{/* The following grid item is for the sign up form and corresponding text*/}
					<Grid container spacing={1} data-aos="fade-up" sx={{ position: 'relative',  width: '100%', height: '100%', display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", pt:5}}>

						{/* Shop text */}
						<Grid item sm={12} md={6} lg={5} sx={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", textAlign: "left", marginRight: "8rem"}}>
							<Typography variant="h3" sx={{ color: "white", maxWidth: "90%", mb: 2, fontWeight: 'medium' }}> Welcome to Second Time Around!</Typography>
							<Typography color="white" variant="h6" sx={{ maxWidth: "70%" }} >One-stop shop for Pre-loved products to buy, sell, donate, or even auction...
							</Typography>
						</Grid> 


						<Grid item xs={12} sm={10} md={5} lg={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center", pb:5}}>

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
										<TextField margin="normal" required fullWidth id="reset_token" label="Verification Code" name="reset_token" value={signupToken.reset_token} onChange={handleChange} />
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
													<FormControlLabel
														key={key}
														control={
															<Checkbox
																checked={isFulfilled}
																disabled
																sx={{
																	margin: 0,
																	padding: "5px 5px 2px 10px",
																	'& .MuiSvgIcon-root': {
																		fontSize: '1rem',
																	}
																}}
																size="small"
															/>
														}
														label={key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
														sx={{
															'& .MuiFormControlLabel-label': {
																fontSize: '0.70rem',
															}
														}}
													/>
												))}
											</FormGroup>
											
											{/* Gender */}
											<Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
												<FormLabel component="legend" sx={{ marginRight: 2, color: "#587E6A" }}>Gender:</FormLabel>
												<RadioGroup
													row
													aria-label="gender"
													name="gender"
													value={formData.gender}
													onChange={handleGenderChange}
												>
													<FormControlLabel value="girl" control={<Radio />} label="Female" />
													<FormControlLabel value="boy" control={<Radio />} label="Male" />
												</RadioGroup>
											</Box>

										</>)}

									{/* Sign up button and links */}
									<Button type="submit" variant="contained" disabled={isLoading} sx={{ mt: 2, mb: 2, backgroundColor: "#4a914d", color: "black", '&:hover': { backgroundColor: "#587E6A" }, width: "50%" }}>
										Sign Up
									</Button>

									<Typography textAlign="center">
										{!isLoading && !signUp &&
											<>
												<Typography variant='body2' component={'span'}>Already a member? { }</Typography>
												<Link href="/login" variant="body2" sx={{ color: "#084a08", textDecorationColor: "black", '&:hover': { color: "#084a08", textDecorationColor: "#084a08", textDecoration: 'underline' }, textDecoration: 'none' }}>
													Log in now!
												</Link>
												<br />
											</>
										}
										{(!signUp && isLoading) &&
											<>
												<Typography variant="body2" sx={{ color: "gray", }}>Verifying details</Typography>
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
			</Grid>
		</ThemeProvider>
	);
};

export default SignUp;
