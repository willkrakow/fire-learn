import React from "react";
import {
  makeStyles,
  Theme,
  Button,
  TextField,
  Grid,
  ButtonGroup,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import {ISnackbar} from './userEditor'


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  textField: {},
  form: {
    maxWidth: 1200,
  },
}));

interface Props {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>,
  user: UserDocument,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleResetPassword: (e: React.MouseEvent<HTMLButtonElement>) => void,
  handleCancel: (e: React.MouseEvent<HTMLButtonElement>) => void,
  snackbar: ISnackbar,
  handleSnackbarClose: () => void,
}

function UserProfile({
  handleSubmit,
  user,
  handleChange,
  handleResetPassword,
  handleCancel,
  snackbar,
  handleSnackbarClose
}: Props) {
  const classes = useStyles();

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Grid container spacing={5} className={classes.root}>
          <Grid item xs={12} md={6}>
            <TextField
            InputLabelProps={{ shrink: true }}
              variant="outlined"
              className={classes.textField}
              name="name"
              label="Name"
              value={user.data.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
            InputLabelProps={{ shrink: true }}
              variant="outlined"
              className={classes.textField}
              label="Email"
              value={user.data.email}
              name="email"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
            InputLabelProps={{ shrink: true }}
              variant="outlined"
              className={classes.textField}
              label="Phone"
              value={user.data?.phoneNumber}
              name="phone"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
            InputLabelProps={{ shrink: true }}
              variant="outlined"
              className={classes.textField}
              label="Birthday"
              type="date"
              value={user.data.birthdate.toDate().toISOString().split("T")[0]}
              name="birthdate"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
            InputLabelProps={{ shrink: true }}
              variant="outlined"
              fullWidth
              label="Bio"
              value={user.data.bio}
              name="bio"
              onChange={handleChange}
              className={classes.textField}
              minRows={3}
              multiline
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleResetPassword}
            >
              Reset password
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <ButtonGroup>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Discard changes
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
}

export default UserProfile