import React, { useState } from 'react';
import { Backdrop, Paper, List, ListItem, ListItemText, IconButton, Fade, Typography, Avatar, Box, Grid, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import SiteButton from './button';
import { useCart } from '../context/cartContext';
import { useMediaQuery } from '@mui/material';
import theme from '../themes/homeTheme';

const ShoppingCartOverlayCard = ({ cartVisibility, cartVisibilityToggle, deleteFromCart }) => {
    const [isOpen, setIsOpen] = useState(true);
    const { cartItems, totalPrice } = useCart();
    const navigate = useNavigate();
    const md = useMediaQuery(theme.breakpoints.up('md'));

    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <Grid container spacing={1}>

            <Backdrop open={isOpen} onClick={() => { cartVisibilityToggle(); handleClose() }} style={{ zIndex: 10, color: '#fff' }}>
                <Fade in={cartVisibility}>
                    <Grid item xs={11} sm={11} md={10} lg={5}>
                        <Paper style={{ position: 'relative', borderRadius: 10, padding: md ? 40 : 20, overflow: 'auto', maxHeight: '60vh', }} onClick={e => e.stopPropagation()} >
                            <Box display="flex" justifyContent="flex-start" alignItems="center">
                                <IconButton onClick={() => { cartVisibilityToggle(); handleClose() }} sx={{ margin: "1px", position: 'relative', padding: 0 }}>
                                    <img src="/backIcon.png" alt="Back" style={{ width: 45, height: 35 }} />
                                </IconButton>
                                <Typography variant="subtitle1" gutterBottom sx={{ textAlign: "left", fontWeight: 600, m: 1 }}>Continue Shopping </Typography>
                            </Box>

                            <Divider variant="fullWidth" sx={{ m: 2 }} />

                            <Typography variant={md ? "h6" : "subtitle1"} gutterBottom sx={{ textAlign: "left", m: 1, fontWeight: 500 }}>Your Shopping Cart</Typography>
                            <Typography variant="subtitle2" gutterBottom sx={{ textAlign: "left", fontWeight: 400, m: 1 }}>{`You have ${cartItems.length} items in your cart`}</Typography>
                            <List >
                                {cartItems.map(item => (
                                    <ListItem key={item._id} sx={{
                                        borderRadius: 2, margin: 1, mb: 2, boxShadow: '0 0 4px rgba(0, 0, 0, 0.25)', height: "15vh", maxHeight: "140px",
                                        '&:visited': {
                                            color: 'inherit',
                                        },
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                                            transform: 'translateY(-4px)',
                                        }
                                    }}>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" component={RouterLink} to={`/shop/${item._id}`} sx={{
                                            textDecoration: "none", width: "100%", height: "100%", m: 0, '&:visited': {
                                                color: 'inherit',
                                            },

                                        }}>
                                            {< Avatar src={`http://localhost:5003${item.images[0]}`} variant="square" sx={{ width: md ? "12%" : "12%", height: "auto", borderRadius: 2, margin: 2, padding: 0, maxHeight: "100%", minWidth: "60px", maxWidth: "80px" }} />}

                                            <ListItemText sx={{
                                                textTransform: "capitalize", '& .MuiListItemText-primary': md ? "" : { fontSize: '0.85rem' },
                                                '& .MuiListItemText-secondary': md ? "" : { fontSize: '0.80rem' }
                                            }} primary={item.name} secondary={item.size ? `Size: ${item.size}` : ""} />
                                            <ListItemText sx={{ textAlign: "right", textTransform: "capitalize", m: "0 10px 0 2px", '& .MuiListItemText-primary': md ? "" : { fontSize: '0.85rem' } }} primary={`Rs. ${item.price}`} />
                                        </Box>

                                        < IconButton edge="end" aria-label="delete" onClick={() => { deleteFromCart(item) }} sx={{ padding: 2, zIndex: 20 }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                                <Divider variant="fullWidth" sx={{ m: 2 }} />
                                <Typography variant="subtitle1" gutterBottom textAlign="left" sx={{ m: 1, textAlign: "left" }}>Total: Rs. {totalPrice}</Typography>
                                <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{ mt: 3 }}>
                                    <SiteButton align="right" styles={{ width: "30%", padding: 1 }} text="Checkout" onClick={() => { navigate("/checkout") }} />
                                </Box>
                            </List>
                        </Paper>
                    </Grid>
                </Fade >
            </Backdrop >
        </Grid >
    )
};

export default ShoppingCartOverlayCard;