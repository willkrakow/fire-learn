import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { useAuth } from "src/contexts/authContext";
import { Button, IconButton } from "@material-ui/core";
import { Person } from "@material-ui/icons";
export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { currentUser, logout } = useAuth() as IAuthContext;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(null);
  };

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(null);
    logout();
  };

  React.useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (anchorEl && !anchorEl.contains(event.target as Node)) {
        setAnchorEl(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [anchorEl]);

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Person fontSize="inherit" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {currentUser && (
          <Link to="/">
            My courses
          </Link>
        )}
        <Link to="/browse">
          Browse
        </Link>
        {currentUser && (
          <Link to="/account">
            Account
          </Link>
        )}
        {currentUser ? (
          <Button onClick={() => logout()}>
            Logout
          </Button>
        ): (
        <Link to="/login">
          Login
        </Link>
        )}
        {!currentUser && (
            <Link to="/signup">
          Sign up
        </Link>
        )}
      </Menu>
    </div>
  );
}
