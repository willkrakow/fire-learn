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
  Hidden,
  useTheme,
} from "@material-ui/core";
import { Menu, CloseOutlined, Person, ExitToApp, Book, Grade, PersonAdd, AssignmentInd, Fireplace } from "@material-ui/icons";
import AccountMenu from "./accountMenu";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "src/contexts/authContext";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));
const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
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
    </div>
  );


  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Typography variant="h4" noWrap>FireLearn</Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="menu">
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
      </nav>
    </>
  );
};

export default Navbar;
