import React from 'react'
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { orange, blue, blueGrey } from '@material-ui/core/colors'

const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
        body: {
          minHeight: "100vh",
          backgroundColor: "#fafafa",
          display: "flex",
        },
      },
    },
  },
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: blue[200],
    },
    info: {
      main: orange[500],
      light: orange[100],
    },
    text: {
      primary: blueGrey[900],
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 200,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    button: {
      fontSize: "1rem",
      fontWeight: "bold",
      textTransform: "none",
    },
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      fontStyle: "normal",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "bold",
      fontStyle: "normal",
    },
    h3: {
      color: "transparent",
      fontSize: "1.75rem",
      fontWeight: 200,
      marginBottom: "1rem",
      background: "linear-gradient(to right, #ec8e00 0%, #d35f3c 99%)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      backgroundSize: "100% 100%",
      fontStyle: "normal",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      fontStyle: "normal",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      fontStyle: "normal",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: "bold",
      fontStyle: "normal",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: "bold",
      fontStyle: "normal",
    },
    subtitle2: {
      fontSize: "0.75rem",
      fontWeight: "normal",
      fontStyle: "italic",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: "normal",
      color: blueGrey[900],
      fontStyle: "normal",
      marginBottom: "1rem",
    },
    body2: {
      fontSize: "0.75rem",
      fontWeight: "normal",
      fontStyle: "italic",
    },
  },
});


export default function ThemeContext(props: any) {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}