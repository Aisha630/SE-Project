import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import theme from '../themes/authThemes';

// this component allows the user to crop images before they are uploaded
// we keep a fixed aspect ratio so that our images are always the same size on the ad pages
const ImageCropper = ({ src, onComplete }) => {
  const [crop, setCrop] = useState({ unit: '%', width: 50, height: 70, aspect: 5/7, x: 25, y: 25 });
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const onImageLoad = useCallback((e) => {
    const img = e.currentTarget;
    const { width, height } = img;
    imgRef.current = img;
    console.log("img ref current", imgRef.current)
    const crop = makeAspectCrop(
      {
        unit: "px",
        width: 50,
        x: 25,
        y: 25,
      },
      5/7,
      width,
      height
    );
    console.log("initial crop", crop)
    setCrop(crop);
    updateCanvas(crop);
  }, []);

  useEffect(() => {
    if (crop.width && crop.height && imgRef.current && previewCanvasRef.current) {
      updateCanvas(crop);
    }
  }, [crop]);

  const makeClientCrop = async (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imgRef.current, crop);
      onComplete(croppedImageUrl);
    }
  };

  const updateCanvas = (crop) => {
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!image || !canvas) {
      // if image or canvas is not loaded, return
      return;
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw cropped image
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );
  };


  const getCroppedImg = () => {
    // get the canvas with the cropped image
    const canvas = previewCanvasRef.current;
    // we adjusted quality and set it to 0.8 to reduce the size of the image for our DB
    return canvas.toDataURL('image/jpeg', 0.8);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {src && (
        <ReactCrop 
        src={src} crop={crop} onChange={(newCrop) => setCrop(newCrop)} aspect={10 / 14} ruleOfThirds keepSelection style={{ maxWidth: '600px', maxHeight: '300px' }}
        ><img src={src} alt="Crop" style={{ maxWidth: '70vh' }} onLoad={onImageLoad} /></ReactCrop>
      )}
      <button
        onClick={() => makeClientCrop(crop)}
        style={{
          backgroundColor: theme.palette.primary.main,
          border: 'none',
          color: 'white',
          padding: '10px 20px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px',
          marginTop: '30px',
          cursor: 'pointer',
          borderRadius: '12px',
        }}
      >
        Crop
      </button>
      <canvas ref={previewCanvasRef} style={{ display: 'none', width: '20%', height: 'auto' }} />
    </div>
  );
};

export default ImageCropper;
