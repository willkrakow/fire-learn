import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { User } from 'firebase/auth'

interface IEditEmailSectionProps {
  auth: IAuthContext;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: "auto",
    minHeight: "100vh",
    width: "100%",
  },
  form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
  }
}));

const EditEmailSection = ({ auth }: IEditEmailSectionProps) => {
  const classes = useStyles();
  const { currentUser, updateUserEmail } = auth;
  
  const [error, setError] = React.useState<string | null>(null);
  const { email } = (currentUser as User) || {};

  const [emailToUpdate, setEmailToUpdate] = React.useState(email);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailToUpdate(event.target.value);
  };

  const handleSubmit = async () => {
    if (!emailToUpdate) {
      setError("Email is required");
      return;
    }
    if (
      !emailToUpdate.includes("@") ||
      !emailToUpdate.includes(".") ||
      emailToUpdate.length < 5
    ) {
      setError("Email is invalid");
      return;
    }
    try {
      setError("Please enter your full email address");
      await updateUserEmail(emailToUpdate);
      setError(null);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h6">Edit Email</Typography>
      <Typography variant="h4">{error}</Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          value={emailToUpdate}
          onChange={handleChange}
          label="Email"
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default EditEmailSection;
