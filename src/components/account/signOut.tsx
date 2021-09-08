import React from 'react'
import { signOut } from 'firebase/auth';
import { Button } from '@material-ui/core';
import { AuthContext } from '../../contexts';
export default function SignOut() {
  const auth = React.useContext(AuthContext)

  const handleSignOut = () => {
    auth && signOut(auth).then(() => {
      console.log('Signed Out');
    });
  };

  return (
      <Button variant="contained" onClick={handleSignOut}>
        Sign Out
      </Button>
    )
}

