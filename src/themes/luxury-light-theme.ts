import { createTheme } from "@mui/material/styles";

const luxuryLightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4A4A4A", // Soft neutral gray with warm undertones
      light: "#6E6E6E",
      dark: "#2C2C2C",
    },
    secondary: {
      main: "#A89968", // Muted gold accent
      light: "#C4B896",
      dark: "#8A7A4F",
    },
    background: {
      default: "#F8F8F8", // Soft off-white
      paper: "#FFFFFF", // Pure white
    },
    text: {
      primary: "#2C2C2C", // Rich dark gray
      secondary: "#666666", // Medium gray
    },
    divider: "rgba(0, 0, 0, 0.10)", // Subtle divider with low opacity
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontFamily: '"Oooh Baby", "cursive"',
      fontWeight: 400,
      fontSize: "3.75rem",
      letterSpacing: "0.02em",
      lineHeight: 1.2,
      color: "#2C2C2C",
    },
    h2: {
      fontFamily: '"Oooh Baby", "cursive"',
      fontWeight: 400,
      fontSize: "2.75rem",
      letterSpacing: "0.02em",
      lineHeight: 1.3,
      color: "#2C2C2C",
    },
    h3: {
      fontWeight: 500,
      fontSize: "2rem",
      letterSpacing: "0.5px",
      lineHeight: 1.4,
      color: "#2C2C2C",
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem",
      letterSpacing: "0.5px",
      lineHeight: 1.4,
      color: "#2C2C2C",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.25rem",
      letterSpacing: "0.5px",
      lineHeight: 1.5,
      color: "#2C2C2C",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      letterSpacing: "0.5px",
      lineHeight: 1.5,
      color: "#2C2C2C",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.75,
      letterSpacing: "0.03em",
      color: "#2C2C2C",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.65,
      letterSpacing: "0.03em",
      color: "#666666",
    },
    button: {
      textTransform: "uppercase",
      fontWeight: 600,
      fontSize: "0.9rem",
      letterSpacing: "1.2px",
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          padding: "12px 28px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.10)",
          },
        },
        containedPrimary: {
          backgroundColor: "#4A4A4A",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#2C2C2C",
            transform: "translateY(-1px)",
          },
        },
        outlinedPrimary: {
          color: "#4A4A4A",
          borderColor: "#4A4A4A",
          borderWidth: "1.5px",
          "&:hover": {
            borderWidth: "1.5px",
            borderColor: "#2C2C2C",
            backgroundColor: "rgba(74, 74, 74, 0.04)",
          },
        },
        text: {
          color: "#4A4A4A",
          "&:hover": {
            backgroundColor: "rgba(74, 74, 74, 0.04)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          backgroundImage: "none",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
          border: "1px solid rgba(0, 0, 0, 0.08)",
        },
        elevation0: {
          boxShadow: "none",
        },
        elevation1: {
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
        },
        elevation2: {
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
        },
        elevation3: {
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          backgroundImage: "none",
          borderRadius: 10,
          border: "1px solid rgba(0, 0, 0, 0.10)",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            borderColor: "rgba(0, 0, 0, 0.12)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.97)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
          color: "#2C2C2C",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(0, 0, 0, 0.10)",
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
  },
  shadows: [
    "none",
    "0 1px 3px rgba(0, 0, 0, 0.04)",
    "0 2px 6px rgba(0, 0, 0, 0.06)",
    "0 4px 12px rgba(0, 0, 0, 0.08)",
    "0 6px 16px rgba(0, 0, 0, 0.09)",
    "0 8px 20px rgba(0, 0, 0, 0.10)",
    "0 10px 24px rgba(0, 0, 0, 0.11)",
    "0 12px 28px rgba(0, 0, 0, 0.11)",
    "0 14px 32px rgba(0, 0, 0, 0.12)",
    "0 16px 36px rgba(0, 0, 0, 0.12)",
    "0 18px 40px rgba(0, 0, 0, 0.12)",
    "0 20px 44px rgba(0, 0, 0, 0.12)",
    "0 22px 48px rgba(0, 0, 0, 0.12)",
    "0 24px 52px rgba(0, 0, 0, 0.12)",
    "0 26px 56px rgba(0, 0, 0, 0.12)",
    "0 28px 60px rgba(0, 0, 0, 0.12)",
    "0 30px 64px rgba(0, 0, 0, 0.12)",
    "0 32px 68px rgba(0, 0, 0, 0.12)",
    "0 34px 72px rgba(0, 0, 0, 0.12)",
    "0 36px 76px rgba(0, 0, 0, 0.12)",
    "0 38px 80px rgba(0, 0, 0, 0.12)",
    "0 40px 84px rgba(0, 0, 0, 0.12)",
    "0 42px 88px rgba(0, 0, 0, 0.12)",
    "0 44px 92px rgba(0, 0, 0, 0.12)",
    "0 46px 96px rgba(0, 0, 0, 0.12)",
  ],
});

export default luxuryLightTheme;
