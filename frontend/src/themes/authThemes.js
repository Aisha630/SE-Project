import "@fontsource/poppins";
import { createTheme } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: { main: "#fffff" },
    secondary: { main: "#6A9B81", dark: "rgba(209, 228, 208, 0.8)" },
    background: { default: "#6A9B81" },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": { borderColor: "#6A9B81" },
          },
          "& label.Mui-focused": { color: "#6A9B81" },
          "& label": { color: "#6A9B81" },
        },
      },
    },
  },
  shape: { borderRadius: 5 },
  shadows: ["none", "0px 2px 4px rgba(0, 0, 0, 0.1)"],
});

export default theme;
