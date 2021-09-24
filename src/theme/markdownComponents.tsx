import React from 'react'
import { Typography, Link } from '@material-ui/core'
import { SpecialComponents } from 'react-markdown/lib/ast-to-react'
import { NormalComponents } from 'react-markdown/lib/complex-types'

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
    <Typography key={props.key} variant="h3">
      {children}
    </Typography>
  ),
  h4: ({ children, ...props }) => (
    <Typography key={props.key} variant="h4">
      {children}
    </Typography>
  ),
  h5: ({ children, ...props }) => (
    <Typography key={props.key} variant="h5">
      {children}
    </Typography>
  ),
  h6: ({ children, ...props }) => (
    <Typography key={props.key} variant="h6">
      {children}
    </Typography>
  ),
  p: ({ children, ...props }) => (
    <Typography variant="body1" key={props.key}>
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