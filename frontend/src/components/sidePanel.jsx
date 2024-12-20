import React from 'react';
import ListItemLink from './ListItemLink.jsx';
import { List } from '@mui/material';
import {
    Home as HomeIcon,
    Shop as ShopIcon,
    VolunteerActivism as VolunteerActivismIcon,
    AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';

const menuItems = [
    { text: 'Home', Icon: HomeIcon, to: '/' },
    { text: 'Shop', Icon: ShopIcon, to: '/shop' },
    { text: 'Donations', Icon: VolunteerActivismIcon, to: '/donation' },
    { text: 'Auction', Icon: AttachMoneyIcon, to: '/auction' },
];

function sidePanel({ ListStyles, ListItemStyles, ListButtonStyles, pageon }) {
    return (
        <List sx={{ mr: "0px", ...ListStyles }}>
            
            {menuItems.map(({ text, Icon, to }, index) => (
                <ListItemLink key={index} text={text} Icon={Icon} to={to} TypoStyles={{ ...ListItemStyles }} ButtonStyles={{ ...ListButtonStyles }} pageon={pageon} />
            ))}
        </List>
    );
}

export default sidePanel;
