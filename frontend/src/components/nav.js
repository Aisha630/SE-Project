import { AppBar, Toolbar, IconButton, Typography, Box, Button, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import '@fontsource/poppins';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLogout } from '../hooks/useLogout';
import { useSelector } from 'react-redux';

const Nav = ({ Drawer, Search }) => {
    const navigate = useNavigate();
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
        <AppBar position="static" sx={{ backgroundColor: "#e0e0e0" }} >
            <Toolbar>
                <Drawer />
                <Box onClick={handleLogoClick} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2, mt: 3, mb: 3, ml: { xs: '3px', sm: "5px", md: "10px" }, cursor: 'pointer' }}>
                    <img src="/sta_logo.png" alt="Second Time Around Logo" style={{ height: "6vh" }} />
                    <Typography variant="h6" noWrap sx={{ fontWeight: 'bold', lineHeight: '1.25', textAlign: 'center' }}>
                        Second Time <br />
                        <span style={{ display: 'block' }}>Around</span>
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Search />
                <IconButton edge="start" color="gray" aria-label="menu" aria-haspopup="true" sx={{
                    '&:hover': {
                        backgroundColor: "primary.dark",
                    }
                }}>
                    <ShoppingCartIcon />
                </IconButton>

                <IconButton edge="end" color="gray" aria-label="account" aria-haspopup="true" aria-controls="menu-account" onClick={handleMenu} sx={{
                    '&:hover': {
                        backgroundColor: "primary.dark",
                    }
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
                    <MenuItem onClick={handleClose} >Profile</MenuItem>
                    <MenuItem onClick={handleClose} > My account</MenuItem>
                    <MenuItem onClick={handleLogout} > Logout</MenuItem>

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


