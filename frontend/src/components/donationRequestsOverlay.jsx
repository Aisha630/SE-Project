// DonationRequestsOverlay.jsx
import React from 'react';
import {
  Backdrop,
  Box,
  Fade,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DonationRequestsOverlay = ({ open, handleClose, product }) => {
  const requests = [
    {
      id: 1,
      doneeName: 'Donee 1',
      donationHistory: ['Product 1', 'Product 2'],
      details: 'Details of the request'
    },
    {
      id: 2,
      doneeName: 'Donee 2',
      donationHistory: ['Product 3', 'Product 4'],
      details: 'Details of the request'
    },
    {
      id: 3,
      doneeName: 'Donee 3',
      donationHistory: ['Product 5', 'Product 6'],
      details: 'Details of the request'
    },
    {
      id: 4,
      doneeName: 'Donee 4',
      donationHistory: ['Product 7', 'Product 8'],
      details: 'Details of the request'
    },
    {
      id: 5,
      doneeName: 'Donee 5',
      donationHistory: ['Product 9', 'Product 10'],
      details: 'Details of the request'
    },
    {
      id: 6,
      doneeName: 'Donee 6',
      donationHistory: ['Product 11', 'Product 12'],
      details: 'Details of the request'
    },
    {
      id: 7,
      doneeName: 'Donee 7',
      donationHistory: ['Product 13', 'Product 14'],
      details: 'Details of the request'
    },
    {
      id: 8,
      doneeName: 'Donee 8',
      donationHistory: ['Product 15', 'Product 16'],
      details: 'Details of the request'
    },
    {
      id: 9,
      doneeName: 'Donee 9',
      donationHistory: ['Product 17', 'Product 18'],
      details: 'Details of the request'
    },
    {
      id: 10,
      doneeName: 'Donee 10',
      donationHistory: ['Product 19', 'Product 20'],
      details: 'Details of the request'
    }
  ];
  return (
      <Backdrop open={open} style={{ zIndex: 10 }} onClick={handleClose}>
        <Fade in={open}>
          <Paper
            onClick={(e) => e.stopPropagation()} // Prevent click through to the backdrop
            elevation={3}
            style={{
              position: 'absolute',
              top: '10vh', // Adjust as needed
              left: '50%',
              transform: 'translateX(-50%)',
              maxHeight: '80vh',
              overflowY: 'auto',
              width: '60%', // Adjust as needed
              padding: 24,
              borderRadius: 8
            }}
          >
            <IconButton
              onClick={handleClose}
              style={{
                position: 'absolute',
                right: 8,
                top: 8
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" align="center" gutterBottom>
              Requests List
            </Typography>
            <List>
              {requests.map((request) => (
                <React.Fragment key={request.id}>
                  <ListItem>
                    <ListItemText
                      primary={`Name of Donee: ${request.doneeName}`}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            Donation History: {request.donationHistory.join(', ')}
                          </Typography>
                          <Typography component="span" variant="body2">
                            Request Details: {request.details}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Fade>
      </Backdrop>
  );
};

export default DonationRequestsOverlay;
