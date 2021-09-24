import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";


const useSnackbar = (
  defaultMessage: string = "",
  defaultSeverity: "success" | "info" | "warning" | "error" = "info",
  anchorVertical: "top" | "bottom" = "bottom",
  anchorHorizontal: "left" | "center" | "right" = "center",
) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState(defaultMessage);
  const [severity, setSeverity] = React.useState(defaultSeverity);




  const handleClose = () => {
    setOpen(false);
  };

  const SnackbarAlert: React.FC = () => (
    <Snackbar
      anchorOrigin={{ vertical: anchorVertical, horizontal: anchorHorizontal }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );



  return {
    open,
    setOpen,
    message,
    setMessage,
    severity,
    setSeverity,
    SnackbarAlert
  }
}; 
export default useSnackbar;
