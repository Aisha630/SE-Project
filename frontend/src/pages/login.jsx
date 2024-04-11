import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../stores/authSlice.js';
import { Box, Button, TextField, ThemeProvider, IconButton, InputAdornment, Link, Grid, useMediaQuery, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import theme from '../themes/authThemes.js';
import '../css/login.css';
import TypingEffect from '../components/typing.jsx';


const Login = () => {

	const [credentials, setCredentials] = useState({ username: '', password: '' }); // This is login state credentials
	const [resetCredentials, setResetCredentials] = useState({ reset_token: '', newPassword: '', reset_email: '' }); // This is state for the credentials for resetting password
	const [resetEmail, setResetEmail] = useState(false) // This is the state for taking email for resetting password
	const [showPassword, setShowPassword] = useState(false);
	const [reset, setReset] = useState(false); // This corresponds to taking reset token and new password
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const md = useMediaQuery(theme.breakpoints.down('md'));

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
				fetch('http://localhost:5003/forget_password', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email: resetCredentials.reset_email })
				},
				).then(res => { return res.json() }).then(data => {
					if (data.error) { setLoading(false); toast.error(data.error); setReset(false); setResetEmail(false); return; }
					setReset(true); setResetEmail(false); toast.success(data.message); setLoading(false);
				}).catch(err => { console.error(err); setLoading(false); });
			}
			else if (reset) {
				console.log("The reset creds are ", resetCredentials);
				fetch(`http://localhost:5003/reset_password`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ resetToken: resetCredentials.reset_token, newPassword: resetCredentials.newPassword })

				}).then(res => { return res.json() }).then(data => {
					if (data.error) { toast.error(data.error); return; }
					setReset(false); toast.success(data.message);
				}).catch(err => { console.error(err) });
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
			<div style={{ // Page background
				minHeight: '100vh',
				width: '100vw',
				backgroundImage: "url('Group 6.svg')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundAttachment: "fixed",
				overflowY: 'auto',
			}}>
				<Box sx={{ // filter on background to make it less bright
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '100vh',
					width: '100%',
					backgroundColor: 'rgba(0, 0, 0, 0.2)',
				}}>
					<Grid container spacing={1} sx={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', }}>

						{!md ?
							<Grid item md={6} lg={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
								<TypingEffect text="Rediscover Hidden Gems on Campus!" speed={80} />
							</Grid> : <></>
						}

						<Grid item xs={12} sm={11} md={5} lg={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
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
											<TextField margin="normal" required fullWidth id={reset ? "reset_token" : "username"} label={reset ? "Reset Token" : "Username"} name={reset ? "reset_token" : "username"} value={reset ? resetCredentials.reset_token : credentials.username} onChange={() => { reset ? handleChange(event, setResetCredentials) : handleChange(event, setCredentials) }} variant="filled" sx={{ input: "#084a08", }} />

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

											{/* Login/Reset button */}
											<Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: "#4a914d", color: "black", '&:hover': { backgroundColor: "#3e7840" }, width: "50%" }}>
												{reset ? "Reset Password" : "Log In"}
											</Button>

											{/* link back to login page. Only renders when user is on Reset Password page */}
											{
												(reset) &&
												<Box textAlign="center" sx={{ mb: 1 }}>
													<Link href="/login" variant="body2" sx={{ color: "black", '&:hover': { color: "#084a08", textDecorationColor: "#084a08", }, textDecorationColor: "black", }} onClick={() => { setReset(false); setResetCredentials(false) }}>
														Take me to login page
													</Link>
												</Box>

											}

											{/* Signup/Forgot password links */}
											{!reset &&
												<>
													<Box textAlign="center" sx={{ mb: 1 }}>
														<Link href="/signup" variant="body2" sx={{ color: "black", '&:hover': { color: "#084a08", textDecorationColor: "#084a08", }, textDecorationColor: "black", }}>
															Not a member? Sign up now!
														</Link>
													</Box>
													<Box textAlign="center" sx={{ mb: 1 }}>
														<Link href="#" variant="body2" sx={{ color: "black", '&:hover': { color: "#084a08", textDecorationColor: "#084a08", }, textDecorationColor: "black", }} onClick={() => { setResetEmail(!resetEmail) }}>
															Forgot password? Reset here!
														</Link>
													</Box>
												</>}
										</>}

									{/* The email input field for reset password and button */}
									{resetEmail &&
										<>
											<TextField margin="normal" required fullWidth id="reset_email" label="LUMS Email" name="reset_email"
												value={resetCredentials.reset_email} onChange={() => { handleChange(event, setResetCredentials) }} variant="filled" sx={{ input: "#084a08", }} />
											<Button type="submit" variant="contained" disabled={loading} sx={{ mt: 3, mb: 2, backgroundColor: "#4a914d", color: "black", '&:hover': { backgroundColor: "#3e7840" }, width: "50%" }}>
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
			</div>
		</ThemeProvider>
	);
};

export default Login;

