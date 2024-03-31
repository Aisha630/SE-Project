import '@fontsource/poppins';
import { createTheme } from '@mui/material';
const theme = createTheme({
    palette: {
        primary: { main: '#58a75b' },
        secondary: { main: "#D1E4D0", dark: 'rgba(209, 228, 208, 0.8)' },
    },
    typography: {
        fontFamily: 'Poppins, Arial, sans-serif',
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': { borderColor: '#084a08' },
                    },
                    '& label.Mui-focused': { color: '#084a08' },
                    '& label': { color: '#3e7840' },
                },
            },
        },
    },
    shape: { borderRadius: 5 },
    shadows: ["none", "0px 2px 4px rgba(0, 0, 0, 0.1)"],
});

export default theme;