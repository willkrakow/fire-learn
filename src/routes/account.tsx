import React from "react";
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
  Grid,
  Button,
} from "@material-ui/core";
import { useAuth } from "../contexts/authContext";
import { Redirect } from "react-router-dom";
import {
  Phone,
  Mail,
  Edit,
  Check,
  VpnKey,
  CalendarToday,
} from "@material-ui/icons";
import { User } from "firebase/auth";
import { Timestamp } from "@firebase/firestore";
import { EditEmailSection } from "../components/forms";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100vw",
    overflow: "hidden",
  },
  box: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  verified: {
    fontSize: theme.typography.h6.fontSize,
    color: theme.palette.success.main,
  },
  profileImage: {
    width: "100%",
    height: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  listItem: {
    padding: theme.spacing(1),
  }
}));

const parseTimestamp = (timestampString: string) => {
  return Timestamp.fromDate(new Date(timestampString))
    .toDate()
    .toLocaleString();
};

const Account = () => {
  const classes = useStyles();
  const auth = useAuth() as IAuthContext;
  const { currentUser, resetPassword } = auth;

  const { metadata, displayName, email, emailVerified, phoneNumber, uid } =
    (currentUser as User) || {};
  const { creationTime, lastSignInTime } = metadata || {};

  const [editingEmail, setEditingEmail] = React.useState(false);
  if (!auth?.currentUser) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { referrer: "/account" },
        }}
      />
    );
  }

  const createdAt = parseTimestamp(creationTime || "");
  const lastSignIn = parseTimestamp(lastSignInTime || "");
  return (
    auth.currentUser && (
      <Paper className={classes.root}>
        <Typography variant="h2">Account</Typography>
        <Grid container>
          <Divider />
          <Grid item xs={12}>
            <Box className={classes.box}>
              <List>
                <ListItem divider className={classes.listItem}>
                  <ListItemIcon>
                    <Edit fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ variant: "h6" }}
                    secondaryTypographyProps={{ variant: "body1" }}
                    primary="Name"
                    secondary={displayName}
                  />
                </ListItem>
                <ListItem divider className={classes.listItem}>
                  <ListItemIcon>
                    <VpnKey fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ variant: "h6" }}
                    secondaryTypographyProps={{ variant: "body1" }}
                    primary="UID"
                    secondary={uid}
                  />
                </ListItem>
                <ListItem divider className={classes.listItem}>
                  <ListItemIcon>
                    <Mail fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ variant: "h6" }}
                    secondaryTypographyProps={{ variant: "body1" }}
                    primary="Email"
                    secondary={email}
                  />
                  <Button variant="text" onClick={() => setEditingEmail(true)}>
                    Edit
                  </Button>
                </ListItem>
                {editingEmail && (
                  <ListItem>
                    <EditEmailSection auth={auth} />
                    <Button onClick={() => setEditingEmail(false)}>
                      Cancel
                    </Button>
                  </ListItem>
                )}
                <ListItem divider className={classes.listItem}>
                  <ListItemIcon>
                    <Check fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ variant: "h6" }}
                    secondaryTypographyProps={{ variant: "body1" }}
                    primary="Email Verified"
                    secondary={emailVerified ? "Yes" : "No"}
                  />
                </ListItem>
                <ListItem divider className={classes.listItem}>
                  <ListItemIcon>
                    <Phone fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ variant: "h6" }}
                    secondaryTypographyProps={{ variant: "body1" }}
                    primary="Phone"
                    secondary={phoneNumber}
                  />
                </ListItem>
                <ListItem divider className={classes.listItem}>
                  <ListItemIcon>
                    <CalendarToday fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ variant: "h6" }}
                    secondaryTypographyProps={{ variant: "body1" }}
                    primary="Created at"
                    secondary={createdAt}
                  />
                </ListItem>
                <ListItem divider className={classes.listItem}>
                  <ListItemIcon>
                    <CalendarToday fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ variant: "h6" }}
                    secondaryTypographyProps={{ variant: "body1" }}
                    primary="Last login"
                    secondary={lastSignIn}
                  />
                </ListItem>
              </List>
            </Box>
            <Divider />
            <Box>
              <Typography variant="h4">Change Password</Typography>
              <Button
                color="secondary"
                variant="outlined"
                onClick={async () => email && (await resetPassword(email))}
              >
                Reset password
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    )
  );
};


// const LinkedAccounts = (user: User) => {
//   const { providerData } = user;
//   return (
//     <List>
//       {providerData.map((provider, index) => (
//         <ListItem key={index} component={Card}>
//           <ListItemIcon>
//             {provider.providerId === "facebook.com" && <Facebook />}
//             {provider.providerId === "twitter.com" && <Twitter />}
//             {provider.providerId === "github.com" && <GitHub />}
//             {provider.providerId === "google.com" && <Mail />}
//           </ListItemIcon>
//           <ListItemText
//             primary={provider.displayName}
//             secondary={provider.email}
//           />
//         </ListItem>
//       ))}
//     </List>
//   );
// };

export default Account;
