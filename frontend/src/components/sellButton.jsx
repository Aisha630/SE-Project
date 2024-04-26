import React from 'react'
import { Fab } from '@mui/material';
import Add from '@mui/icons-material/Add.js';
import { useNavigate } from 'react-router-dom';


const SellButton = () => {
    const navigate = useNavigate();


    const fabStyle = {
        position: 'fixed',
        bottom: '5%',
        right: '2%',
        // padding: '2%',
        padding: 5,
        // backgroundColor: '#58a75b', // Replace with your desired hex color
        backgroundColor: '#C7E3C8', // Replace with your desired hex color
        // color: '#ffffff', // Replace with your desired hex color for text/icon
        color: 'black', // Replace with your desired hex color for text/icon
        '&:hover': {
        //   backgroundColor: '#466b45', // Darken color on hover; replace with your desired hex color
          backgroundColor: '#58a75b', // Darken color on hover; replace with your desired hex color
          // Optional: add a shadow or scale transform here for hover effect
          boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.3)',
          transform: 'scale(1.05)',
        },
        transition: '0.3s',
      };
    return (
        <Fab aria-label="sell" size='large' sx={fabStyle} onClick={() => { navigate('/sell') }}>
            <Add /> Sell
        </Fab>
    )
}

export default SellButton