import React from 'react';
import { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { Tab, Typography, Box, Grid, Avatar } from '@mui/material';
import theme from '../themes/homeTheme';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Nav from '../components/nav';
import { Drawer } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [selectedTab, setSelectedTab] = useState('0');
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue.toString());
    }

    const username = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    useEffect(() => {
        fetch(`http://localhost:5003/profile?username=${username}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (!res.ok) {
                navigate("/login");
            }; return res.json()
        }).then((data) => { console.log("The data is ", data); setUser(data) }).catch((error) => { console.log(error) });

    }, [token, navigate, username])

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={1}>
                <Nav Drawer={Drawer} Search={Box} />

                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ backgroundColor: "rgba(88, 167, 91, 0.7)", paddingTop: 2, paddingBottom: 10, display: "flex", alignItems: "center", ustifyContent: "center", flexDirection: "column" }}>

                    <Avatar src={user.avatar} alt="User Avatar" sx={{ width: "100px", height: "100px", borderRadius: "50%", margin: 'auto', mt: 6 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", textAlign: "center", mt: 2 }}>{user.username}</Typography>
                    <Typography variant="subtitle1" sx={{ textAlign: "center", mt: 2, color: "#585c61" }}>{user.email}</Typography>

                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ backgroundColor: "", paddingTop: 2, paddingBottom: 10, display: "flex", alignItems: "center", ustifyContent: "center", flexDirection: "column" }}>
                    <TabContext value={selectedTab}>

                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleTabChange} aria-label='Tabs'>
                                <Tab label="Auctioned" value="0" />
                                <Tab label="For Sale" value="1" />
                                <Tab label="Donations" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="0">
                            <Typography variant="h6">Auctioned</Typography>
                        </TabPanel>
                        <TabPanel value="1" >
                            <Typography variant="h6">For Sale</Typography>
                        </TabPanel>
                        <TabPanel value="2" >
                            <Typography variant="h6">Donations</Typography>
                        </TabPanel>
                    </TabContext>

                </Grid>
            </Grid>
        </ThemeProvider>



    );


}

export default UserProfile;