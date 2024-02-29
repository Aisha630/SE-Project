import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShopIcon from '@mui/icons-material/Shop';
// ... other icons

<Box sx={{ width: '250px', maxWidth: 360, bgcolor: 'background.paper' }}>
    <List>
        <ListItem button>
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ShopIcon />
            </ListItemIcon>
            <ListItemText primary="Shop" />
        </ListItem>
        {/* Add other items similarly */}
    </List>
</Box>
