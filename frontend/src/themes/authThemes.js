import '@fontsource/poppins';
import { createTheme } from '@mui/material';
const theme = createTheme({
    palette: {
        primary: { main: '#58a75b' },
        secondary: { main: "#D1E4D0" },
    },
    typography: {
        fontFamily: 'Poppins, Arial, sans-serif',
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': { borderColor: '#58a75b' },
                    },
                    '& label.Mui-focused': { color: 'green' },
                    '& label': { color: '#58a75b' },
                },
            },
        },
    },
    shape: { borderRadius: 5 },
    shadows: ["none", "0px 2px 4px rgba(0, 0, 0, 0.1)"],
});

export default theme;