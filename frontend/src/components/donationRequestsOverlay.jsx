// DonationRequestsOverlay.jsx
import React, { useEffect } from 'react';
import {
  Backdrop,
  Box,
  Fade,
  Grid,
  Paper,
  List,
  Divider,
  Typography,
  IconButton
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const DonationRequestsOverlay = ({ open, handleClose, product, handleDonate }) => {

  const token = useSelector((state) => state.auth.token);
  const [donationHistories, setDonationHistories] = useState(new Map());

  useEffect(() => {
    const fetchDonationHistories = async () => {
      if (product) {
        const historiesPromises = product.requestList.map(([username]) =>
          fetch(`http://localhost:5003/profile?username=${username}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => {
              if (!res.ok) throw new Error('Network response was not ok');
              return res.json();
            })
            .then((data) => {
              return [username, data.donationHistory];
            })
        );

        Promise.all(historiesPromises)
          .then((histories) => {
            const historiesMap = new Map(histories);
            setDonationHistories(historiesMap);
          })
          .catch((error) => {
            console.error('Error fetching donation histories:', error);
          });
      }
    };

    fetchDonationHistories();
  }, [product, token]);



  return (
    <Backdrop open={open} style={{ zIndex: 10 }} onClick={handleClose}>
      <Fade in={open}>
        <Paper
          onClick={(e) => e.stopPropagation()} // Prevent click through to the backdrop
          elevation={3}
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            maxHeight: '80%',
            overflowY: 'auto',
            width: '60%', // Adjust as needed
            padding: 24,
            borderRadius: 8
          }}
        >

          <IconButton onClick={handleClose} sx={{
            position: 'absolute',
            left: 10,
            top: 10
          }}>
            <img src="/backIcon.png" alt="Back" style={{ width: 45, height: 35 }} />
          </IconButton>
          <Typography variant="h5" align="left" gutterBottom sx={{ marginLeft: 7, fontWeight: 600 }}>
            Requests List
          </Typography>
          <Divider />
          <Typography variant="subtitle1" align="left" gutterBottom sx={{ marginTop: 1, color: '#517652', fontSize: 15 }}>
            Please Select a Donee for Approval
          </Typography>
          <List>
            {product && product.requestList.map((request, index) => (
              <Grid container spacing={1} key={index} sx={{ padding: 1.5, marginTop: 2, boxShadow: '0 0 4px rgba(0, 0, 0, 0.35)', paddingRight: 2, borderRadius: 2, '&:hover': { backgroundColor: '#C7E3C8' } }} onClick={() => {handleDonate(request[0], product._id)}}>
                <Grid item xs={12} >
                  <Typography variant={'body1'} align="left" gutterBottom sx={{ color: '#F97171' }}>
                    Name of Donee:{'  '}
                    <Typography display={'inline'} align="left" gutterBottom sx={{ color: 'black' }}>
                      {request[0]}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" align="left" gutterBottom sx={{ color: '#F97171' }}>
                    Donation History: {'  '}
                    <Typography display={'inline'} align="left" gutterBottom sx={{ color: 'black' }}>
                      {
                        donationHistories.get(request[0])?.join(', ') || 'No Donation History'
                      }
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" align="left" gutterBottom sx={{ color: '#F97171' }}>
                    Request Details: {' '}
                    <Typography display={'inline'} align="left" gutterBottom sx={{ color: 'black' }}>
                      {request[1]}
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            ))}
            {!product &&
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Typography variant="h5" align="center" gutterBottom>
                  No Requests Found
                </Typography>
              </Box>
            }

          </List>
        </Paper>
      </Fade>
    </Backdrop>
  );
};

export default DonationRequestsOverlay;

