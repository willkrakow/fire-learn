import { Button, Card, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { createUserWithEmailAndPassword, } from '@firebase/auth'
import { AuthContext } from '../contexts'
import { useAuthState } from 'react-firebase-hooks/auth'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { signInWithGoogle } from '../utils'


const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    maxWidth: 400,
    margin: "auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  form: {
    width: "100%",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.info.main,
  },
  googleButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.primary.main
  },
  orText: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: "center",
  }
}));
export default function Signup() {
  const auth = React.useContext(AuthContext)
  const [user] = useAuthState(auth)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const classes = useStyles()

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const userCredential = auth && await createUserWithEmailAndPassword(auth, email, password)
      if (userCredential?.user) {
        console.log('User created', user)
        window.location.href = '/'
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Card className={classes.root}>
      <Typography className={classes.title} variant="h3">Sign up for FireLearn</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField label="Email" type="email" value={email} onChange={handleEmailChange} />
        <TextField label="Password" type="password" value={password} onChange={handlePasswordChange} />
        <Button className={classes.button} variant="contained" type="submit">Sign up</Button>
      </form>
      <Typography className={classes.orText} variant="h6">or</Typography>
      <Button className={classes.googleButton} variant="contained" color="primary" onClick={async () => auth ? signInWithGoogle(auth) : console.log("Error")}>Sign up with Google</Button>
    </Card>
  )
}
