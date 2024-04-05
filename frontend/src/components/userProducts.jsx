import React from 'react';
import { useState } from 'react';
import { Typography, Box, Grid, Card, CardContent, CardActions, Button, IconButton, CardMedia, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const UserProducts = ({ products }) => {
    const deleteItem = (item) => {
        // Implement deletion logic

    };
    const handleChange = (event) => {
        // Implement status change logic
        // call to backend to modify the status of the product
    }

    return (
        <Grid container spacing={2} sx={{ backgroundColor: 'white' }}>
            {products.map((product) => (
                <Grid item xs={12} sm={12} md={6} key={product.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Card sx={{ display: 'flex', width: '90%', m: 2, borderRadius: 2, boxShadow: 3, backgroundColor: '#e0e0e0' }}> {/*could also change to #f5f5f5 */}
                        <CardMedia
                            component="img"
                            sx={{ width: 200, padding: 2, objectFit: 'cover', borderRadius: 8 }}
                            image={'http://localhost:5003'.concat(product.images[0])}
                            alt={product.name}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between'  }}>
                                <CardContent sx={{ padding: 2 }}>
                                    <Typography component="div" variant="h5" sx={{ fontWeight: 'bold', paddingTop:1 }}>
                                        {product.name}
                                    </Typography>
                                    {product.__t !== 'DonationProduct' && <Typography variant="body1" color="text.secondary" sx={{ my: 1 }}>
                                        {product.__t === 'AuctionProduct' ? 'Current Bid: ' + product.currentBid : 'Price: ' + product.price } 
                                    </Typography>}
                                    {product.__t === 'DonationProduct' && <Typography variant="body1" color="#e0e0e0" sx={{ my: 1 }}>
                                        secret padding
                                    </Typography>}
                                    <Typography variant="body1" color="text.secondary">
                                        Created at: {new Date(product.createdAt).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                                <IconButton onClick={() => deleteItem(product.id)} sx={{ alignSelf: 'start', padding:3 }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                            <CardActions sx={{ justifyContent: 'space-between', padding: 2, pt: 0 }}>
                                <FormControl size="small" sx={{ minWidth: 120, color:'#517652' }}>
                                    <InputLabel id="status-label" >Status</InputLabel>
                                    <Select
                                        labelId="status-label"
                                        id="status-select"
                                        value={product.isHold ? "On Hold" : "Live"}
                                        label="Status"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"On Hold"}>On Hold</MenuItem>
                                        <MenuItem value={"Live"}>Live</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button variant="contained" sx={{
                                    backgroundColor: '#f97171',
                                }}>Edit Item</Button>
                            </CardActions>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default UserProducts;