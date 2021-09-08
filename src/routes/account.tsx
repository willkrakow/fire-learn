import {
  makeStyles,
  Paper,
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
  List,
  Box,
  Divider,
  IconButton,
  Card,
} from "@material-ui/core";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "../contexts";
import { Redirect } from "react-router-dom";
import { Facebook, Twitter, GitHub, Mail, Edit } from "@material-ui/icons";
import { User } from 'firebase/auth'

// const millisecondsToDate = (milliseconds: str | number): Date => {
//     if (typeof milliseconds === "string") {
//       milliseconds = Number(milliseconds);
//     }

//     const myDate = new Date()
//     myDate.setUTCMilliseconds(milliseconds)
//     return myDate
// }

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: "auto",
    minHeight: "100vh",
    width: "100%",
  },
  box: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      width: "100%",
  }
}));
const Account = () => {
  const auth = React.useContext(AuthContext);
  const [user, loading, error]: AuthState = useAuthState(auth);
  const classes = useStyles();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { referrer: "/account" },
        }}
      />
    );
  }

  const createdAt = new Date(parseInt(user.metadata.createdAt)).toLocaleString()
  const lastSignIn = new Date(parseInt(user.metadata.lastLoginAt)).toLocaleString()

  return (
    <Paper className={classes.root}>
      <Typography variant="h2">Account</Typography>
      <Box className={classes.box}>
        <Typography variant="h3">Basic info</Typography>
        <Typography variant="h6">Name</Typography>
        <Typography variant="body1">
          {user.displayName}
          <IconButton color="primary" size="small">
            <Edit fontSize="small" />
          </IconButton>
        </Typography>
        <Typography variant="h6">Created at</Typography>
        <Typography variant="body1">{createdAt}</Typography>
        <Typography variant="h6">Last sign in</Typography>
        <Typography variant="body1">{lastSignIn}</Typography>
      </Box>
      <Divider />
      <Box className={classes.box}>
        <Typography variant="h3">Contact</Typography>
        <Typography variant="h6">Email</Typography>
        <Typography variant="body1">
          {user.email}
          <IconButton color="primary" size="small">
            <Edit fontSize="small" />
          </IconButton>
        </Typography>
        <Typography variant="h6">Phone</Typography>
        <Typography variant="body1">
          {user?.phoneNumber}
          <IconButton color="primary" size="small">
            <Edit fontSize="small" />
          </IconButton>
        </Typography>
      </Box>
      <Divider />

      <Box className={classes.box}>
        <Typography variant="h3">Linked accounts</Typography>
        <LinkedAccounts {...user} />
      </Box>
    </Paper>
  );
};


const LinkedAccounts = (user: User) => {
    const { providerData } = user
    return (
        <List>
            {providerData.map((provider, index) => (
                <ListItem key={index} component={Card}>
                    <ListItemIcon>
                        {provider.providerId === "facebook.com" && <Facebook />}
                        {provider.providerId === "twitter.com" && <Twitter />}
                        {provider.providerId === "github.com" && <GitHub />}
                        {provider.providerId === "google.com" && <Mail />}
                    </ListItemIcon>
                    <ListItemText primary={provider.displayName} secondary={provider.email} />
                </ListItem>
            ))}
        </List>
    )
}

export default Account;
