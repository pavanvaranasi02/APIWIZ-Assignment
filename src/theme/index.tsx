import { createTheme } from "@mui/material/styles";

export const baseColors = {
  primary: "#6B9AC4",
  secondary: "#97D8C4",
  background: "#F8F9FA",
  surface: "#FFFFFF",
  text: "#2C3E50",
};

export const moodColors = {
  happy: "#FFD93D",
  excited: "#FF6B6B",
  calm: "#95E1D3",
  sad: "#A8B8C1",
  angry: "#FF7675",
  neutral: "#E9ECEF",
};

export const theme = createTheme({
  palette: {
    primary: {
      main: baseColors.primary,
    },
    secondary: {
      main: baseColors.secondary,
    },
    background: {
      default: baseColors.background,
      paper: baseColors.surface,
    },
    text: {
      primary: baseColors.text,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});
