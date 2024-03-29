import React, { useState } from 'react';
import { Backdrop, Paper, List, ListItem, ListItemText, IconButton, Fade, Typography, Avatar, Box, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import SiteButton from './button';
import { useCart } from '../context/cartContext';

const ShoppingCartOverlayCard = ({ styles, cartVisibility, cartVisibilityToggle, deleteFromCart }) => {
    const [isOpen, setIsOpen] = useState(true);
    const { cartItems, totalPrice } = useCart();
    const navigate = useNavigate();
    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <Backdrop open={isOpen} onClick={() => { cartVisibilityToggle(); handleClose() }} style={{ zIndex: 10, color: '#fff' }}>
            <Fade in={cartVisibility}>
                <Paper style={{ position: 'absolute', overflow: 'auto', padding: 20, height: "50vh", width: "40vw", borderRadius: 10 }} onClick={e => e.stopPropagation()} >
                    <Box display="flex" justifyContent="flex-start" alignItems="center">
                        <IconButton onClick={() => { cartVisibilityToggle(); handleClose() }} sx={{ margin: "1px", position: 'relative', padding: 0 }}>
                            <img src="/backIcon.png" alt="Back" edge="start" style={{ width: 45, height: 35 }} />
                        </IconButton>
                        <Typography variant="subtitle1" gutterBottom textAlign="left" sx={{ fontWeight: 600, m: 1 }}>Continue Shopping </Typography>
                    </Box>

                    <Divider variant="fullWidth" sx={{ m: 2 }} />

                    <Typography variant="h6" gutterBottom textAlign="left" sx={{ m: 1 }}>Your Shopping Cart</Typography>
                    <Typography variant="subtitle2" gutterBottom textAlign="left" sx={{ fontWeight: 400, m: 1 }}>{`You have ${cartItems.length} items in your cart`}</Typography>
                    <List >
                        {cartItems.map(item => (
                            <ListItem key={item._id} display="flex" flexGrow="1" component={RouterLink} to={`/shop/${item._id}`} sx={{
                                borderRadius: 2, margin: 1, mb: 2, boxShadow: '0 0 4px rgba(0, 0, 0, 0.25)', height: "15vh",
                                '&:visited': {
                                    color: 'inherit',
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                                    transform: 'translateY(-4px)',
                                }
                            }}>
                                {<Avatar src={`http://localhost:5003${item.images[0]}`} variant="square" sx={{ width: "10%", height: "auto", borderRadius: 2, margin: 2, padding: 0 }} />}

                                <ListItemText sx={{ textTransform: "capitalize" }} primary={item.name} secondary={`Size: ${item.size}`} />
                                <ListItemText textAlign="left" sx={{ textTransform: "capitalize", margin: 0 }} primary={` Rs. ${item.price}`} />

                                < IconButton edge="end" aria-label="delete" onClick={() => { deleteFromCart(item) }} sx={{ padding: 2, }}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                        <Divider variant="fullWidth" sx={{ m: 2 }} />
                        <Typography variant="subtitle1" gutterBottom textAlign="left" sx={{ m: 1 }}>Total: Rs. {totalPrice}</Typography>
                        <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{ mt: 3 }}>
                            <SiteButton align="right" styles={{ width: "30%", padding: 1 }} text="Checkout" onClick={() => { navigate("/checkout") }} />
                        </Box>
                    </List>
                </Paper>
            </Fade >
        </Backdrop >
    )
};

export default ShoppingCartOverlayCard;