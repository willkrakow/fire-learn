import React from "react";
import { useFirestore, useAuth } from "../../../contexts";
import { RouteComponentProps } from "react-router";
import {
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import UserProfile from "./userProfile";
import UserEnrollments from "./userEnrollments";

interface TParams {
  userId: string;
}

export interface ISnackbar {
    open: boolean,
    message: string
}


const UserEditor = ({ match }: RouteComponentProps<TParams>) => {

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [user, setUser] = React.useState<UserDocument | null>(null);
  const { getDocument, updateDocument } = useFirestore() as IFirestoreContext;
  const { resetPassword } = useAuth() as IAuthContext;
  const [ snackbar, setSnackbar ] = React.useState<ISnackbar>({open: false, message: ""});

  const handleSnackbarClose = () => {
      setSnackbar({open: false, message: ""});
  }

  const handleSnackbarOpen = (message: string, duration: number = 3000 ) => {
    setSnackbar({open: true, message: message});
    setTimeout(() => {
        setSnackbar({open: false, message: ""});
    }, duration);
  }

  const { userId } = match.params;
  React.useEffect(() => {
    setLoading(true);
    getDocument(`users/${userId}`)
      .then(setUser)
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
        handleSnackbarOpen(`User loaded`);
      })
  }, [userId, getDocument]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    user?.data && updateDocument({path: `users/${userId}`, data: user.data})
    .then(() => {
      setLoading(false);
      handleSnackbarOpen(`User updated`);
    })
    .catch((error) => {
      setLoading(false);
      handleSnackbarOpen(error.message);
    })

  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: field, value } = event.target;
    if (!user) {
      setError("User not found");
      return;
    }
    setUser({
      id: userId,
      data: {
        ...user.data,
        [field]: value,
      },
    });
  };

  // Cancel changes, revert to user data
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
      handleSnackbarOpen(`Reverting changes...`);
    window.location.reload()
  }

  const handleResetPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    user?.data?.email && resetPassword(user?.data?.email)
    .then(() => {
      setLoading(false);
      handleSnackbarOpen(`Password reset for ${user?.data?.email}`);
    })
    .catch((error) => {
      setLoading(false);
      handleSnackbarOpen(error.message);
    })
  }
  return (
    <>
      <Typography variant="h2">Edit user</Typography>
      {loading && <CircularProgress />}
      {error && <div>{error}</div>}
      {user && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
          <UserProfile
            snackbar={snackbar}
            handleSnackbarClose={handleSnackbarClose}
            handleSubmit={handleSubmit}
            user={user}
            handleChange={handleChange}
            handleResetPassword={handleResetPassword}
            handleCancel={handleCancel}
          />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserEnrollments userId={userId} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default UserEditor;
