import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Badge, Container, useMediaQuery } from '@mui/material';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useCart } from '../context/cartContext';
import { useSocket } from '../context/socketContext';
import { useLogout } from '../hooks/useLogout';
import ShoppingCartOverlayCard from './shoppingCartOverlayCard';
import NotificationOverlayCard from './notification';
import theme from '../themes/homeTheme';
import "../css/App.css";
import {useNotif} from "../context/notifContext"

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

const Nav = ({ Drawer, Search, ShowLogo = true, styles, pageon = "Home", setsearchproducts, setisempty }) => {

    const navigate = useNavigate();
    const [isCartVisible, setIsCartVisible] = useState(false);
    const { cartItems, fetchCartItems } = useCart();
    const token = useSelector((state) => state.auth.token);
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    const height = lg ? '5vh' : md ? '3vh' : sm ? '40px' : '30px';
    const [showNotifications, setShowNotifications] = useState(false);

    const {notifications, setNotifications, deleteNotifs, fetchNotifs} = useNotif();

    // const [notifications, setNotifications] = useState([]);
    const [readNotifs, setReadNotifs] = useState(0)

    // const fetchNotifs = () => {
    //     fetch(`http://localhost:5003/notifs`, {
    //         method: "GET"
    //     }).then(res => {
    //         if (res.ok)
    //             return res.json()
    //         else {
    //             res.json().then(data => toast.error(data.message))
    //         }
    //     }).then(data => {

    //         console.log("notifs are ", data)
    //         const unread = data.filter((notif) => {
    //             notif.status === "unread"
    //         })
    //         setNotifications(unread)
    //     }).catch((err) => {
    //         console.log(err)
    //     })

    // }

    // const deleteNotifs = (notif) => {
    //     fetch(`http://localhost:5003/notif${notif._id}`, {
    //         method: "DELETE"
    //     }).then(res => {
    //         if (res.ok) {
    //             setNotifications((notifs) => notifs.filter((notification) => notification !== notif))
    //             toast.success("Notification delete successfully")
    //         }
    //         else {
    //             res.json().then((data) => { toast.error(data.message) })
    //         }
    //     }).catch((err) => {
    //         toast.error(err)
    //     })

    // }

    const socket = useSocket();
    // useEffect(() => {
    //     if (!socket) return;
    //     socket.on("fetchNotifs", () => { fetchNotifs();console.log("Got ping for fetching notifs ")})
    //     // socket.on("newBid", (data) => { setNotifications((notifications) => [...notifications, data.message]); console.log(data) });
    //     // socket.on("donationRequest", (data) => { setNotifications((notifications) => [...notifications, data.message]); console.log(data) });
    //     // socket.on("productSold", (data) => { setNotifications((notifications) => [...notifications, data.message]); console.log(data) });
    //     // socket.on("newRating", (data) => { setNotifications((notifications) => [...notifications, data.message]); console.log(data) });

    //     return () => {
    //         socket.off("fetchNotifs")
    //         // socket.off("newBid");
    //         // socket.off("donationReq");
    //         // socket.off("productSold");
    //         // socket.off("newRating");
    //     }
    // }, [socket]);


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
        console.log("Toggling notifications ", notifications)
        if (showNotifications) {
            notifications.map((notif) => {
                console.log("Emitting read ", notif.message)
                console.log("Emitting read ", notif._id)
                socket.emit("read", notif._id)
            })
        }
        setShowNotifications(!showNotifications);
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: "#e0e0e0", ...styles, boxShadow: "none" }} >
            <Container maxWidth="100vw">
                <Toolbar disableGutters>
                    <Drawer pageon={pageon} />
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
                        <Search setisempty={setisempty} setsearchproducts={setsearchproducts} />
                        <IconButton edge="end" color="gray" disableRipple aria-label="notifications" onClick={toggleNotifs} sx={commonIconStyle}>
                            <Badge badgeContent={notifications.length} max={99} color="secondary">
                                <NotificationsIcon sx={{
                                    fontSize: lg || md ? 25 : 20, '&:focus': {
                                        outline: 'none',
                                    }
                                }} />
                            </Badge>
                        </IconButton>

                        {showNotifications && <NotificationOverlayCard notifVisibility={showNotifications} notifVisibilityToggle={toggleNotifs} notifications={notifications} setNotifications={setNotifications} deletenotifs={deleteNotifs}></NotificationOverlayCard>}
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

