import '@fontsource/poppins';
import { createTheme } from '@mui/material';
const theme = createTheme({
    palette: {
        primary: { main: 'rgb(243, 244, 246)' },
        secondary: { main: '#58a75b' },
        background: {
            default: 'rgb(243, 244, 246)',
        },
    },
    typography: {
        fontFamily: 'Poppins, Arial, sans-serif',
    },
    components: {
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: "#58a75b",
                        '& .MuiListItemIcon-root, & .MuiTypography-root': {
                            color: "#ffffff",
                        }
                    },
                    borderRadius: "30px",
                    padding: { xs: "5px 15px", sm: "5px 15px", md: "10px 25px" },
                    '& .MuiListItemIcon-root, & .MuiTypography-root': {
                        minWidth: { xs: '30px', sm: '40px', md: '50px' },
                        fontSize: { xs: '0.7rem', sm: '0.875rem', md: '1rem' }
                    },
                },
            },
        },
    },
    shape: { borderRadius: 5 },
    shadows: ["none", "0px 2px 4px rgba(0, 0, 0, 0.1)"],
});

export default theme;