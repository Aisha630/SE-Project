import React from 'react';
import { Card, CardContent, Typography, List, ListItem, Avatar, ListItemText, Divider, Box, IconButton, ThemeProvider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMediaQuery } from '@mui/material';
import theme from '../themes/homeTheme';

const InfoCard = ({ title, items, isCart, deleteItem }) => {
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const xs = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <ThemeProvider theme={theme}>
        <Card raised sx={{ backgroundColor: "#d1e4d0" , borderRadius: 5, padding: md ? 5 : xs ? 1 : 3, maxWidth: "750px" }}>
            <CardContent>
                <Typography variant="h5" gutterBottom textAlign="left" sx={{ color: "black", fontWeight: 500, marginLeft: 1, mb: 5 }}>
                    {title}
                </Typography>
                <List sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", m: 0, p: 0 }}>
                    {items.map((item, index) => (
                        <ListItem key={index} sx={{
                            borderRadius: 2, margin: 1, boxShadow: '0 0 4px rgba(0, 0, 0, 0.25)', height: "15vh", maxHeight: "140px", backgroundColor: "secondary.dark" , color: isCart ? "white" : "black",
                            '&:visited': {
                                color: isCart? 'inherit':"",
                            },
                            '&:hover': {
                                filter: isCart?"brightness(0.8)":"",
                                boxShadow: isCart?'0 4px 8px rgba(0, 0, 0, 0.3)':"",
                                transform: isCart? 'translateY(-4px)':"",
                            },
                            maxWidth: "500px",
                            minWidth: "280px"
                        }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" component={isCart? RouterLink: Box} to={isCart ? `/shop/${item._id}` : ""} sx={{
                                textDecoration: "none", width: "100%", height: "100%", m: 0, '&:visited': {
                                    color: 'inherit',
                                },
                            
                            }}>
                            {<Avatar src={isCart ? `http://localhost:5003${item.images[0]}` : item.avatar} variant="square" sx={{ width: "12%", height: "auto", borderRadius: 2, margin: 2, padding: 0, maxHeight: "100%", minWidth: "60px", }} />}

                            <ListItemText sx={{
                                textTransform: isCart ? "capitalize" : "", '& .MuiListItemText-primary': md ? "" : { fontSize: '0.85rem' },
                                '& .MuiListItemText-secondary': md ? "" : { fontSize: '0.80rem' }
                            }} primary={isCart ? item.name : item.username} secondary={isCart ? item.size ? `Size: ${item.size}` : "" :  item.email.toLowerCase()} />

                            {isCart &&
                                <ListItemText sx={{ textAlign: "right", textTransform: "capitalize", m: "0 10px 0 2px", '& .MuiListItemText-primary': md ? "" : { fontSize: '0.85rem' } }} primary={` Rs. ${item.price}`} />
                            }
                            </Box>

                            {isCart &&

                                < IconButton edge="end" aria-label="delete" onClick={() => { deleteItem(item) }} sx={{ padding: 2, zIndex: 50 }}>
                                    <DeleteIcon />
                                </IconButton>

                            }
                        </ListItem>
                    ))}
                </List>

                <Divider sx={{ visibility: isCart ? "" : "hidden", borderWidth: "1px", m: 1 }} />
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ margin: 2, visibility: isCart ? "" : "hidden" }}>
                    <Typography variant="subtitle1" textAlign="left">
                        Total:
                    </Typography>
                    <Typography variant="subtitle1" textAlign="right">
                        Rs. {items.reduce((total, item) => total + item.price, 0)}
                    </Typography>
                </Box>

            </CardContent>
        </Card>
        </ThemeProvider>
    );
};

export default InfoCard;
