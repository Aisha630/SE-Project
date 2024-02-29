import { AppBar, Toolbar, IconButton, Typography, Box, Button, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import '@fontsource/poppins';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Nav = () => {
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

    return (
        <AppBar position="static" >
            <Toolbar>
                <Box onClick={handleLogoClick} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2, mt: 3, cursor: 'pointer' }}>
                    <img src="sta_logo.png" alt="Second Time Around Logo" style={{ height: "40px" }} />
                    <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold', lineHeight: '1.25' }}>
                        Second Time <br /> Around
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

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
        </AppBar >
    );
}

export default Nav;


