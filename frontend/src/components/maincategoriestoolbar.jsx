import React from 'react';
import { Button, AppBar, Toolbar, Box, Typography } from '@mui/material';

const MainCategoryToolbar = ({ setCategory, category, navItems=['Clothing', 'Technology', 'Miscellaneous'], styles }) => {

    const handleMainCategory = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    return (
        <AppBar 
            component={'nav'}
            position="static"
            color="default"
            sx={{
                backgroundColor: '#e0e0e0',
                boxShadow: 'none',
                borderBottom: '1px solid #e0e0e0',
                ...styles
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: 'center',
                    width: '80%',
                    margin: '0 auto',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '80%',
                        flexWrap: 'wrap',
                    }}
                >
                    {navItems.map((item) => (
                        <Button
                            key={item}
                            onClick={() => handleMainCategory(item)}
                            sx={{
                                color: category === item ? 'green' : 'black',
                                fontSize: '1.2rem',
                            }}
                        >
                            <Typography variant="body1">{item}</Typography>
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default MainCategoryToolbar;
