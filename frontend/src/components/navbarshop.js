import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Menu, MenuItem, InputBase } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import Drawer from "./drawer.js"


const NavBar = () => {
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

    const [isSearchActive, setIsSearchActive] = useState(false);

    const toggleSearch = () => {
        setIsSearchActive(!isSearchActive);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#e0e0e0" }} >
            <Toolbar>

                <Drawer />

                <Box onClick={handleLogoClick} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3, mr: 2, mt: 3, ml: { xs: '3px', sm: "5px", md: "10px" }, cursor: 'pointer' }}>
                    <img src="sta_logo.png" alt="Second Time Around Logo" style={{ height: "5vh" }} />
                    <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold', lineHeight: '1.25', textAlign: 'center' }}>
                        Second Time <br />
                        <span style={{ display: 'block' }}>Around</span>
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                {isSearchActive ? (
                    <InputBase
                        placeholder="Search.."
                        autoFocus
                        onBlur={toggleSearch}
                        sx={{ marginLeft: 'auto', marginRight: '10px' }}
                    />
                ) : (
                    <IconButton edge="start" color="gray" aria-label="search" onClick={toggleSearch} sx={{
                        '&:hover': {
                            backgroundColor: "primary.dark",

                        },
                        marginLeft: 'auto',
                        marginRight: '10px',
                    }}>
                        <Search />
                    </IconButton>

                )}



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
                    <MenuItem onClick={handleClose} >My account</MenuItem>
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
                >
                    Sell
                </Button>
            </Toolbar>
        </AppBar>
    );
}




export default NavBar;
