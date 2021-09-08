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
import { AuthContext } from "../../contexts";
import { useAuthState } from "react-firebase-hooks/auth";
import { SignOut } from "../account";


const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  const auth = React.useContext(AuthContext)
  const [user] = useAuthState(auth)
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
       
        {user ? (
          <>
            <MenuItem component={Link} to="/account">
              Account
            </MenuItem>
            <SignOut />
          </>
        ) : (
          <>
            <MenuItem component={Link} to="/login">
              Log in
            </MenuItem>
            <MenuItem component={Link} to="/signup">
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
