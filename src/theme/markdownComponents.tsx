import React from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdown, {  } from 'react-markdown'
import { Typography, makeStyles, Link } from '@material-ui/core'
import { SpecialComponents } from 'react-markdown/lib/ast-to-react'
import { NormalComponents } from 'react-markdown/lib/complex-types'

const useStyles = makeStyles(theme => ({
  root: {
    whiteSpace: 'pre-wrap',
  },
}))

const markdownComponents: Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
> = {
  h1: ({ children, ...props }) => (
    <Typography component="h1" key={props.key} variant="h1">
      {children}
    </Typography>
  ),
  h2: ({ children, ...props }) => (
    <Typography variant="h2" component="h2" key={props.key}>
      {children}
    </Typography>
  ),
  h3: ({ children, ...props }) => (
    <Typography key={props.key} component="h3" variant="h3">
      {children}
    </Typography>
  ),
  h4: ({ children, ...props }) => (
    <Typography key={props.key} component="h4" variant="h4">
      {children}
    </Typography>
  ),
  h5: ({ children, ...props }) => (
    <Typography key={props.key} component="h5" variant="h5">
      {children}
    </Typography>
  ),
  h6: ({ children, ...props }) => (
    <Typography component="h6" key={props.key} variant="h6">
      {children}
    </Typography>
  ),
  p: ({ children, ...props }) => (
    <Typography component="p" variant="body1" key={props.key}>
      {children}
    </Typography>
  ),
  a: ({ children, ...props }) => (
      <Link underline="always" key={props.key} href={props.href}>{children}</Link>
  ),
  strong: ({ children, ...props }) => (
    <strong {...props}>{children}</strong>
  ),
  pre: ({ children, ...props }) => (
    <span {...props}>{children}</span>
  ),
};



export default markdownComponents