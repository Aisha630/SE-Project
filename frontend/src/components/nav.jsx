import React from 'react';
import { AppBar, Toolbar, IconButton, Box, Button, Badge, Container, useMediaQuery } from '@mui/material';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useCart } from '../context/cartContext';
import { useSocket } from '../context/socketContext';
import { useLogout } from '../hooks/useLogout';
import ShoppingCartOverlayCard from './shoppingCartOverlayCard';
import NotificationOverlayCard from './notification';
import theme from '../themes/homeTheme';
import "../css/App.css";
import { useNotif } from "../context/notifContext"

const commonIconStyle = {
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
}

function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useLogout();

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };
    const options = [{ label: "Profile", onClick: () => navigate("/profile") }, { label: "Logout", onClick: () => handleLogout() }];

    const handleClick = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setIsOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div style={{ position: "relative", display: "inline-block", }}>
                <IconButton onClick={handleClick} sx={commonIconStyle}>
                    <AccountCircleIcon />
                </IconButton>
                {isOpen && (
                    <ul style={{ position: 'absolute', listStyle: 'none', backgroundColor: "white", padding: 0, zIndex: 10, top: "50%", right: "40%" }}>
                        {options.map((option, index) => (
                            <li key={index} onClick={option.onClick} className="listItem" style={{ cursor: 'pointer', padding: 10, paddingLeft: 20, paddingRight: 20, margin: 10 }}>
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </ClickAwayListener>
    );

}

const Nav = ({ Search, styles, setsearchproducts, setisempty, mode, category, position = "fixed" }) => {

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
        <AppBar position={position} sx={{ backgroundColor: "#f3f4f6", ...styles, boxShadow: "none" }} >
            <Container maxWidth="100vw">
                <Toolbar disableGutters>
                <IconButton onClick={handleLogoClick} sx={{ mr: 2, '&:hover': { backgroundColor: 'transparent' }}}>
                        <img src="/try6.png" alt="Logo" style={{ height: '40px' }} />
                </IconButton>
                <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
                {navigationLinks.map((link) => (
                    <Button
                        key={link.label}
                        onClick={() => handleNavigation(link.path)}
                        sx={{
                            color: mode === link.mode ? '#58a75b' : 'black', 
                            '&:hover': {
                                color: '#58a75b', 
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
                            <Badge badgeContent={Array.isArray(notifications) ? notifications.filter(notif => notif.status === "unread").length : 0} max={99} color="secondary">
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
                                        outline: 'none',
                                    }
                                }} />
                            </Badge>
                        </IconButton>

                        {
                            isCartVisible && <ShoppingCartOverlayCard cartVisibility={isCartVisible} cartVisibilityToggle={setIsCartVisible} deleteFromCart={deleteFromCart} />
                        }

                        <Dropdown />

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

