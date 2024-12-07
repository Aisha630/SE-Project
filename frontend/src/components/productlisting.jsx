import React, { useState } from 'react';
import { Grid, PaginationItem, Pagination } from '@mui/material';
import Product from './product';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';


const ProductList = ({ products, mode }) => {
    const [page, setPage] = useState(1);
    const productsPerPage = 50; // updated products per page
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const startIndex = (page - 1) * productsPerPage;
    const displayedProducts = products.slice(startIndex, startIndex + productsPerPage);

    return (
        <Box>
            <Grid container spacing={1}>
                {displayedProducts.map((product) => (
                    <Link
                        key={product.id}
                        to={`/shop/${product.id}`}
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            display: 'contents',
                        }}
                    >
                        <Product product={product} mode={mode} />
                    </Link>
                ))}
            </Grid>
            <Box display="flex" justifyContent="center" mt={2}>
                {/* <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                >
                    <PaginationItem />
                </Pagination> */}


                <Pagination
                    count={totalPages}  // Total number of pages
                    onChange={handlePageChange}
                    renderItem={(item) => (
                        <PaginationItem
                            component="button"
                            {...item}
                            sx={{
                            //     // Custom styling can be applied here
                                color: 'black', // Example: Highlight the 5th page
                                backgroundColor: 'background.default',

                                '&.Mui-selected': {
                                    backgroundColor: 'background.default', // this is potentially here to change in the future in case we want to show 50+ products
                                }
                            }}
                        />
                    )}
                />
            </Box>
        </Box>
    );
};

export default ProductList;
