import React from "react";
import { Button, TextField, Typography, makeStyles } from "@material-ui/core";
import { useAuth } from "../../contexts";
import { useHistory } from "react-router";
import { Alert } from "@material-ui/lab";
import { User } from "firebase/auth";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    "& div": {
      margin: theme.spacing(1),
      flex: `100%`,
    },
  },
  saveButton: {
    margin: theme.spacing(1),
    flex: `100%`,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}));

const EditAccount = () => {
  const classes = useStyles();
  const history = useHistory();
  const { currentUser, updateUserEmail, updateUserName, } = useAuth() as IAuthContext;
  const myCurrentUser = currentUser as User;
  const [values, setValues] = React.useState({
    name: myCurrentUser?.displayName || "",
    email: myCurrentUser?.email || "",
  });
  const [error, setError] = React.useState("");
  const [ success, setSuccess ] = React.useState<boolean | null>(null)

  // Update the state with the new values
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (values.email.length < 5) {
      setError("Email must be at least 5 characters");
      return; // don't submit
    }
    if (!values.email.includes("@") || !values.email.includes(".")) {
      setError("Email must be valid");
      return; // don't submit
    }
    values.email !== myCurrentUser?.email && updateUserEmail(values.email);
    values.name !== myCurrentUser?.displayName && updateUserName(values.name);
    try {
      await updateUserEmail(values.email);
      await updateUserName(values.name);

      setError("");
      handleSuccess();
    } catch (error) {
      console.error(error)
      setError("Something went wrong. Refreshing...")
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };
  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      history.push("/account");
    }, 2000);
  };

  return (
    <>
    <form onSubmit={handleSubmit} className={classes.root}>
      <TextField
        variant="filled"
        name="name"
        label="Name"
        value={values.name}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        variant="filled"
        name="email"
        label="Email"
        value={values.email}
        onChange={handleChange}
        margin="normal"
      />

      {error.length > 0 && (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      )}
      {success && (
      <Alert severity="success">
        Successfully updated
        </Alert>
        )}
      <Button className={classes.saveButton} disabled={error.length > 0 || success === true} type="submit">
        Save
      </Button>
    </form>
    </>
  );
};

export default EditAccount
