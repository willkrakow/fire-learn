import React from "react";
import { RouteComponentProps, useRouteMatch } from "react-router";
import {
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Theme,
} from "@material-ui/core";
import { useFirestore } from "../../contexts";
import { PrimaryButton } from "../buttons";
import { parseTimestamp } from "../../utils";

interface TParams {
  userId: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
      width: "100%",
  }
}));

const UserEditor = ({ match }: RouteComponentProps<TParams>) => {
  const { params } = useRouteMatch<TParams>();
  const [loading, setLoading] = React.useState(false);
  const [userData, setUserData] = React.useState<UserDocument | null>(null);
  const classes = useStyles();

  const { getDocument, updateDocument } = useFirestore() as IFirestoreContext;
  //   const {
  //     currentUser,
  //     updateUserEmail,
  //     updateUserName,
  //     isAdmin,
  //     resetPassword,
  //   } = useAuth() as IAuthContext;

  React.useEffect(() => {
    if (params.userId) {
      setLoading(true);
      getDocument(`users/${params.userId}`).then((user) => {
        setUserData(user);
        setLoading(false);
        console.log(user);
      });
    }

    return () => {
      setUserData(null);
    };
  }, [params.userId, getDocument]);

  const updateUser = React.useCallback(
    async (user: UserDocument) => {
      setLoading(true);
      await updateDocument({ path: `users/${params.userId}`, data: user });
      setLoading(false);
    },
    [params.userId, setLoading, updateDocument]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    userData && (await updateUser(userData));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (userData) {
      setUserData({
        id: userData.id,
        data: {
          ...userData.data,
          [name]: value,
        },
      });
    }
  };
  return (
    <Grid container>
      <Grid item xs={12} lg={6}>
        {userData && !loading ? (
          <form
            className={classes.form}
            onSubmit={(e) => handleSubmit(e.currentTarget.value)}
          >
            <Grid container component={Paper}>
              <Grid item xs={12}>
                <TextField
                    fullWidth
                  name="name"
                  label="Name"
                  value={userData.data.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                    fullWidth
                  name="email"
                  label="Email address"
                  value={userData.data.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                    fullWidth
                  name="phoneNumber"
                  label="Phone number"
                  value={userData.data.phoneNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                    fullWidth
                  name="bio"
                  label="Bio"
                  multiline
                  minRows={3}
                  value={userData.data.bio}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                    fullWidth
                  name="birthdate"
                  label="Birthday"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={userData.data.birthdate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                    fullWidth
                  name="created_at"
                  label="Created at"
                  disabled
                  value={parseTimestamp(userData.data.created_at)}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <PrimaryButton className={classes.button} type="submit">Save</PrimaryButton>
              </Grid>
            </Grid>
          </form>
        ) : (
          <CircularProgress />
        )}
      </Grid>
      <Grid item xs={12} lg={6}></Grid>
    </Grid>
  );
};

export default UserEditor;
