import React from 'react'
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { orange, blue, blueGrey, deepOrange, deepPurple, red, grey, teal } from '@material-ui/core/colors'

const theme = createTheme({
  overrides: {
    MuiPaper: {
      root: {
        padding: 16,
      }
    },    
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
        body: {
          minHeight: "100vh",
          backgroundColor: blueGrey[50],
          display: "flex",
          flexDirection: "column",
        },
        a: {
          fontStyle: "normal",
          textDecoration: "none",
        }
      },
    },
    MuiLink: {
      root: {
        fontWeight: "bold",
        position: "relative",
        zIndex: 10,
      },
      underlineAlways: {
        textDecoration: 'none',
        "&::after": {
          content: '""',
          position: 'absolute',
          left: -2,
          right: -2,
          bottom: 1,
          top: "40%",
          zIndex: -1,
          backgroundColor: orange[100],
        }
      }
    }
  },
  palette: {
    primary: {
      main: teal[700],
      light: grey[50],
      dark: deepOrange[900],
    },
    secondary: {
      main: deepPurple[200],
    },
    info: {
      main: orange[500],
      light: orange[100],
    },
    text: {
      primary: blueGrey[900],
    },
    error: {
      main: deepOrange[500],
      light: deepOrange[50],
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 15,
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
      fontSize: "3rem",
      fontWeight: "bold",
      fontStyle: "normal",
      marginBottom: "1rem",
      background: `linear-gradient(to right, ${orange[300]} 0%, ${red[800]} 100%)`,
      color: "transparent",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    h3: {
      color: "transparent",
      fontSize: "2rem",
      fontWeight: "bold",
      background: `linear-gradient(to right, ${orange[400]} 0%, ${red[900]} 100%)`,
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      fontStyle: "normal",
    },
    h4: {
      fontSize: "1.375rem",
      fontWeight: "normal",
      marginBottom: "0.5rem",
      fontStyle: "normal",
      background: `linear-gradient(to right, ${blue[300]} 0%, ${deepPurple[900]} 100%)`,
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "transparent",
    },
    h5: {
      fontSize: "1rem",
      fontWeight: "bold",
      fontStyle: "normal",
    },
    h6: {
      fontSize: "0.875rem",
      fontWeight: "normal",
      fontStyle: "normal",
      color: blueGrey[700],
      textTransform: "uppercase",
      letterSpacing: "0.1em",
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