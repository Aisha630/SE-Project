// ConfirmDeletionOverlay.jsx
import React from 'react';
import { Backdrop, Paper, Typography, Box, IconButton, Fade, TextField, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SiteButton from './button';

const ConfirmReopenOverlay = ({ open, handleReopen, handleClose }) => {

  const [startingBid, setStartingBid] = React.useState(0);
  const [endTime, setEndTime] = React.useState(new Date().toISOString().slice(0, 16));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startingBid') {
      setStartingBid(value);
    } else if (name === 'endTime') {
      setEndTime(value);
    }
  }

  const handleSubmit = () => {
    handleReopen(startingBid, endTime);
    handleClose();
    setStartingBid(0);
    setEndTime(new Date().toISOString().slice(0, 16));
  }

  return (
    <Backdrop open={open} style={{ zIndex: 10 }}>
      <Fade in={open}>
        <Paper style={{ borderRadius: 10, padding: 20, width:'30%', position: 'relative' }}>
          <IconButton onClick={handleClose} style={{ position: 'absolute', right: 10, top: 10 }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Reopen Product
          </Typography>
          <Typography variant="body1">
            Please update the following fields.
          </Typography>
          <Box display="flex" justifyContent="flex-end" alignItems="center" mt={3} paddingLeft={2} paddingRight={2}>
            <TextField
              fullWidth
              id="startingBid"
              label="Starting Bid:"
              type="number"
              name="startingBid"
              value={startingBid}
              onChange={handleInputChange}
              margin="normal"
            />
          </Box>
          <Box display={'flex'} justifyContent="flex-end" alignItems="center" mt={3} paddingLeft={2} paddingRight={2}>
            <TextField
              fullWidth
              id="endTime"
              label="End Time:"
              type="datetime-local"
              name="endTime"
              value={endTime}
              onChange={handleInputChange}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: "9999-12-31T23:59",
              }}
            />
          </Box>

          <Box display="flex" justifyContent="flex-end" mt={3} sx={{
            padding: 2,
            
          }}>
            <SiteButton text={"Reopen"} onClick={handleSubmit} style={{ marginRight: 10,}} />
          </Box>
        </Paper>
      </Fade>
    </Backdrop>
  );
};

export default ConfirmReopenOverlay;
