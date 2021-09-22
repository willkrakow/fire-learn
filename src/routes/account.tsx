import React from "react";
import {
  makeStyles,
  Typography,
  ListItem,
  ListItemText,
  List,
  Box,
  Button,
  ListItemAvatar,
  Card,
  CardContent,
  CardActions,
  Avatar,
  CardMedia,
  Chip,
} from "@material-ui/core";
import { useAuth } from "../contexts";
import { Link, Redirect } from "react-router-dom";
import { User } from "firebase/auth";
import { DeleteAccount, ProfileImageUpload } from "../components/forms";
import { Check } from "@material-ui/icons";
import { parseTimestamp } from "../utils/parseTimestamp";

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
    margin: theme.spacing(2, "auto"),
  },
  media: {
    height: 300,
  },
  chip: {
    color: theme.palette.primary.contrastText,
    "& span": {},
  },
  check: {
    color: theme.palette.primary.contrastText,
  },
  none: {
    color: theme.palette.grey[400]
  }
}));

const Account = () => {
  const classes = useStyles();
  const auth = useAuth() as IAuthContext;
  const { currentUser } = auth;
  const { metadata, displayName, email, emailVerified, phoneNumber, photoURL } =
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

  interface IListItem {
    primary: string;
    secondary: string | React.ReactNode | React.ReactElement;

  }
  const accountListItems: IListItem[] = [
    {
      primary: "Name",
      secondary: displayName,
    },
    {
      primary: "Email",
      secondary: (
        <>
          {email}
          <br />
          {emailVerified ? (
            <>
              <Chip
                icon={<Check color="primary" />}
                color="primary"
                variant="outlined"
                label="Verified"
                size="small"
              />
            </>
          ) : (
            <Chip label="Not Verified" color="secondary" />
          )}
        </>
      ),
    },
    {
      primary: "Phone Number",
      secondary: phoneNumber || <span className={classes.none}>None</span>,
    },
    {
      primary: "Created at",
      secondary: createdAt,
    },
    {
      primary: "Last sign in",
      secondary: lastSignIn,
    },
  ];
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

        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h3">Info</Typography>
            <List>
              {accountListItems.map((item) => (
                <ListItem key={item.primary} className={classes.listItem}>
                  <ListItemText
                  primaryTypographyProps={{
                    variant: "h6",
                  }}
                  secondaryTypographyProps={{
                    variant: "h4",
                  }}
                  primary={item.primary}
                  secondary={item.secondary}
                />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
        <Card elevation={0} className={classes.card}>
          <CardContent>
            <Typography variant="h3">Linked accounts</Typography>
            <LinkedAccounts {...currentUser} />
          </CardContent>
        </Card>
        <Card component={Box} className={classes.cardDanger} elevation={0}>
          <CardContent>
            <Typography variant="h3" color="error">
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
