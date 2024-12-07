import React from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';

const MainCategoryToolbar = ({ setCategory, category, navItems=['Technology', 'Clothing', 'Miscellaneous'] }) => {

    return (
        <AppBar 
            component={'nav'}
            position="static"
            color="default"
            sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                overflow: 'hidden'
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: 'center',
                    paddingTop: '7rem'
                }}
            >
                {/* Outer Box to position the underline */}
                <Box sx={{
                    borderBottom: '1px solid', 
                }}>
                    {/* Inner Box to horizontally align category Buttons */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {navItems.map((item, index) => (
                            <Button
                                key={index}
                                onClick={() => setCategory(item)}
                                sx={{
                                    color: item === category ? '#58a75b' : 'black',
                                    mx: 0.5, 
                                    padding: '6px 16px',
                                    fontSize: '1rem', 
                                    fontWeight: 'regular',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        color: '#58a75b',
                                    },
                                }}
                            >
                                {item}
                            </Button>
                        ))}
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default MainCategoryToolbar;
