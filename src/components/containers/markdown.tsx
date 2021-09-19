import React from 'react'
import ReactMarkdown, {  } from 'react-markdown'
import { Typography, makeStyles } from '@material-ui/core'
import { SpecialComponents } from 'react-markdown/lib/ast-to-react'
import { NormalComponents } from 'react-markdown/lib/complex-types'

const useStyles = makeStyles(theme => ({
  root: {
    whiteSpace: 'pre-wrap',
  },
}))

const components: Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
> = {
  h1: ({ children, ...props }) => (
    <Typography variant="h1">{children}</Typography>
  ),
  h2: ({ children, ...props }) => (
    <Typography variant="h2">{children}</Typography>
  ),
  h3: ({ children, ...props }) => (
    <Typography variant="h3">{children}</Typography>
  ),
  h4: ({ children, ...props }) => (
    <Typography variant="h4">{children}</Typography>
  ),
  h5: ({ children, ...props }) => (
    <Typography variant="h5">{children}</Typography>
  ),
  h6: ({ children, ...props }) => (
    <Typography variant="h6">{children}</Typography>
  ),
  p: ({ children, ...props }) => (
    <Typography variant="body1">
      {children.toString().replace(/(?:\r\n|\r|\n)/g, "<br />")}
    </Typography>
  ),
  pre: ({ children, ...props }) => (
    <Typography variant="body1">
      {children}
    </Typography>
  ),
};

interface MarkdownProps {
    children: string;
}

const Markdown = ({children}: MarkdownProps) => {
  const classes = useStyles()
    return (
      <ReactMarkdown
        className={classes.root}
        skipHtml={false}
        children={children}
        components={components}
        unwrapDisallowed={false}
        
      />
    );
}

export default Markdown