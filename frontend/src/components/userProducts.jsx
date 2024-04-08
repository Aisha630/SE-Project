import React from 'react';
import { Typography, Box, Grid, Card, CardContent, CardActions, Button, IconButton, CardMedia, FormControl, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import SiteButton from './button';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Autocomplete from '@mui/material/Autocomplete';
import { useMediaQuery } from '@mui/material';
import theme from '../themes/homeTheme';
import ConfirmDeletionOverlay from './confirmDeletion';
import DonationRequestsOverlay from './donationRequestsOverlay';

const options = [
    { label: 'On Hold', value: 'on_hold' },
    { label: 'Live', value: 'live' },
];



const UserProducts = ({ products, handleDeleteItem, selectedTab }) => {

    const [open, setOpen] = React.useState(false);
    const [selectedProductId, setSelectedProductId] = React.useState(null);
    const [selectedProduct, setSelectedProduct] = React.useState(null);

    const [openDonationRequests, setOpenDonationRequests] = React.useState(false);
    const lg = useMediaQuery(theme.breakpoints.up('sm'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = (id) => {
        setSelectedProductId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenDonationRequests(false);
        
    };

    const handleDelete = () => {
        handleDeleteItem(selectedProductId);
        setOpen(false);
    }
    const handleEditItem = () => {
        // Implement edit item logic
        // call to backend to edit the product
        toast.success('Item edited successfully');
    }

    const handleReopenItem = () => {
        // Implement reopen item logic
        // call to backend to reopen the product
        let mode = selectedTab === 'Auctioned' ? 'Auction' : selectedTab === 'Donations' ? 'Donation' : 'Sale';
        toast.success(`Your item has been reopened for ${mode}`);
    }

    const handleDonationRequests = ({ product }) => {
        // Implement view requests logic
        // call to backend to view the requests
        // setSelectedProductId(id);
        console.log("Inside handleDonationRequests", product);
        setSelectedProduct(product);
        setOpenDonationRequests(true);
        // toast.success('Requests viewed successfully');
    }

    const handleDonateApproved = (username) => {
        // Implement donate approved logic
        // call to backend to donate approved
        
        setOpenDonationRequests(false);
        toast.success(`Donation to ${username} approved! Check your email for next steps.`);
        
    }

    return (
        <Grid container spacing={1} sx={{ backgroundColor: 'white', p: 7, m: 2, maxWidth: "100%", }}>
            {products.map((product) => (
                <Grid item xs={12} sm={12} md={8} lg={6} key={product._id} sx={{ display: 'flex', justifyContent: 'center', }}>
                    <Card sx={{ display: 'flex', width: '90%', m: 2, borderRadius: 2, boxShadow: 3, backgroundColor: '#e0e0e0', mb: 5, maxWidth: "100%", }}> {/*could also change to #f5f5f5 */}

                        <CardMedia
                            component="img"
                            sx={{ width: 180, padding: 2, objectFit: 'cover', borderRadius: 8 }}
                            image={'http://localhost:5003'.concat(product.images[0])}
                            alt={product.name}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1, }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <CardContent sx={{ padding: 2 }}>
                                    <Link to={`/shop/${product._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <Typography component="div" variant="h5" sx={{ fontWeight: 'bold', paddingTop: 1 }}>
                                            {product.name}
                                        </Typography>
                                    </Link>
                                    {product.__t !== 'DonationProduct' && <Typography variant="body1" color="text.secondary" sx={{ my: 1 }}>
                                        {product.__t === 'AuctionProduct' ? 'Current Bid: ' + product.currentBid : 'Price: ' + product.price}
                                    </Typography>}
                                    {/* {product.__t === 'DonationProduct' && <Typography variant="body1" color="#e0e0e0" sx={{ my: 1 }}>
                                        secret padding
                                    </Typography>} */}
                                    <Typography variant="body1" color="text.secondary" sx={{ paddingTop: 1 }}>
                                        Created at: {new Date(product.createdAt).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                                <IconButton onClick={() => handleClickOpen(product._id)} sx={{ alignSelf: 'start', padding: 1, m: 2 }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                            <CardActions sx={{ justifyContent: 'space-between', padding: 2, pt: 0, }}>

                                <FormControl sx={{ minWidth: 140, color: '#517652', display: 'flex', }}>
                                    {/* <InputLabel id="status-label" sx={{m:0, p:0}}>Status</InputLabel> */}
                                    {/* <Select */}
                                    {/* labelId="status-label" */}
                                    {/* id="status-select" */}
                                    {/* value={product.isHold ? "On Hold" : "Live"} */}
                                    {/* label="Status" */}
                                    {/* onChange={handleChange} */}
                                    {/* sx={{m:0, p:0, overflowX:"hidden"}} */}
                                    {/* overflow = "scroll" */}
                                    {/*  */}
                                    {/* > */}
                                    {/* <MenuItem value={"On Hold"} >On Hold</MenuItem> */}
                                    {/* <MenuItem value={"Live"} >Live</MenuItem> */}
                                    {/* </Select> */}
                                    <Autocomplete
                                        // defaultValue={product.isHold ? options[0] : options[1]}
                                        defaultValue={options.find(option => option.value === (product.isHold ? 'on_hold' : 'live'))}
                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                        options={options}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField {...params} label="Status" />}
                                        disableClearable={true}
                                    />
                                </FormControl>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    {product.__t === 'DonationProduct' && !product.isHold &&
                                        <Button variant="contained" onClick={() => handleDonationRequests({ product })} size={sm ? "small" : "medium"} sx={{
                                            backgroundColor: '#517652',
                                            // marginBottom: 1,

                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#C7E3C8',
                                                color: 'white'
                                            }
                                        }}>
                                            View Requests
                                        </Button>}

                                    {!product.isHold && <Button onClick={handleEditItem} variant="contained" size={lg ? "large" : "small"} sx={{
                                        backgroundColor: '#f97171',
                                        marginTop: 1,
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#f97171',
                                            color: 'white'
                                        }
                                    }}>
                                        Edit Item
                                    </Button>}
                                    {product.isHold && <Button onClick={handleReopenItem} variant="contained" size={lg ? "large" : "small"} sx={{
                                        backgroundColor: '#517652',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#C7E3C8',
                                            color: 'white'
                                        }
                                    }}>
                                        Reopen
                                    </Button>}

                                </Box>
                            </CardActions>
                        </Box>

                    </Card>
                    <ConfirmDeletionOverlay open={open} handleConfirmDelete={handleDelete} handleClose={handleClose} />
                    <DonationRequestsOverlay open={openDonationRequests} handleClose={handleClose} product={selectedProduct} handleDonate={handleDonateApproved}/>
                </Grid>
            ))
            }
        </Grid >
    );
};

export default UserProducts;
