import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000", // Black for headings, buttons, CTAs
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffffff", // White background
      contrastText: "#000000",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000", // Main body and headings
      secondary: "#666666", // Subtext
    },
    divider: "#e0e0e0",
  },
  typography: {
    fontFamily: "'Helvetica Neue', 'Inter', 'Arial', sans-serif",
    h1: {
      fontSize: "3.5rem",
      fontWeight: 400,
      letterSpacing: "-0.05em",
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 400,
      letterSpacing: "-0.04em",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 400,
    },
    body1: {
      fontSize: "1.125rem",
      fontWeight: 300,
      lineHeight: 1.8,
    },
    body2: {
      fontSize: "1rem",
      fontWeight: 300,
    },
    button: {
      fontWeight: 500,
      fontSize: "0.95rem",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
  },
  shape: {
    borderRadius: 0, // Very clean edges
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: "0.75rem 2rem",
          border: "1px solid #000",
          backgroundColor: "#000",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#111",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: 0,
          border: "1px solid #e0e0e0",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: "4rem",
          paddingBottom: "4rem",
        },
      },
    },
  },
});

export default theme;
