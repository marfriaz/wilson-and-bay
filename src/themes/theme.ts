import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#12585A", // Dark teal/blue
    },
    secondary: {
      main: "#E6D0A9", // Light gold
    },
    background: {
      default: "#181818",
      paper: "#122D36",
    },
    text: {
      primary: "#fff",
      secondary: "#fff",
    },
  },
  typography: {
    fontFamily: '"Manrope", "Arial", sans-serif',
    h1: {
      fontFamily: '"Oooh Baby", "cursive"',
      fontWeight: 700,
      color: "#fff",
    },
    h2: {
      fontFamily: '"Oooh Baby", "cursive"',
      fontWeight: 700,
      color: "#fff",
    },
    h3: {
      fontWeight: 400,
      fontSize: "2rem",
      letterSpacing: "1px",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.8,
      letterSpacing: "0.05em",
    },
    button: {
      textTransform: "uppercase",
      fontWeight: 400,
      fontSize: "1rem",
      letterSpacing: "1px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          transition: "all 0.4s",
          padding: "10px 20px",
        },
        containedPrimary: {
          backgroundColor: "#12585A",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#0c3d3e",
          },
        },
        outlinedPrimary: {
          color: "#fff",
          borderColor: "#fff",
          "&:hover": {
            borderColor: "#E6D0A9",
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#122D36",
          // Remove the shadow
          boxShadow: "none",
          // Remove the overlay for dark mode
          backgroundImage: "none",
        },
      },
      // If you are explicitly using the `elevation` prop, you might also need this:
      variants: [
        {
          props: { elevation: 0 },
          style: {
            "--Paper-overlay": "none",
          },
        },
      ],
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
  },
});

export default theme;
