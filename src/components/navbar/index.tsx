import React from "react";
import {
  AppBar,
  Drawer,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { CloseOutlined } from "@material-ui/icons";
import { useAuth } from "../../contexts/authContext";


const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const auth = useAuth();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          FireLearn
        </Typography>
       
        {auth?.currentUser ? (
          <>
            <MenuItem button component={Link} to="/account">
              Account
            </MenuItem>
            <MenuItem onClick={() => auth.logout()}>
              Sign out
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem button >
              <Link to="/login">Log in</Link>
            </MenuItem>
            <MenuItem button component={Link} to="/signup">
              Signup
            </MenuItem>
          </>
        )}
        <Drawer open={open}>
          <IconButton onClick={handleDrawerClose}>
            <CloseOutlined />
          </IconButton>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
