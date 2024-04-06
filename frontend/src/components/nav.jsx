import { AppBar, Toolbar, IconButton, Typography, Box, Button, Menu, MenuItem, Badge, Container } from '@mui/material';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLogout } from '../hooks/useLogout';
import { useSelector } from 'react-redux';
import ShoppingCartOverlayCard from './shoppingCartOverlayCard';
import { toast } from 'react-toastify';
import { useCart } from '../context/cartContext';
import { useMediaQuery } from '@mui/material';
import theme from '../themes/homeTheme';
import React from 'react';


const Nav = ({ Drawer, Search, ShowLogo = true, styles, pageOn = "Home" , setSearchProducts, setIsEmpty}) => {
    const navigate = useNavigate();
    const [isCartVisible, setIsCartVisible] = useState(false);
    const { cartItems, fetchCartItems } = useCart();
    const token = useSelector((state) => state.auth.token);
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    // console.log("The user name is ", username)


    const height = lg ? '5vh' : md ? '3vh' : sm ? '40px' : '30px';


    const deleteFromCart = (product) => {
        fetch(`http://localhost:5003/cart?id=${product._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    toast.success("Item removed from cart");
                    fetchCartItems();
                } else {
                    throw new Error('Failed to delete item');
                }
            })
            .catch(error => {
                console.log(error);
                toast.error("Error removing item from cart");
            });
    };

    const toggleCart = () => {
        setIsCartVisible(!isCartVisible);
    }

    const handleLogoClick = () => {
        navigate("/");
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const { logout } = useLogout();

    const handleLogout = () => {
        logout();
        handleClose();
    };

    // console.log("the user is ", user)

    return (
        <AppBar position="static" sx={{ backgroundColor: "#e0e0e0", ...styles, boxShadow: "none" }} >
            <Container maxWidth="100vw">
                <Toolbar disableGutters>
                    <Drawer pageOn={pageOn} />
                    {ShowLogo && <Box onClick={handleLogoClick} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "flex-start", mr: 1, mt: 3, mb: 1, ml: { xs: '3px', sm: "5px", md: "15px" }, cursor: 'pointer', }}>
                        <img src="/sta_logo.png" alt="Second Time Around Logo" style={{ height: height }} />
                        <Typography variant={lg ? "subtitle2" : "caption"} noWrap sx={{ fontWeight: 'bold', lineHeight: '1.25', textAlign: 'center' }}>
                            Second Time <br />
                            <span style={{ display: 'block' }}>Around</span>
                        </Typography>
                    </Box>}

                    {/* This is to push the search bar to the right */}
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Search setIsEmpty={setIsEmpty} setSearchProducts={setSearchProducts}/>
                        <IconButton edge="end" color="gray" disableRipple aria-label="cart" onClick={() => { fetchCartItems(); toggleCart(); }} sx={{
                            '&:hover': {
                                backgroundColor: "primary.dark"
                            },
                            '&.visited': {
                                backgroundColor: "primary.dark",
                            },
                            margin: 1,
                            '&:focus': {
                                outline: 'none',
                            }
                        }}>
                            <Badge badgeContent={cartItems.length} max={99} color="secondary">
                                <ShoppingCartIcon sx={{
                                    fontSize: lg ? 25 : md ? 20 : 17, '&:focus': {
                                        outline: 'none',
                                    }
                                }} />
                            </Badge>
                        </IconButton>

                        {
                            isCartVisible && <ShoppingCartOverlayCard cartVisibility={isCartVisible} cartVisibilityToggle={setIsCartVisible} deleteFromCart={deleteFromCart} />
                        }

                        <IconButton edge="end" color="gray" aria-label="account" aria-haspopup="true" aria-controls="menu-account" onClick={handleMenu} sx={{
                            '&:hover': {
                                backgroundColor: "primary.dark",
                            },
                            margin: 1,
                        }}>
                            <AccountCircleIcon sx={{}}/>
                        </IconButton>

                        <Menu
                            id="menu-account"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                            sx={{ borderRadius: 2, boxShadow: 2 }}

                        >
                            <MenuItem onClick={() => { navigate("/profile") }} sx={{
                                fontSize: lg ? '0.95rem' : "0.8rem",
                                '&:hover': {
                                    backgroundColor: "#58a75b",
                                    borderRadius: '20px',
                                    opacity: 0.8,

                                }, m: 1, p: 1, paddingLeft: 4, paddingRight: 4
                            }}> Profile </MenuItem>

                            <MenuItem onClick={handleLogout} sx={{
                                fontSize: lg ? '0.95rem' : "0.8rem", '&:hover': {
                                    backgroundColor: "#58a75b",
                                    borderRadius: '20px',
                                    opacity: 0.8,
                                }, m: 1, p: 1, paddingLeft: 4, paddingRight: 4
                            }}> Logout </MenuItem>

                        </Menu>

                        <Button
                            type="submit"
                            variant="outlined"
                            startIcon={<AddIcon style={{ fontSize: lg ? 25 : md ? 20 : 17 }} />}
                            sx={{
                                margin: "1px 1px 1px 10px", // top right bottom left
                                backgroundColor: "primary.main",
                                color: "gray",
                                '&:hover': {
                                    backgroundColor: "primary.dark",
                                },
                                borderRadius: '20px',
                                border: "2px solid gray",
                                padding: lg ? "3px 10px" : "2px 0px 2px 0px",
                                whiteSpace: "nowrap",
                                fontFamily: "Poppins",
                                fontSize: lg ? "0.85rem" : "0.6rem",
                                '& .MuiButton-startIcon': {
                                    margin: 0,
                                    color: "inherit",
                                },
                            }}
                            onClick={() => navigate("/sell")}
                        >
                            Sell
                        </Button>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar >
    );
}

export default Nav;

