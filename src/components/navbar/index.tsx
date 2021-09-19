import React from "react";
import {
  AppBar,
  Drawer,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Theme,
  Hidden,
  useTheme,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { useAuth } from "src/contexts/authContext";
import { Menu } from '@material-ui/icons'
import NavbarDrawer from "./navbarDrawer";


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
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  title: {
    color: theme.palette.primary.contrastText,
    fontWeight: theme.typography.fontWeightBold,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.h3.fontSize
  },
  toolbar: theme.mixins.toolbar,
}));
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const classes = useStyles();
  const { logout, currentUser } = useAuth() as IAuthContext
  const { push } = useHistory()

  const handleClick = (path: string) => {
    push(path)
  }

  const handleLogout = () => {
    logout()
    push("/")
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  


  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Typography className={classes.title} noWrap>
            FireLearn
          </Typography>
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
            <NavbarDrawer
              handleClick={handleClick}
              handleLogout={handleLogout}
              currentUser={currentUser}
            />
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
            <NavbarDrawer
              handleClick={handleClick}
              handleLogout={handleLogout}
              currentUser={currentUser}
            />
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
};

export default Navbar;
