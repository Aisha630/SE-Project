import { Button } from '@mui/material';

const SiteButton = ({ text, styles, onClick }) => {
    return (
        <Button variant="contained" onClick={onClick} sx={{
            ...styles, '&:hover': {
                backgroundColor: '#58a75b',
                opacity: 0.9,
                color: '#white',
            }, backgroundColor: "#58a75b", color: "white"
        }}>{text}</Button>
    );
}

export default SiteButton;