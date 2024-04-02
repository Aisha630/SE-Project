import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import theme from '../themes/authThemes';

const ImageCropper = ({ src, onComplete, onCancel }) => {
  const [crop, setCrop] = useState({ unit: '%', width: 80, aspect: 11 / 16 });
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const onImageLoad = useCallback((e) => {
    const img = e.currentTarget;
    const { width, height } = img;
    imgRef.current = img;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: (150 / width) * 100,
        x: 10,
        y: 10,
      },
      10 / 16,
      width,
      height
    );
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
      return;
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
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


  const getCroppedImg = (image, crop) => {
    const canvas = previewCanvasRef.current;
    return canvas.toDataURL('image/jpeg', 0.8);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {src && (
        <ReactCrop
          src={src}
          crop={crop}
          onChange={(newCrop) => setCrop(newCrop)}
          aspect={11 / 16}
          ruleOfThirds
          keepSelection
          style={{ maxWidth: '800px', maxHeight: '600px' }}
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
