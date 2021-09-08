import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home, Login, Signup } from './routes';
import Navbar from './components/navbar';

import firebaseConfig from "./config/firebaseConfig";
import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { AuthContext } from './contexts'
import ThemeContext from './theme';
import { CssBaseline, Paper } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Account from './routes/account';
import { getFirestore } from 'firebase/firestore';
// Initialize Firebase

initializeApp(firebaseConfig)

/// @ts-ignore
const db = getFirestore()
const auth = getAuth()
const useStyles = makeStyles((theme) => ({
  root: {},
  main: {
    display: "flex",
    marginBottom: theme.spacing(2),
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    minHeight: "90vh",
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AuthContext.Provider value={auth}>
        <ThemeContext>
          <CssBaseline />
          <BrowserRouter>
            <Navbar />
            <Paper component="main" className={classes.main}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/account" component={Account} />
              </Switch>
            </Paper>
          </BrowserRouter>
        </ThemeContext>
      </AuthContext.Provider>
    </React.Fragment>
  );
}




export default App;
