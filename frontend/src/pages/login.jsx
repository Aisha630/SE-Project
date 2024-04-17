import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../stores/authSlice.js';
import { Box, Button, TextField, ThemeProvider, IconButton, InputAdornment, Link, Grid, useMediaQuery, Typography, FormControlLabel, FormGroup, Checkbox, } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import theme from '../themes/authThemes.js';
import '../css/login.css';
// import TypingEffect from '../components/typing.jsx';
import { usePasswordValidation } from '../hooks/usePasswordValidation.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Login = () => {

	const [credentials, setCredentials] = useState({ username: '', password: '' }); // This is login state credentials
	const [resetCredentials, setResetCredentials] = useState({ reset_token: '', newPassword: '', reset_email: '' }); // This is state for the credentials for resetting password
	const [resetEmail, setResetEmail] = useState(false) // This is the state for taking email for resetting password
	const [showPassword, setShowPassword] = useState(false);
	const [reset, setReset] = useState(false); // This corresponds to taking reset token and new password
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const passwordGuidelines = usePasswordValidation(resetCredentials.newPassword);
	const md = useMediaQuery(theme.breakpoints.down('md'));
	const allTrue = obj => Object.values(obj).every(value => value);
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

	useEffect(() => {
		sessionStorage.removeItem('persist:root')
	}, [credentials])

	const handleChange = (e, func) => func(prev => ({ ...prev, [e.target.name]: e.target.value }));
	const togglePassword = () => setShowPassword(!showPassword);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (resetEmail) {
				fetch('https://api.secondtimearound.xyz/forget_password', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email: resetCredentials.reset_email })
				},
				).then(res => { return res.json() }).then(data => {
					if (data.error) { setLoading(false); toast.error(data.error); setReset(false); setResetEmail(false); return; }
					setReset(true); setResetEmail(false); toast.success(data.message); setLoading(false);
				}).catch(err => { console.error(err); setLoading(false); }).finally(() => { setLoading(false); });
			}
			else if (reset) {
				if (allTrue(passwordGuidelines)) {
					fetch(`https://api.secondtimearound.xyz/reset_password`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ resetToken: resetCredentials.reset_token, newPassword: resetCredentials.newPassword })

					}).then(res => { return res.json() }).then(data => {
						if (data.error) { toast.error(data.error); setLoading(false); return; }
						setReset(false); toast.success(data.message); setLoading(false);
					}).catch(err => { console.error(err); setLoading(false); });
				}
				else {
					toast.error("Please fulfill all password guidelines")
				}
			}
			else {
				await dispatch(loginUser(credentials)).unwrap();
				navigate("/");
			}
		} catch (error) {
			console.error('Failed to login:', error);
			toast.error(error);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Grid style={{
				minHeight: '100vh',
				width: '100%',
				backgroundImage: "url('login.svg')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				maxWidth: "100%",
			}}>
				<Box sx={{ // filter on background to make it less bright
					minHeight: '100vh',
					width: '100%',
					backgroundColor: 'rgba(0, 0, 0, 0.2)',
				}}>
					<Grid item xs={12} sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", p: 3 }}>
							<img src="/sta_logo2.png" alt="Logo" style={{ height: '40px' }} />
					</Grid>

					{/* The following grid item is for the sign up form and corresponding text*/}
					<Grid container spacing={1} data-aos="fade-up" sx={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", pt:10}}>

						{/* Shop text */}
						<Grid item sm={12} md={6} lg={5} sx={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", textAlign: "left", marginRight: "8rem"}}>
							<Typography variant="h3" sx={{ color: "white", maxWidth: "90%", mb: 2, fontWeight: 'medium' }}> Welcome to Second Time Around!</Typography>
							<Typography color="white" variant="h6" sx={{ maxWidth: "70%" }} >One-stop shop for Pre-loved products to buy, sell, donate, or even auction...
							</Typography>
						</Grid> 


						<Grid item xs={12} sm={11} md={5} lg={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center", pb:5 }}>
							{/* Login box background */}
							<Box sx={{
								backgroundColor: theme.palette.secondary.dark,
								padding: 7, borderRadius: theme.shape.borderRadius,
								boxShadow: theme.shadows[1], display: "flex", flexDirection: "column", justifyContent: "stretch", alignItems: "stretch"
							}}>
								{/* Login form */}
								<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%', }}>
									{resetEmail ? <></> :
										<>
											{/* Username/Reset token fields */}
											<TextField margin="normal" required fullWidth id={reset ? "reset_token" : "username"} label={reset ? "Reset Token" : "Username"} name={reset ? "reset_token" : "username"} value={reset ? resetCredentials.reset_token : credentials.username} onChange={() => { reset ? handleChange(event, setResetCredentials) : handleChange(event, setCredentials) }} variant="filled" sx={{ input: "#587E6A", }} />

											{/* Password/New passwords fields */}
											<TextField margin="normal" required fullWidth id={reset ? "newPassword" : "password"} label={reset ? "New Password" : "Password"} name={reset ? "newPassword" : "password"} type={showPassword ? 'text' : 'password'}
												value={reset ? resetCredentials.newPassword : credentials.password} onChange={() => { reset ? handleChange(event, setResetCredentials) : handleChange(event, setCredentials) }} autoComplete="current-password" variant="filled"
												InputProps={{ // Password visibility toggle
													endAdornment: (
														<InputAdornment position="end">
															<IconButton aria-label="toggle password visibility" onClick={togglePassword}>
																{showPassword ? <VisibilityOff /> : <Visibility />}
															</IconButton>
														</InputAdornment>
													),
												}} />
											{reset && <FormGroup>
												{Object.entries(passwordGuidelines).map(([key, isFulfilled]) => (
													<FormControlLabel key={key} control={<Checkbox checked={isFulfilled} disabled sx={{ margin: 0, padding: "5px 5px 2px 10px", }} />} label={key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')} sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.75rem', } }} />
												))}
											</FormGroup>}

											{/* Login/Reset button */}
											{!reset &&
												<Box textAlign="left" sx={{ mt: 1 }}>
													<Link href="#" variant="body2" sx={{ color: "#4a6a59", '&:hover': { color: "#4a6a59", textDecorationColor: "#4a6a59", textDecoration: 'underline' }, textDecorationColor: "black", textDecoration: 'none' }} onClick={() => { setResetEmail(!resetEmail) }}>
														Forgot password?
													</Link>
												</Box>
											}
											<Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: "#6A9B81", color: "black", '&:hover': { backgroundColor: "#587E6A" }, width: "50%" }}>
												{reset ? "Reset Password" : "Log In"}
											</Button>

											{/* link back to login page. Only renders when user is on Reset Password page */}
											{
												(reset) &&
												<Box textAlign="center" sx={{ mb: 1 }}>
													<Link href="/login" variant="body2" sx={{ color: "black", '&:hover': { color: "#4a6a59", textDecorationColor: "#4a6a59", }, textDecorationColor: "black", }} onClick={() => { setReset(false); setResetCredentials(false) }}>
														Take me to login page
													</Link>
												</Box>

											}

											{/* Signup/Forgot password links */}
											{!reset &&
												<>
													<Box textAlign="center" sx={{ mb: 1, }}>
														<Typography variant='body2' component={'span'} >
															Not a member? { }
														</Typography>
														<Link href="/signup" variant="body2" sx={{ color: "#4a6a59", '&:hover': { color: "#4a6a59", textDecorationColor: "#4a6a59", textDecoration: 'underline' }, textDecorationColor: "black", textDecoration: 'none' }}>
															Sign up now!
														</Link>
													</Box>

												</>}
										</>}

									{/* The email input field for reset password and button */}
									{resetEmail &&
										<>
											<TextField margin="normal" required fullWidth id="reset_email" label="LUMS Email" name="reset_email"
												value={resetCredentials.reset_email} onChange={() => { handleChange(event, setResetCredentials) }} variant="filled" sx={{ input: "#4a6a59", }} />
											<Button type="submit" variant="contained" disabled={loading} sx={{ mt: 3, mb: 2, backgroundColor: "#6A9B81", color: "black", '&:hover': { backgroundColor: "#587E6A" }, width: "50%" }}>
												{"Send reset email"}
											</Button>
											<br />

											{
												loading ? <Typography variant="caption" textAlign="center" sx={{ color: "gray", lineHeight: "0.75em" }}> Sending reset email to the provided email address
												</Typography> : <></>
											}
										</>
									}
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</ThemeProvider>
	);
};

export default Login;

