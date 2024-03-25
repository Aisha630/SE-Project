import { AppBar, Toolbar, IconButton, Typography, Box, Button, Menu, MenuItem, Badge } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import '@fontsource/poppins';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLogout } from '../hooks/useLogout';
import { useSelector } from 'react-redux';
import ShoppingCartOverlayCard from './shoppingCartOverlayCard';
import { toast } from 'react-toastify';
import { useCart } from '../context/cartContext';


const Nav = ({ Drawer, Search, ShowLogo = true, styles }) => {
    const navigate = useNavigate();
    const [isCartVisible, setIsCartVisible] = useState(false);
    const token = useSelector((state) => state.auth.token);
    const { cartItems, totalPrice, fetchCartItems } = useCart();

    // const [cartItems, setCartItems] = useState([])
    // const [totalPrice, setTotalPrice] = useState(0)

    // useEffect(() => {
    //     fetchCartItems();
    // }, [token]);

    // const fetchCartItems = () => {
    //     fetch(`http://localhost:5003/cart`, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //         },
    //         credentials: 'include',
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             setCartItems(data);
    //             setTotalPrice(data.map(item => item.price).reduce((a, b) => a + b, 0));
    //         })
    //         .catch(error => console.log(error));
    // };

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

    return (
        <AppBar position="static" sx={{ backgroundColor: "#e0e0e0", ...styles, boxShadow: "none" }} >
            <Toolbar sx={{}}>
                <Drawer />
                {ShowLogo && <Box onClick={handleLogoClick} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2, mt: 3, mb: 3, ml: { xs: '3px', sm: "5px", md: "10px" }, cursor: 'pointer' }}>
                    <img src="/sta_logo.png" alt="Second Time Around Logo" style={{ height: "6vh" }} />
                    <Typography variant="h6" noWrap sx={{ fontWeight: 'bold', lineHeight: '1.25', textAlign: 'center' }}>
                        Second Time <br />
                        <span style={{ display: 'block' }}>Around</span>
                    </Typography>
                </Box>}
                <Box sx={{ flexGrow: 1, flexDirection: "row" }} />
                <Search />
                <IconButton edge="start" color="gray" aria-label="menu" aria-haspopup="true" onClick={() => { toggleCart(); fetchCartItems() }} sx={{
                    '&:hover': {
                        backgroundColor: "primary.dark"
                    },
                    margin: 1
                }}>
                    <Badge badgeContent={cartItems.length} color="secondary">
                        <ShoppingCartIcon />
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
                    <AccountCircle />
                </IconButton>

                <Menu
                    id="menu-account"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}> Profile </MenuItem>
                    <MenuItem onClick={handleClose}> My account </MenuItem>
                    <MenuItem onClick={handleLogout}> Logout </MenuItem>

                </Menu>

                <Button
                    type="submit"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    sx={{
                        margin: "1px 1px 1px 20px", // top right bottom left
                        backgroundColor: "primary.main",
                        color: "gray",
                        '&:hover': {
                            backgroundColor: "primary.dark",
                        },
                        width: "1vw",
                        borderRadius: '20px',
                        border: "2px solid gray",
                        padding: "3px 30px",
                        whiteSpace: "nowrap",
                        fontFamily: "Poppins",
                        fontSize: "0.875rem",
                        '& .MuiButton-startIcon': {
                            margin: 0,
                            color: "inherit",
                        },
                    }}
                    onClick={() => navigate("/sell")}
                >
                    Sell
                </Button>
            </Toolbar>
        </AppBar >
    );
}

export default Nav;


