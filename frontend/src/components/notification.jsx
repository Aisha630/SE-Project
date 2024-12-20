import React, { useState } from 'react';
import { Backdrop, Paper, List, ListItem, ListItemText, IconButton, Fade, Typography, Box, Grid, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useMediaQuery } from '@mui/material';
import theme from '../themes/homeTheme';
import { useNotif } from '../context/notifContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const NotificationOverlayCard = ({ notifVisibility, notifVisibilityToggle, deletenotifs }) => {
    const [isOpen, setIsOpen] = useState(true);
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const { notifications } = useNotif();


    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <Grid container spacing={1}>

            <Backdrop open={isOpen} onClick={() => { notifVisibilityToggle(); handleClose() }} style={{ zIndex: 10, color: '#fff' }}>
                <Fade in={notifVisibility}>
                    <Grid item xs={11} sm={11} md={10} lg={5}>
                        <Paper style={{ position: 'relative', borderRadius: 10, padding: md ? 40 : 20, overflow: 'auto', maxHeight: '60vh', }} sx={{backgroundColor: "background.default"}} onClick={e => e.stopPropagation()} >
                            <Box display="flex" justifyContent="flex-start" alignItems="center">
                                <IconButton onClick={() => { notifVisibilityToggle(); handleClose() }} sx={{ margin: "1px", position: 'relative', padding: 0 }}>
                                    <ArrowBackIcon style={{ width: 45, height: 35 }} />

                                </IconButton>
                                <Typography variant="subtitle1" gutterBottom sx={{ textAlign: "left", fontWeight: 600, m: 1 }}>Continue Shopping </Typography>
                                <Box flexGrow={1}></Box>
                                <IconButton onClick={() => { notifications.map((notif) => { deletenotifs(notif) }) }} sx={{ margin: "1px", position: 'relative', padding: 0, color: "black" }}>
                                    <ClearAllIcon />
                                    <Typography variant="subtitle1" gutterBottom sx={{ textAlign: "left", fontWeight: 600, m: 1 }}>Clear All </Typography>
                                </IconButton>

                            </Box>

                            <Divider variant="fullWidth" sx={{ m: 2 }} />

                            <Typography variant={md ? "h6" : "subtitle1"} gutterBottom sx={{ textAlign: "left", m: 1, fontWeight: 500 }}>Your Notifications</Typography>
                            <Typography variant="subtitle2" gutterBottom sx={{ textAlign: "left", fontWeight: 400, m: 1 }}>
                                {`You have ${Array.isArray(notifications) ? notifications.filter(notif => notif.status === "unread").length : 0
                                    } `}
                                <span style={{ fontWeight: 700 }}>unread</span>
                                {` notifications`}
                            </Typography>

                            <List >
                                {notifications.map((item, index) => (
                                    // console.log("Rendering ", item.message),
                                    <ListItem key={index} sx={{
                                        borderRadius: 2, margin: 1, mb: 2, boxShadow: '0 0 4px rgba(0, 0, 0, 0.25)', height: "15vh", maxHeight: "140px",
                                        '&:visited': {
                                            color: 'inherit',
                                        },
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                                            transform: 'translateY(-4px)',
                                        }
                                    }}>
                                        <ListItemText sx={{
                                            textTransform: "capitalize", '& .MuiListItemText-primary': md ? "" : { fontSize: '0.85rem' },
                                        }} primary={item.message} />

                                        < IconButton edge="end" aria-label="delete" onClick={() => { deletenotifs(item) }} sx={{ padding: 2, zIndex: 20 }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}

                            </List>
                        </Paper>
                    </Grid>
                </Fade >
            </Backdrop >
        </Grid >
    )
};

export default NotificationOverlayCard;