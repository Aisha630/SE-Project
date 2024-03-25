// make shopping cart

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { List, ListItem, ListItemText, IconButton, Typography, Avatar, Divider, Box } from '@mui/material';
import SiteButton from '../components/button';


const ShoppingCart = () => {

    const token = useSelector((state) => state.auth.token);
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        fetchCartItems();
    }, [token]);

    const fetchCartItems = () => {
        fetch(`http://localhost:5003/cart`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                setCartItems(data);
                setTotalPrice(data.map(item => item.price).reduce((a, b) => a + b, 0));
            })
            .catch(error => console.log(error));
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

    return (
        <Box>
            <List >
                {cartItems.map(item => (
                    <ListItem key={item._id} display="flex" flexGrow="1" component={RouterLink} to={`/shop/${item._id}`} sx={{
                        borderRadius: 2, margin: 1, mb: 2, boxShadow: '0 0 4px rgba(0, 0, 0, 0.25)',
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

                    </ListItem>
                ))}
                <Divider variant="fullWidth" sx={{ m: 2 }} />
                <Typography variant="subtitle1" gutterBottom textAlign="left" sx={{ m: 1 }}>Total: Rs. {totalPrice}</Typography>
                <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{ mt: 3 }}>
                    <SiteButton align="right" styles={{ width: "30%", padding: 1 }} text="Checkout" onClick={() => console.log('Proceed to checkout')} />
                </Box>
            </List>
        </Box>
    )
}


export default ShoppingCart;