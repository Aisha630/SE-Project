import React from 'react';
import { Card, CardContent, Typography, List, ListItem, Avatar, ListItemText, Divider, Box, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import SiteButton from './button';
import { useMediaQuery } from '@mui/material';
import theme from '../themes/homeTheme';
// import { useNavigate } from 'react-router-dom';

const InfoCard = ({ title, items, isCart, deleteItem }) => {
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const xs = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Card raised sx={{ backgroundColor: isCart ? "#d1e4d0" : "#e0e0e0", borderRadius: 5, padding: md ? 5 : xs ? 1 : 3, maxWidth: "750px" }}>
            <CardContent>
                <Typography variant="h5" gutterBottom textAlign="left" sx={{ color: "gray", fontWeight: 500, marginLeft: 1, mb: 5 }}>
                    {title}
                </Typography>
                {/* <List sx={{ display: "flex", flexDirection: "column" }}>
                    {items.map((item, index) => (
                        <ListItem key={index} sx={{
                            display: "flex", flexDirection: "row", minHeight: "120px", maxHeight: "120px", padding: 1,
                            borderRadius: 2, mb: 2, boxShadow: '0 0 6px rgba(0, 0, 0, 0.50)',
                            backgroundColor: isCart ? "#e87975" : "#d1e4d0", color: isCart ? "white" : "black", width: "100%",
                            '&:hover': {
                                backgroundColor: isCart ? '#d47874' : "#a6b5a5",
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                                transform: 'translateY(-4px)',
                                cursor: "pointer"
                            }
                        }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" component={RouterLink} to={isCart ? `/shop/${item._id}` : `/shop/${item._id}`} sx={{
                                textDecoration: "none", width: "100%", height: "100%", m: 0, '&:visited': {
                                    color: 'inherit',
                                },
                                '&:hover': {
                                    backgroundColor: isCart ? '#d47874' : "#a6b5a5",
                                    cursor: "pointer"
                                }
                            }}>
                                <Avatar src={isCart ? `http://localhost:5003${item.images[0]}` : item.avatar} variant="square" sx={{ width: "13%", height: "auto", borderRadius: 2, margin: 2, padding: 0 }} />
                                <ListItemText sx={{ fontSize: "0.8rem", overflow: "wrap", textAlign: "left", textTransform: isCart ? "capitalize" : "" }} primary={isCart ? item.name : item.username} secondary={isCart ? `Size: ${item.size}` : item.email.toLowerCase()} />
                                {isCart &&
                                    <ListItemText sx={{ textTransform: "capitalize", marginRight: 2, textAlign: "right" }} primary={` Rs. ${item.price}`} />}
                            </Box>
                            {isCart &&
                                < IconButton edge="end" aria-label="delete" onClick={(event) => {
                                    event.stopPropagation();
                                    deleteItem(item);
                                }} sx={{ mr: 1, zIndex: 2 }}>
                                    <DeleteIcon />
                                </IconButton>}
                        </ListItem>
                    ))}
                </List> */}

                <List sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", m: 0, p: 0 }}>
                    {items.map((item, index) => (
                        <ListItem key={index} sx={{
                            borderRadius: 2, margin: 1, boxShadow: '0 0 4px rgba(0, 0, 0, 0.25)', height: "15vh", maxHeight: "140px", backgroundColor: isCart ? "#e87975" : "#d1e4d0", color: isCart ? "white" : "black",
                            '&:visited': {
                                color: 'inherit',
                            },
                            '&:hover': {
                                filter: "brightness(0.8)",
                                // backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                                transform: 'translateY(-4px)',
                            },
                            maxWidth: "500px",
                            minWidth: "280px"
                        }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" component={RouterLink} to={isCart ? `/shop/${item._id}` : `/shop/${item._id}`} sx={{
                                textDecoration: "none", width: "100%", height: "100%", m: 0, '&:visited': {
                                    color: 'inherit',
                                },
                            
                            }}>
                            {<Avatar src={isCart ? `http://localhost:5003${item.images[0]}` : item.avatar} variant="square" sx={{ width: "12%", height: "auto", borderRadius: 2, margin: 2, padding: 0, maxHeight: "100%", minWidth: "60px", }} />}

                            <ListItemText sx={{
                                textTransform: isCart ? "capitalize" : "", '& .MuiListItemText-primary': md ? "" : { fontSize: '0.85rem' },
                                '& .MuiListItemText-secondary': md ? "" : { fontSize: '0.80rem' }
                            }} primary={isCart ? item.name : item.username} secondary={isCart ? `Size: ${item.size}` : item.email.toLowerCase()} />

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
    );
};

export default InfoCard;
