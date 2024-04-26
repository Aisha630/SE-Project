import "@fontsource/poppins";
import { createTheme } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: { main: "#4a6a59" },
    // primary: { main: "rgb(243, 244, 246)" },
    secondary: { main: "#acc7b8", light: "#acc7b8", dark:"#6a9b81" },
    // secondary: { main: "#58a75b", dark: "rgba(88, 167, 91, 0.8)" },
    background: { default: "#F5F4E7" },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected, &.Mui-selected:hover": {
            backgroundColor: "#6a9b81",
            "& .MuiListItemIcon-root, & .MuiTypography-root": {
              color: "#ffffff",
            },
          },
          "&:hover": {
            backgroundColor: "#6a9b81",
            "& .MuiListItemIcon-root, & .MuiTypography-root": {
              color: "#ffffff",
            },
          },
          borderRadius: "30px",
          padding: { xs: "5px 15px", sm: "5px 15px", md: "10px 25px" },
          "& .MuiListItemIcon-root, & .MuiTypography-root": {
            minWidth: { xs: "30px", sm: "40px", md: "50px" },
            fontSize: { xs: "0.7rem", sm: "0.875rem", md: "1rem" },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": { borderColor: "#4a6a59" },
            // "&.Mui-focused fieldset": { borderColor: "#587E6A" },
          },
          "& label.Mui-focused": { color: "#4a6a59" },
          "& label": { color: "#4a6a59" },
          // "& label.Mui-focused": { color: "#587E6A" },
          // "& label": { color: "#587E6A" },
        },
      },
    },
  },
  shape: { borderRadius: 5 },
});

export default theme;
