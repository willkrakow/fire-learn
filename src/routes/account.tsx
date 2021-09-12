import React from "react";
import {
  makeStyles,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Box,
  Button,
  ListItemAvatar,
  Card,
  CardContent,
  CardActions,
  Avatar,
  CardHeader,
  CardMedia,
  CardActionArea,
} from "@material-ui/core";
import { useAuth } from "../contexts/authContext";
import { Link, Redirect } from "react-router-dom";
import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { DeleteAccount } from "src/components/forms";
import { useStorage } from "src/contexts/storageContext";
import { EditOutlined } from "@material-ui/icons";
import ProfileImageUpload from "src/components/forms/profileImageUpload";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100vw",
    overflow: "hidden",
  },
  card: {
    marginBottom: theme.spacing(3),
  },
  cardDanger: {
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.error.light,
  },
  verified: {
    fontSize: theme.typography.h6.fontSize,
    color: theme.palette.success.main,
  },
  listItem: {
    padding: theme.spacing(1),
  },
  editButton: {
    margin: theme.spacing(2, "auto")
  },
  media: {
    height: 300,
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
  const { currentUser } = auth;
  const { metadata, displayName, email, emailVerified, phoneNumber, uid, photoURL } =
    (currentUser as User) || {};
  const { creationTime, lastSignInTime } = metadata || {};
  const [tempImage, setTempImage] = React.useState<string | null>(null);

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
      <Box>
        <Card elevation={0} className={classes.card}>
          <CardMedia
            image={tempImage || photoURL || ""}
            className={classes.media}
          >
            <ProfileImageUpload setTempImage={setTempImage} />
          </CardMedia>
          <CardContent>
            <Typography align="center" variant="h3">
              {displayName}
            </Typography>
            <Typography align="center" variant="h5">
              {email}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              className={classes.editButton}
              variant="outlined"
              component={Link}
              to="/account/edit"
            >
              Edit info
            </Button>
          </CardActions>
        </Card>

        <Card elevation={0} className={classes.card}>
          <CardContent>
            <Typography variant="h4">Info</Typography>
            <List>
              <ListItem className={classes.listItem}>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "body1",
                  }}
                  secondaryTypographyProps={{
                    variant: "h5",
                  }}
                  primary="Name"
                  secondary={displayName}
                />
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "body1",
                  }}
                  secondaryTypographyProps={{
                    variant: "h5",
                  }}
                  primary="UID"
                  secondary={uid}
                />
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "body1",
                  }}
                  secondaryTypographyProps={{
                    variant: "h5",
                  }}
                  primary="Email"
                  secondary={email}
                />
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "body1",
                  }}
                  secondaryTypographyProps={{
                    variant: "h5",
                  }}
                  primary="Email Verified"
                  secondary={emailVerified ? "Yes" : "No"}
                />
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "body1",
                  }}
                  secondaryTypographyProps={{
                    variant: "h5",
                  }}
                  primary="Phone"
                  secondary={
                    phoneNumber || (
                      <Button
                        variant="outlined"
                        component={Link}
                        to="/account/edit"
                      >
                        + Add
                      </Button>
                    )
                  }
                />
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "body1",
                  }}
                  secondaryTypographyProps={{
                    variant: "h5",
                  }}
                  primary="Created at"
                  secondary={createdAt}
                />
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "body1",
                  }}
                  secondaryTypographyProps={{
                    variant: "h5",
                  }}
                  primary="Last login"
                  secondary={lastSignIn}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
        <Card elevation={0} className={classes.card}>
          <CardContent>
            <Typography variant="h4">Linked accounts</Typography>
            <LinkedAccounts {...currentUser} />
          </CardContent>
        </Card>
        <Card component={Box} className={classes.cardDanger} elevation={0}>
          <CardContent>
            <Typography variant="h4" color="error">
              Danger zone
            </Typography>
            <Typography variant="body1">
              Actions here are either irreversible or just plain risky. Proceed
              at your own risk.
            </Typography>
          </CardContent>
          <CardActions>
            <DeleteAccount />
          </CardActions>
        </Card>
      </Box>
    )
  );
};

const LinkedAccounts = (user: User) => {
  const { providerData } = user;
  return (
    <List>
      {providerData.map((provider, index) => (
        <ListItem key={index} component={Card}>
          <ListItemAvatar>
            <Avatar src={provider.photoURL || ""} />
          </ListItemAvatar>
          <ListItemText
            primary={provider.providerId.slice(0, 1).toUpperCase() + provider.providerId.replace(".com", "").slice(1)}
            secondary={provider.email}
            primaryTypographyProps={{
              variant: "body1",
            }}
            secondaryTypographyProps={{
              variant: "h6",
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Account;
