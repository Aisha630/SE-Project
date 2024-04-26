import React from 'react';
import { AppBar, Toolbar, IconButton, Box, Button, Badge, Container, useMediaQuery } from '@mui/material';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useCart } from '../context/cartContext';
import { useSocket } from '../context/socketContext';
import UserDropDown from './userDropDown';
import ShoppingCartOverlayCard from './shoppingCartOverlayCard';
import NotificationOverlayCard from './notification';
import theme from '../themes/homeTheme';
import "../css/App.css";
import { useNotif } from "../context/notifContext"

const commonIconStyle = {
    '&:hover': {
        backgroundColor: "#c0c0c0",
        boxShadow: "none",
    },
    '&.visited': {
        backgroundColor:"#c0c0c0",
    },
    margin: 1,
    '&:focus': {
        outline: 'none',
    }
}


const Nav = ({ Search, styles, setsearchproducts, setisempty, mode, category, position = "fixed", showButton = false, color="#F5F4E7" }) => {

    const navigate = useNavigate();
    const [isCartVisible, setIsCartVisible] = useState(false);
    const { cartItems, fetchCartItems } = useCart();
    const token = useSelector((state) => state.auth.token);
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    const [showNotifications, setShowNotifications] = useState(false);
    const { notifications, deleteNotifs, setNotifications } = useNotif();
    const socket = useSocket();

    const navigationLinks = [
        { label: "Shop", mode: "sale", path: "/shop" },
        { label: "Donate", mode: "donate", path: "/donation" },
        { label: "Auction", mode: "auction", path: "/auction" }
    ];

    const handleNavigation = (path) => {
        navigate(path);
    };

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

    const toggleNotifs = () => {
        if (showNotifications) {
            const read = notifications.map((notif) => {
                socket.emit("read", notif._id)
                return { ...notif, status: "read" }
            })
            setNotifications(read);
        }
        setShowNotifications(!showNotifications);
    }

    return (
        <AppBar position={position} sx={{ backgroundColor: color, ...styles, boxShadow: "none" }} >
            <Container maxWidth="false">
                <Toolbar disableGutters>
                <IconButton onClick={handleLogoClick} sx={{ mr: 1, '&:hover': { backgroundColor: 'transparent' }}}>
                        <img src="/sta_logo2.png" alt="Logo" style={{ height: '40px' }} />
                </IconButton>
                <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
                {navigationLinks.map((link) => (
                    <Button
                        key={link.label}
                        onClick={() => handleNavigation(link.path)}
                        sx={{
                            color: mode === link.mode ? '#58a75b' : 'black', 
                            '&:hover': {
                                color: color !== "#F5F4E7" ? 'white' : '#58a75b'
                            },
                            mr: 0.9,
                            fontWeight: 'normal',
                            fontSize: '0.9rem',
                            padding: '6px 16px',
                            
                        }}
                    >
                        {link.label}
                    </Button>
                ))}
                </Box>

                    {/* This is to push the search bar to the right */}
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Search setisempty={setisempty} setsearchproducts={setsearchproducts} mode={mode} category={category} />
                        <IconButton edge="end" color="gray" disableRipple aria-label="notifications" onClick={toggleNotifs} sx={commonIconStyle}>
                            <Badge badgeContent={Array.isArray(notifications) ? notifications.filter(notif => notif.status === "unread").length : 0} max={99} color="secondary.light">
                                <NotificationsIcon sx={{
                                    fontSize: lg || md ? 25 : 20, '&:focus': {
                                        outline: 'none',
                                    }
                                }} />
                            </Badge>
                        </IconButton>

                        {showNotifications && <NotificationOverlayCard notifVisibility={showNotifications} notifVisibilityToggle={toggleNotifs} deletenotifs={deleteNotifs}></NotificationOverlayCard>}
                        <IconButton edge="end" color="gray" disableRipple aria-label="cart" onClick={() => { fetchCartItems(); toggleCart(); }} sx={commonIconStyle}>
                            <Badge badgeContent={cartItems.length} max={99} color="secondary">
                                <ShoppingCartIcon sx={{
                                    fontSize: lg || md ? 25 : 20, '&:focus': {
                                        outline: 'none',}
                                }} />
                            </Badge>
                        </IconButton>

                        {
                            isCartVisible && <ShoppingCartOverlayCard cartVisibility={isCartVisible} cartVisibilityToggle={setIsCartVisible} deleteFromCart={deleteFromCart} />
                        }

                        <UserDropDown commonIconStyle={commonIconStyle}/>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar >
    );
}

export default Nav;

