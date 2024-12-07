import React from 'react'
import { Fab, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const SellButton = () => {
    const navigate = useNavigate();

    const fabStyle = {
        position: 'fixed',
        bottom: '6%',
        right: '5%',
        padding: 5,
        backgroundColor: '#C7E3C8', // 
        color: 'black', 
        '&:hover': {
          backgroundColor: '#BBD7BC', 
          boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.3)',
          transform: 'scale(1.05)',
        },
        transition: '0.3s',
      };
    return (
        <Fab aria-label="sell" size='large' sx={fabStyle} onClick={() => { navigate('/sell') }}>
            <Typography sx={{fontWeight: 'medium', fontSize: '1.1rem'}}>
             Sell
            </Typography>
        </Fab>
    )
}

export default SellButton