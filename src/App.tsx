import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home, Login, Signup } from './routes';
import Navbar from './components/navbar';

import firebaseConfig from "./config/firebaseConfig";
import {initializeApp} from 'firebase/app';
import { AuthProvider } from './contexts'
import ThemeContext from './theme';
import { CssBaseline, Paper } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Account from './routes/account';
import Browse from './routes/browse';
import Course from './routes/course';
import EditAccount from './components/forms/editAccount';
import { StorageProvider } from './contexts/storageContext';

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    marginBottom: theme.spacing(2),
    flexDirection: "column",
    alignItems: "center",
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
initializeApp(firebaseConfig);
  return (
    <React.Fragment>
      <AuthProvider>
        <StorageProvider>
          <ThemeContext>
            <CssBaseline />
            <BrowserRouter>
              <Navbar />
              <Paper component="main" className={classes.main}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/account/edit" component={EditAccount} />
                  <Route path="/account" exact component={Account} />
                  <Route path="/browse" component={Browse} />
                  <Route path="/courses/:course_id" component={Course} />
                </Switch>
              </Paper>
            </BrowserRouter>
          </ThemeContext>
        </StorageProvider>
      </AuthProvider>
    </React.Fragment>
  );
}




export default App;
