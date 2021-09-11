import React from 'react'
import { Button, TextField, Typography, List, ListItem } from '@material-ui/core'
import { useAuth } from '../../contexts/authContext'

const EditAccount = () => {
    const { currentUser, updateUserPassword, updateUserEmail, updateUserName } = useAuth() as IAuthContext
    const [values, setValues] = React.useState({
        name: currentUser?.displayName || "",
        email: currentUser?.email || "",
        password: '',
        confirmPassword: '',
    })
    const [ error, setError ] = React.useState('')
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (values.password !== values.confirmPassword) {
            setError('Passwords do not match')
            return  // don't submit
        }
        if (values.password.length < 6) {
            setError('Password must be at least 6 characters')
            return  // don't submit
        }
        if (values.email.length < 5) {
            setError('Email must be at least 5 characters')
            return  // don't submit
        }
        if (!values.email.includes("@") || !values.email.includes(".")) {
            setError('Email must be valid')
            return  // don't submit
        }
        setError('')
        await updateUserEmail(values.email)
        await updateUserPassword(values.password)
        await updateUserName(values.name)

    }

    return (
      <form onSubmit={handleSubmit}>
        <List>
          <ListItem>
            <TextField
              name="name"
              label="Name"
              value={values.name}
              onChange={handleChange}
              margin="normal"
            />
          </ListItem>
          <ListItem>
            <TextField
              name="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
              margin="normal"
            />
          </ListItem>
          <ListItem>
            <TextField
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              margin="normal"
            />
          </ListItem>
          <ListItem>
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              margin="normal"
            />
          </ListItem>
        </List>
        {error.length > 0 && (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        )}
        <Button disabled={error.length > 0} type="submit">
          Save
        </Button>
      </form>
    );
}

export default EditAccount

