import React, { useState } from "react";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import ImageCropper from "./ImageCropper";
import theme from "../themes/authThemes";

// this component is used to upload images for the ad
// it allows the user to select up to 5 images and crop them before uploading
const ImageUpload = ({ files, handleFileChange, errors }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropIndex, setCropIndex] = useState(null);

  const handleFileSelect = (event, index) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setCropModalOpen(true);
      setCropIndex(index);
    }
  };

  const handleCropComplete = (croppedImageUrl) => {
    fetch(croppedImageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "croppedImage.jpg", {
          type: "image/jpeg",
        });
        handleFileChange({ target: { files: [file] } }, cropIndex);
      });

    setCropModalOpen(false);
    setSelectedFile(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        my: 2,
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        {[...Array(5)].map((_, index) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            key={index}
          >
            <IconButton
              color={files[index] ? "default" : "primary"}
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(event) => handleFileSelect(event, index)}
              />
              <PhotoCamera />
            </IconButton>
            {files[index] && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={URL.createObjectURL(files[index])}
                  alt={`upload-preview-${index}`}
                  style={{ width: "100%", height: 80 }}
                />
              </Box>
            )}
          </Box>
        ))}
      </Box>
      <Modal
        open={cropModalOpen}
        onClose={() => setCropModalOpen(false)}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          margin: "auto",
          padding: "20px",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            position: "relative",
            bgcolor: theme.palette.background.paper,
            boxShadow: 24,
            borderRadius: 5,
            p: 4,
            maxHeight: "80vh",
          }}
        >
          <ImageCropper
            src={selectedFile ? URL.createObjectURL(selectedFile) : ""}
            onComplete={handleCropComplete}
            onCancel={() => setCropModalOpen(false)}
          />
        </Box>
      </Modal>
      {errors && errors.images && (
        <Typography
          color="error"
          variant="caption"
          sx={{ alignSelf: "center", mt: 1 }}
        >
          {errors.images}
        </Typography>
      )}
      <Typography variant="caption" sx={{ alignSelf: "center" }}>
        Maximum file size: 2 MB
      </Typography>
    </Box>
  );
};

export default ImageUpload;
