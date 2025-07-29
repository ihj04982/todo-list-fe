import { createTheme } from "@mui/material/styles";

const paletteColours = {
  primary: {
    main: "#cfff8f", // 연한 초록
    light: "#e6ffb3", // 더 연한 초록
    dark: "#a8cc72", // 진한 초록
    contrastText: "#2D3748",
  },
  secondary: {
    main: "#ffe6f1", // 연한 핑크
    light: "#fff2f7", // 더 연한 핑크
    dark: "#ccb8c1", // 진한 핑크
    contrastText: "#2D3748",
  },
  info: {
    main: "#fed0fe", // 라벤더 핑크
    light: "#fee8fe", // 더 연한 라벤더
    dark: "#cba6cb", // 진한 라벤더
    contrastText: "#2D3748",
  },
  warning: {
    main: "#ffa1e3", // 중간 핑크
    light: "#ffccf0", // 연한 중간 핑크
    dark: "#cc81b6", // 진한 중간 핑크
    contrastText: "#2D3748",
  },
  error: {
    main: "#ff78ee", // 진한 핑크
    light: "#ff9cf3", // 연한 진한 핑크
    dark: "#cc60be", // 매우 진한 핑크
    contrastText: "#ffffff",
  },
  background: {
    default: "#fefffe", // 매우 연한 크림
    paper: "#ffffff", // 순백
  },
  text: {
    primary: "#492883", // 진한 보라
    secondary: "#4A5568", // 중간 회색
    disabled: "#A0AEC0", // 비활성 텍스트
  },
  divider: "#E2E8F0", // 연한 회색 라인
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: paletteColours.primary,
    secondary: paletteColours.secondary,
    info: paletteColours.info,
    background: paletteColours.background,
    text: paletteColours.text,
    divider: paletteColours.divider,
  },
  typography: {
    fontFamily: ["Nesatho", "Roboto", "Noto Sans KR", "sans-serif"].join(", "),
    h1: {
      fontFamily: ["LovelaceScript", "serif"].join(", "),
      fontWeight: 700,
      fontSize: "3rem",
      lineHeight: 1.15,
      letterSpacing: "-0.02em",
      color: paletteColours.text.primary,
    },
    h2: {
      fontFamily: ["LovelaceScript", "serif"].join(", "),
      fontWeight: 700,
      fontSize: "2.25rem",
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
      color: paletteColours.text.primary,
    },
    h3: {
      fontFamily: ["LovelaceScript", "serif"].join(", "),
      fontWeight: 700,
      fontSize: "1.75rem",
      lineHeight: 1.25,
      color: paletteColours.text.primary,
    },
    body1: {
      fontFamily: ["Roboto", "Noto Sans KR", "sans-serif"].join(", "),
      fontSize: "1rem",
      lineHeight: 1.6,
      color: paletteColours.text.primary,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
      color: paletteColours.text.secondary,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      color: paletteColours.text.primary,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      color: paletteColours.text.secondary,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'LovelaceScript';
          src: url('/Lovelace-Script-Medium.ttf') format('truetype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        
        @font-face {
          font-family: 'LovelaceScript';
          src: url('/Lovelace-Script-Extrabold.ttf') format('truetype');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
        
        @font-face {
          font-family: 'Nesatho';
          src: url('/Nesatho.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        body {
          background-color: ${paletteColours.background.default};
          color: ${paletteColours.text.primary};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background: linear-gradient(135deg, #a7cbed 0%, #a8bc7f 100%),
            url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2P4//8/AwAI/AL+Qn6WAAAAAElFTkSuQmCC') repeat;
          background-blend-mode: overlay;
          background-size: 150% 150%;
        }
      `,
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          padding: "6px 16px",
          fontWeight: 600,
          border: `2px solid ${paletteColours.text.primary}`,
        },
        containedPrimary: {
          color: paletteColours.primary.contrastText,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: paletteColours.primary.main,
          color: paletteColours.primary.contrastText,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: paletteColours.background.paper,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: paletteColours.background.paper,
            border: `2px solid ${paletteColours.text.primary}`,
            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
          },
          "& .MuiInputLabel-root": {
            color: paletteColours.text.primary,
            "&.Mui-focused": {
              color: paletteColours.text.primary,
            },
          },
        },
      },
    },
  },
});

export default theme;
