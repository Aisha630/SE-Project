// ConfirmDeletionOverlay.jsx
import React from 'react';
import { Backdrop, Paper, Typography, Box, IconButton, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SiteButton from './button';

const ConfirmDeletionOverlay = ({ open, handleConfirmDelete, handleClose }) => {
  return (
    <Backdrop open={open} style={{ zIndex: 10 }}>
      <Fade in={open}>
        <Paper style={{ borderRadius: 10, padding: 20, position: 'relative' }}>
          <IconButton onClick={handleClose} style={{ position: 'absolute', right: 10, top: 10 }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Confirm Deletion
          </Typography>
          <Typography variant="body1">
            Are you sure you want to delete this product?
          </Typography>
          <Box display="flex" justifyContent="flex-end" alignItems="center" mt={3} padding={2}>
            <SiteButton text="Yes" onClick={handleConfirmDelete} styles={{marginRight:1}}/>
            <SiteButton text="Cancel" onClick={handleClose} />
          </Box>
        </Paper>
      </Fade>
    </Backdrop>
  );
};

export default ConfirmDeletionOverlay;
