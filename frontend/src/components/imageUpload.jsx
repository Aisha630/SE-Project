import React from 'react';
import { Box, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const ImageUpload = ({ files, handleFileChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
        my: 2,
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        {[...Array(5)].map((_, index) => (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            key={index}
          >
            <IconButton
              color={files[index] ? 'default' : 'primary'}
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(event) => handleFileChange(event, index)}
              />
              <PhotoCamera />
            </IconButton>
            {files[index] && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={URL.createObjectURL(files[index])}
                  alt={`upload-preview-${index}`}
                  style={{ width: '100%', height: 80 }} // size of displayed uploaded image
                />
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ImageUpload;
