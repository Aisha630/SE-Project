import React, { useState } from 'react';
import { Grid, Pagination } from '@mui/material';
import Product from './product'; 
import {Box} from '@mui/material';


const ProductList = ({ products }) => {
    const [page, setPage] = useState(1);
    const productsPerPage = 8;
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const startIndex = (page - 1) * productsPerPage;
    const displayedProducts = products.slice(startIndex, startIndex + productsPerPage);

    return (
        <Box>
            <Grid container spacing={1}>
                {displayedProducts.map((product, index) => (
                    <Product key={index} {...product} />
                ))}
            </Grid>
            <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    style={{ marginTop: '20px' }}
                />
            </Box>
        </Box>
    );
};

export default ProductList;