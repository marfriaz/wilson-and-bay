import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#B8860B", // Rich dark gold
      light: "#D4AF37",
      dark: "#8B6914",
    },
    secondary: {
      main: "#2C3E50", // Deep slate blue
      light: "#5D6D7E",
      dark: "#1A252F",
    },
    background: {
      default: "#FAFAFA", // Soft off-white
      paper: "#FFFFFF", // Pure white
    },
    text: {
      primary: "#2C2C2C", // Rich dark gray
      secondary: "#5A5A5A", // Medium gray
    },
    divider: "rgba(184, 134, 11, 0.15)", // Subtle gold divider
  },
  typography: {
    fontFamily: '"Manrope", "Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontFamily: '"Oooh Baby", "cursive"',
      fontWeight: 700,
      fontSize: "4rem",
      color: "#B8860B",
      letterSpacing: "0.02em",
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: '"Oooh Baby", "cursive"',
      fontWeight: 700,
      fontSize: "3rem",
      color: "#B8860B",
      letterSpacing: "0.02em",
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 500,
      fontSize: "2rem",
      letterSpacing: "0.5px",
      color: "#2C2C2C",
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem",
      letterSpacing: "0.5px",
      color: "#2C2C2C",
    },
    body1: {
      fontSize: "1.125rem",
      lineHeight: 1.8,
      letterSpacing: "0.03em",
      color: "#3A3A3A",
    },
    body2: {
      fontSize: "1rem",
      lineHeight: 1.7,
      letterSpacing: "0.03em",
      color: "#5A5A5A",
    },
    button: {
      textTransform: "uppercase",
      fontWeight: 500,
      fontSize: "0.95rem",
      letterSpacing: "1.5px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          padding: "12px 32px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(184, 134, 11, 0.2)",
          },
        },
        containedPrimary: {
          backgroundColor: "#B8860B",
          color: "#FFFFFF",
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "#8B6914",
            transform: "translateY(-2px)",
          },
        },
        outlinedPrimary: {
          color: "#B8860B",
          borderColor: "#B8860B",
          borderWidth: "2px",
          "&:hover": {
            borderWidth: "2px",
            borderColor: "#8B6914",
            backgroundColor: "rgba(184, 134, 11, 0.08)",
          },
        },
        text: {
          color: "#B8860B",
          "&:hover": {
            backgroundColor: "rgba(184, 134, 11, 0.08)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          backgroundImage: "none",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
          border: "1px solid rgba(184, 134, 11, 0.12)",
        },
        elevation1: {
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.06)",
        },
        elevation2: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        },
        elevation3: {
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#2C2C2C",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          backgroundImage: "none",
          borderRadius: 4,
          border: "1px solid rgba(184, 134, 11, 0.2)",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "rgba(184, 134, 11, 0.4)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          color: "#2C2C2C",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(184, 134, 11, 0.15)",
        },
      },
    },
  },
  shape: {
    borderRadius: 4,
  },
  shadows: [
    "none",
    "0 1px 3px rgba(0, 0, 0, 0.06)",
    "0 2px 6px rgba(0, 0, 0, 0.08)",
    "0 4px 12px rgba(0, 0, 0, 0.1)",
    "0 6px 16px rgba(0, 0, 0, 0.12)",
    "0 8px 20px rgba(0, 0, 0, 0.14)",
    "0 10px 24px rgba(0, 0, 0, 0.16)",
    "0 12px 28px rgba(0, 0, 0, 0.18)",
    "0 14px 32px rgba(0, 0, 0, 0.2)",
    "0 16px 36px rgba(0, 0, 0, 0.22)",
    "0 18px 40px rgba(0, 0, 0, 0.24)",
    "0 20px 44px rgba(0, 0, 0, 0.26)",
    "0 22px 48px rgba(0, 0, 0, 0.28)",
    "0 24px 52px rgba(0, 0, 0, 0.3)",
    "0 26px 56px rgba(0, 0, 0, 0.32)",
    "0 28px 60px rgba(0, 0, 0, 0.34)",
    "0 30px 64px rgba(0, 0, 0, 0.36)",
    "0 32px 68px rgba(0, 0, 0, 0.38)",
    "0 34px 72px rgba(0, 0, 0, 0.4)",
    "0 36px 76px rgba(0, 0, 0, 0.42)",
    "0 38px 80px rgba(0, 0, 0, 0.44)",
    "0 40px 84px rgba(0, 0, 0, 0.46)",
    "0 42px 88px rgba(0, 0, 0, 0.48)",
    "0 44px 92px rgba(0, 0, 0, 0.5)",
    "0 46px 96px rgba(0, 0, 0, 0.52)",
  ],
});

export default theme;
