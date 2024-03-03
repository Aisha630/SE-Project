import ListItemLink from '../components/ListItemLink.js';
import { List } from '@mui/material';
import { 
    Home as HomeIcon, 
    Shop as ShopIcon, 
    VolunteerActivism as VolunteerActivismIcon, 
    AttachMoney as AttachMoneyIcon, 
    Info as InfoIcon 
} from '@mui/icons-material';

const menuItems = [
    { text: 'Home', Icon: HomeIcon, to: '/' },
    { text: 'Shop', Icon: ShopIcon, to: '/shop' },
    { text: 'Donations', Icon: VolunteerActivismIcon, to: '/auction' },
    { text: 'Auction', Icon: AttachMoneyIcon, to: '/donation' },
    { text: 'About', Icon: InfoIcon, to: '/help' },
];

function sidePanel({ListStyles, ListItemStyles, ListButtonStyles}) {
    return (
        <List sx={{ mr:"5px", ...ListStyles}}>
            {menuItems.map(({ text, Icon, to }) => (
                <ListItemLink key={text} text={text} Icon={Icon} to={to} TypoStyles={{...ListItemStyles}} ButtonStyles={{...ListButtonStyles}}/>
            ))}
        </List>
    );
}

export default sidePanel;
