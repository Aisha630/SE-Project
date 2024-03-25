import React, { useState } from 'react';
import { IconButton, InputBase, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);

    const toggleSearch = () => {
        setIsSearchActive(!isSearchActive);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            {isSearchActive ? (
                <InputBase
                    placeholder="Search..."
                    autoFocus
                    onBlur={toggleSearch}
                    sx={{
                        ml: 'auto', 
                        mr: "10px",
                        color: 'inherit', 
                    }}
                />
            ) : (
                <IconButton
                    color="gray"
                    aria-label="search"
                    onClick={toggleSearch}
                    sx={{
                        '&:hover': {
                            backgroundColor: "primary.dark",
                        },
                        mr: '10px',
                        ml: 'auto',
                    }}
                >
                    <SearchIcon />
                </IconButton>
            )}
        </Box>
    );
};

export default Search;

