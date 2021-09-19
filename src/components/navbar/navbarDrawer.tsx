import React from "react";
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { User } from "firebase/auth";
import {
  Person,
  ExitToApp,
  Book,
  Grade,
  PersonAdd,
  AssignmentInd,
} from "@material-ui/icons";

interface Props {
  currentUser: User;
  handleLogout: () => void;
  handleClick: (path: string) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    ...theme.mixins.toolbar,
    borderRadius: 0,
  },
}));

const NavbarDrawer = ({ currentUser, handleLogout, handleClick }: Props) => {
  const classes = useStyles();
  return (
    <>
      <List className={classes.list}>
        {currentUser && (
          <ListItem button onClick={() => handleClick("/")}>
            <ListItemIcon>
              <Grade />
            </ListItemIcon>
            <ListItemText primary="My courses" />
          </ListItem>
        )}
        {currentUser && (
          <ListItem button onClick={() => handleClick("/account")}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
        )}
        <ListItem button onClick={() => handleClick("/browse")}>
          <ListItemIcon>
            <Book />
          </ListItemIcon>
          <ListItemText primary="Browse" />
        </ListItem>
        <Divider />
        {currentUser && (
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
        {!currentUser && (
          <ListItem button onClick={() => handleClick("/signup")}>
            <ListItemIcon>
              <AssignmentInd />
            </ListItemIcon>
            <ListItemText primary="Signup" />
          </ListItem>
        )}
        {!currentUser && (
          <ListItem button onClick={() => handleClick("/login")}>
            <ListItemIcon>
              <PersonAdd />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </>
  );
};


export default NavbarDrawer;