import React from 'react';
import { Grid, Card, CardContent, Typography, Avatar, List, ListItem, Button, Divider, Box, ListItemText } from '@mui/material';
import { useCart } from '../context/cartContext';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import theme from '../themes/homeTheme';
import { ThemeProvider } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-toastify';
import SiteButton from '../components/button';
import { useNavigate } from 'react-router-dom';
import InfoCard from '../components/infoCard';



const OrderSummaryPage = () => {

    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const { cartItems, fetchCartItems, totalPrice, sellers } = useCart();

    const checkout = () => {
        fetch(`http://localhost:5003/checkout`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",


        }).then(response => {
            if (response.ok) {
                toast.success("Checkout successful");
                fetchCartItems();
                navigate("/");
            } else {
                throw new Error('Failed to checkout');
            }
        })
    }

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
        <ThemeProvider theme={theme}>
            <Box style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", m: 0, paddingLeft: 68 }}>
                <IconButton onClick={() => navigate("/shop")} edge="start" sx={{ marginTop: "10px", mb: "10px" }} >
                    <img src="backIcon.png" alt="Back Icon" style={{ width: 65, height: 50, display: "flex", flexDirection: "column", alignItems: "flex-start", }} />
                </IconButton>
            </Box>
            <Grid container spacing={3} sx={{ paddingRight: 8, paddingLeft: 8, }}>
                <Grid item xs={12} sm={6}>
                    <InfoCard
                        title="Order Summary"
                        items={cartItems}
                        isCart={true}
                        deleteItem={deleteFromCart}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InfoCard
                        title="Seller's Details"
                        items={sellers}
                        isCart={false}
                    />
                </Grid>
            </Grid>
            <Box sx={{ textAlign: "right", mr: 0, mt: 0, mb: 3, paddingRight: 8, paddingTop: 3 }}>
                <SiteButton text={'Confirm Purchase'} styles={{ padding: 2, paddingLeft: 8, paddingRight: 8, fontSize: "0.95rem" }} onClick={checkout} />
            </Box>
        </ThemeProvider>
    );
};

export default OrderSummaryPage;
