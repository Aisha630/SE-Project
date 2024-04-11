import React, { useState } from 'react';
import {
  Backdrop, Paper, Typography, Box, IconButton, Fade, TextField, Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SiteButton from './button';

const ConfirmReopenOverlay = ({ open, handleReopen, handleClose, product }) => {
  const [startingBid, setStartingBid] = useState(0);
  const [endTime, setEndTime] = useState(new Date().toLocaleString().slice(0, 16));
  const [error, setError] = useState({ bid: '', time: '' });

  const validate = () => {
    let hasError = false;
    setError({ bid: '', time: '' }); // Reset errors

    if (startingBid < 0) {
      setError((prev) => ({ ...prev, bid: 'Starting bid must be a positive number.' }));
      hasError = true;
    }

    if (new Date(endTime) <= new Date()) {
      setError((prev) => ({ ...prev, time: 'End time must be in the future.' }));
      hasError = true;
    }

    return !hasError;
  };

  const handleSubmit = () => {
    if (validate()) {
      handleReopen(startingBid, endTime, product._id);
      handleClose();
      setStartingBid(''); // Or set to a default starting bid value
      setEndTime(new Date().toISOString().slice(0, 16));
    }
  };

  return (
    <Backdrop open={open} style={{ zIndex: 10 }}>
      <Fade in={open}>
        <Paper style={{ borderRadius: 10, padding: 20, width: '40%', position: 'relative' }}>
          <IconButton onClick={handleClose} style={{ position: 'absolute', right: 10, top: 10 }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Reopen Product
          </Typography>
          <Typography variant="body1">
            Please update the following fields.
          </Typography>
          {error.bid && <Alert severity="error">{error.bid}</Alert>}
          {error.time && <Alert severity="error">{error.time}</Alert>}
          <Box mt={3} paddingLeft={2} paddingRight={2}>
            <TextField
              fullWidth
              id="startingBid"
              label="Starting Bid:"
              type="number"
              name="startingBid"
              value={startingBid}
              onChange={(e) => setStartingBid(e.target.value)}
              error={!!error.bid}
              helperText={error.bid}
              margin="normal"
            />
          </Box>
          <Box mt={3} paddingLeft={2} paddingRight={2}>
            <TextField
              fullWidth
              id="endTime"
              label="End Time:"
              type="datetime-local"
              name="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              error={!!error.time}
              helperText={error.time}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: new Date().toLocaleString().slice(0, 16), // Current time
              }}
            />
          </Box>

          <Box mt={3} sx={{ padding: 2 }}>
            <SiteButton text={"Reopen"} onClick={handleSubmit} />
          </Box>
        </Paper>
      </Fade>
    </Backdrop>
  );
};

export default ConfirmReopenOverlay;
