import React, { useState } from 'react';
import { IconButton, InputBase, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';


const Search = ({ setisempty, setsearchproducts, mode ,category}) => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const token = useSelector((state) => state.auth.token);

    const toggleSearch = () => {
        setIsSearchActive(!isSearchActive);
    };

    const getSearchResults = (event) => {
        const queryString = new URLSearchParams({productType: mode, q: event.target.value});
        if (event.key === 'Enter') {
            fetch(`http://localhost:5003/shop?${queryString}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                if (!response.ok)
                    console.log("Error")
                return response.json()
            }).then(data => {
                const formattedProducts = data.filter(product => product.category===category).map(product => ({
                    name: product.name,
                    image: 'http://localhost:5003'.concat(product.images[0]), // Assuming the first image in the array is the main image
                    price: product.price,
                    id: product._id
                }));
                setisempty(formattedProducts.length === 0);
                setsearchproducts(formattedProducts)
            }).catch(error => { console.log(error) })
        }
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
                    onKeyPress={(event) => { getSearchResults(event) }}
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

