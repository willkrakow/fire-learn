import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home, Login, Signup } from './routes';
import Navbar from './components/navbar';

import {initializeApp} from 'firebase/app';
import { AuthProvider, StorageProvider, FirestoreProvider } from './contexts'
import ThemeContext from './theme';
import { CssBaseline, Box } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Account from './routes/account';
import Browse from './routes/browse';
import Course from './routes/course';
import EditAccount from './components/forms/editAccount';
import firebaseConfig from './config/firebaseConfig';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  main: {
    marginBottom: theme.spacing(2),
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  root: {},
  toolbar: theme.mixins.toolbar,
}));

function App() {
  const classes = useStyles();
  initializeApp(firebaseConfig);
  return (
    <React.Fragment>
      <AuthProvider>
        <StorageProvider>
          <FirestoreProvider>
          <ThemeContext>
            <CssBaseline />
            <BrowserRouter>
            <div className={classes.root}>
              <Navbar />
              <Box component="main" className={classes.main}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/account/edit" component={EditAccount} />
                  <Route path="/account" exact component={Account} />
                  <Route path="/courses" exact component={Browse} />
                  <Route path="/courses/:courseId" render={renderProps => <Course courseId={renderProps.match.params.courseId} />} />
                </Switch>
              </Box>
            </div>
            </BrowserRouter>
          </ThemeContext>
          </FirestoreProvider>
        </StorageProvider>
      </AuthProvider>
    </React.Fragment>
  );
}




export default App;
