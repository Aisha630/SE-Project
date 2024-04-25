import React from 'react';
import { Typography, Box, Grid, Card, CardContent, CardActions, Button, IconButton, CardMedia, FormControl, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Autocomplete from '@mui/material/Autocomplete';
import { useMediaQuery } from '@mui/material';
import theme from '../themes/homeTheme';
import ConfirmDeletionOverlay from './confirmDeletion';
import DonationRequestsOverlay from './donationRequestsOverlay';
import ConfirmReopenOverlay from './confirmReopenOverlay';
import { useNavigate } from 'react-router-dom';

const options = [
    { label: 'Live', value: 'live' },
    { label: 'On Hold', value: 'on_hold' },
    { label: 'Sold', value: 'sold' },
];

const UserProducts = ({ products, handleDeleteItem, selectedTab, handleReopenItem, handleDonationApproval }) => {

    const [open, setOpen] = React.useState(false);
    const [savedProduct, setsavedProduct] = React.useState(null);
    const [selectedProductId, setSelectedProductId] = React.useState(null);
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [confirmReopen, setConfirmReopen] = React.useState(false);
    const navigate = useNavigate();
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
        setConfirmReopen(false);
    };

    const handleDelete = () => {
        handleDeleteItem(selectedProductId);
        setOpen(false);
        toast.error('Item deleted successfully');
    }
    const handleEditItem = (selectedProductId) => {
        // Implement edit item logic
        // call to backend to edit the product
        navigate(`/edit/${selectedProductId}`);
        // toast.success('Item edited successfully');
    }

    const handleReopen = ({ product }) => {
        // Implement reopen item logic
        // call to backend to reopen the product
        let mode = selectedTab === 'Auctioned' ? 'Auction' : selectedTab === 'Donations' ? 'Donation' : 'Sale';

        const data = { _id: product._id, mode: 'SaleProduct', price: product.price }
        if (selectedTab !== 'Auctioned') {
            handleReopenItem(data);
            toast.success(`Your item has been reopened for ${mode}!`);
            setsavedProduct(null);
        } else {
            setConfirmReopen(true);
        }
    }

    const handleReopenAuction = (startingBid, endTime, id) => {
        const data = { _id: id, mode: 'AuctionProduct', startingBid: startingBid, endTime: endTime }
        handleReopenItem(data);
        setConfirmReopen(false);
        setsavedProduct(null);
        toast.success('Your item has been reopened for Auction!');
    }

    const handleViewDonationRequests = ({ product }) => {
        setSelectedProduct(product);
        setOpenDonationRequests(true);
    }

    const handleItemSold = (id) => {
        // Implement item sold logic
        // call to backend to mark item as sold
        handleDeleteItem(id);
        toast.success('Congratulations on your Sale!');
    }

    const handleDonateApproved = (username, id) => {
        // Implement donate approved logic
        // call to backend to donate approved

        handleDonationApproval(username, id);
        setOpenDonationRequests(false);
        toast.success(`Donation to ${username} approved! Check your email for next steps.`);

    }

    function AuctionTimer({ endTime }) {
        const calculateTimeLeft = () => {
            const difference = +new Date(endTime) - +new Date();
            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                };
            }

            return timeLeft;
        };

        const formatTimeLeft = () => {
            const timeLeft = calculateTimeLeft();

            if (timeLeft.days || timeLeft.hours) {
                return `Ends in: ${timeLeft.days ? `${timeLeft.days}d ` : ''}${timeLeft.hours}h`;
            } else if (timeLeft.minutes < 60) {
                return "Ends in: Less than 1h";
            } else {
                return "Auction has ended";
            }
        };

        return (
            <span>
                {formatTimeLeft()}
            </span>
        );
    }


    return (
        <Grid container spacing={1} sx={{ backgroundColor: 'background.default', p: 7, m: 2, maxWidth: "100%", }}>
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
                                        <Typography variant="h5" sx={{ fontWeight: 'bold', paddingTop: 1 }}>
                                            {product.name}
                                        </Typography>
                                    </Link>
                                    {product.__t !== 'DonationProduct' && <Typography variant="body1" color="text.secondary" sx={{ my: 1 }}>
                                        {product.__t === 'AuctionProduct' ? 'Current Bid: ' + product.currentBid : 'Price: ' + product.price}
                                    </Typography>}
                                    {product.__t === 'AuctionProduct' && product.isHold && <Typography variant="body1" color="#2E7D32" sx={{ my: 1 }}>
                                        Auctioned to: {product.buyerUsername ? product.buyerUsername : "No bids yet"}
                                    </Typography>}
                                    {product.__t === 'AuctionProduct' && !product.isHold && <Typography variant="body1" color="#2E7D32" sx={{ my: 1 }}>
                                        <AuctionTimer endTime={product.endTime} />
                                    </Typography>}
                                    {product.__t === 'SaleProduct' && product.isHold && <Typography variant="body1" color="#2E7D32" sx={{ my: 1 }}>
                                        Sold to: {product.buyerUsername ? product.buyerUsername : "No buyer yet"}
                                    </Typography>}
                                    <Typography variant="body1" color="text.secondary" sx={{ paddingTop: 1 }}>
                                        Created at: {new Date(product.createdAt).toLocaleString()}
                                    </Typography>

                                </CardContent>
                                <IconButton onClick={() => handleClickOpen(product._id)} sx={{ alignSelf: 'start', padding: 1, m: 2 }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                            <CardActions sx={{ justifyContent: 'space-between', padding: 2, pt: 0, }}>
                               <FormControl sx={{ minWidth: 140, color: '#517652', display: 'flex', }}>
                                    <Autocomplete
                                        // defaultValue={product.isHold ? options[0] : options[1]}
                                        options={options}
                                        filterOptions={(options) => { return options.filter(option =>  option.value === 'sold') }}
                                        value={options.find(option => option.value === (product.isHold ? 'on_hold' : 'live'))}
                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField {...params} label="Status" />}
                                        disableClearable={true}
                                        disabled={!product.isHold || !product.buyerUsername}
                                        onChange={(event, value) => {
                                            // Implement status change logic
                                            if (value.value === 'sold') {
                                                // call to backend to change status to sold
                                                handleItemSold(product._id);
                                            }
                                        }}
                                    />
                                </FormControl>

                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    {product.__t === 'DonationProduct' && !product.isHold &&
                                        <Button variant="contained" onClick={() => handleViewDonationRequests({ product })} size={sm ? "small" : "medium"} sx={{
                                            backgroundColor: '#517652',

                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#C7E3C8',
                                                color: 'white'
                                            }
                                        }}>
                                            View Requests
                                        </Button>}

                                    {!product.isHold && <Button onClick={() => handleEditItem(product._id)} variant="contained" size={lg ? "large" : "small"} sx={{
                                        backgroundColor: '#f97171',
                                        marginTop: 1,
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#FEABAB',
                                            color: 'white'
                                        }
                                    }}>
                                        Edit Item
                                    </Button>}
                                    {product.isHold && <Button onClick={() => {handleReopen({ product }); setsavedProduct(product)}} variant="contained" size={lg ? "large" : "small"} sx={{
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
                    <DonationRequestsOverlay open={openDonationRequests} handleClose={handleClose} product={selectedProduct} handleDonate={handleDonateApproved} />
                </Grid>
            ))
        }
        <ConfirmReopenOverlay open={confirmReopen} handleReopen={handleReopenAuction} handleClose={handleClose} product={savedProduct} />
        </Grid >
    );
};

export default UserProducts;
