import React from "react";
import {
  AppBar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  Box,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Theme,
  Divider,
} from "@material-ui/core";
import { Menu, CloseOutlined, Person, ExitToApp, Book, Grade, PersonAdd, AssignmentInd } from "@material-ui/icons";
import AccountMenu from "./accountMenu";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "src/contexts/authContext";

const FancyLink = React.forwardRef((props, ref) => (
  <ListItemText primary={props.children?.toString()} ref={ref} {...props} />
));

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    minWidth: 240,
  }
}))
const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const { logout, currentUser } = useAuth() as IAuthContext
  const { push } = useHistory()
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (path: string) => {
    push(path)
    setOpen(false)
  }

  const handleLogout = () => {
    logout()
    push("/")
    setOpen(false)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerOpen}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6">FireLearn</Typography>
        <Drawer open={open} className={classes.drawer}>
          <IconButton onClick={handleDrawerClose}>
            <CloseOutlined />
          </IconButton>
          <List>
            {currentUser && (<ListItem button onClick={() => handleClick("/")}>
              <ListItemIcon>
                <Grade />
              </ListItemIcon>
              <ListItemText primary="My courses" />
            </ListItem>)}
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
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
