import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import { AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
    alert: {
        flexWrap: "wrap",
    },
    deleteButton: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.error.dark,
        },
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(1),
    },
    confirmDeleteButton: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: theme.spacing(2)
    },
  })
);

export default function DeleteAccount() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
      console.log("clicked");
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          className={classes.alert}
          severity="error"
          action={
            <Button
              aria-label="close"
              color="inherit"
              size="small"
              variant="contained"
              className={classes.deleteButton}
              onClick={handleClick}
            >
              Yes, I'd like to delete my account
            </Button>
          }
        >
          <AlertTitle>Warning!</AlertTitle>
          You are about to delete your account.{" "}
          <strong>This action is irreversible.</strong>
        </Alert>
      </Collapse>
      <Button
        className={open ? "" : classes.deleteButton}
        variant="contained"
        color={open ? "secondary" : "inherit"}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {open ? "Close" : "Delete Account"}
      </Button>
    </div>
  );
}
