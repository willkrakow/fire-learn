import React from "react";
import { Button, Card, TextField, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Redirect } from "react-router";
import { useAuth } from "../contexts/authContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
      margin: "auto",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(2),
    },
    form: {
      width: "100%",
      padding: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
    },
    title: {
      textAlign: "center",
    },
    button: {
      marginTop: theme.spacing(2),
      backgroundColor: theme.palette.info.main,
    },
    googleButton: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
    },
    orText: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      textAlign: "center",
    },
  })
);

export default function Login({...props}) {
  const classes = useStyles();
  const referrer = props.location.state?.referrer || "/";
  const auth = useAuth()
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const [error, setError] = React.useState("");

  const handleChangePassword: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setPassword(event.currentTarget.value);
  };

  const handleChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setEmail(event.currentTarget.value);
  };


  return auth?.currentUser ? (
    <Redirect to={referrer} />
  ) : (
    <Card className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        Sign in to FireLearn
      </Typography>
      <form className={classes.form}>
        <TextField
          value={email}
          onChange={handleChangeEmail}
          label="Email"
          type="email"
        />
        <TextField
          value={password}
          onChange={handleChangePassword}
          label="Password"
          type="password"
        />
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          onClick={async () => auth && await auth.login(email, password)}
        >
          Sign in
        </Button>
      </form>
      <Typography className={classes.orText} variant="h6">
        or
      </Typography>
      <Button
        variant="contained"
        className={classes.googleButton}
        color="primary"
        onClick={async () => auth && await auth.signInWithGoogle()}
      >
        Log in with Google
      </Button>
    </Card>
  );
}
