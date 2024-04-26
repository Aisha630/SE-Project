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
        padding: 5,
        backgroundColor: '#6A9B81', // 
        color: 'black', 
        '&:hover': {
          backgroundColor: '#66C659', 
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