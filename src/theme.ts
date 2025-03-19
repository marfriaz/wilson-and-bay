import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00695f", // Teal for professionalism
    },
    secondary: {
      main: "#ff6f61", // Coral for contrast and warmth
    },
    background: {
      default: "#fafafa", // Light gray for a clean look
    },
    text: {
      primary: "#212121", // Dark text for readability
      secondary: "#757575", // Lighter text for secondary elements
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // Elegant and easy-to-read font
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      color: "#212121",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#212121",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: "#212121",
    },
    body1: {
      fontSize: "1rem",
      color: "#212121",
    },
    button: {
      fontSize: "1rem",
      fontWeight: "bold",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Keep button text normal
          borderRadius: "8px", // Slightly rounded buttons
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px", // Rounded card corners
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow
        },
      },
    },
  },
});

export default theme;
