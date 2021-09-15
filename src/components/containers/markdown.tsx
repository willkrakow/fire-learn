import React from 'react'
import ReactMarkdown, {  } from 'react-markdown'
import { Typography, ListItem, ListItemText, Button, TextField } from '@material-ui/core'
import { HeadingComponent, ReactMarkdownProps, SpecialComponents } from 'react-markdown/lib/ast-to-react'
import { NormalComponents } from 'react-markdown/lib/complex-types'

const components: Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
> = {
  h1: ({ children, ...props }) => <Typography variant="h1">{children}</Typography>,
  h2: ({ children, ...props }) => <Typography variant="h2">{children}</Typography>,
  h3: ({ children, ...props }) => <Typography variant="h3">{children}</Typography>,
  h4: ({ children, ...props }) => <Typography variant="h4">{children}</Typography>,
  h5: ({ children, ...props }) => <Typography  variant="h5">{children}</Typography>,
  h6: ({ children, ...props }) => <Typography  variant="h6">{children}</Typography>,
  p: ({ children, ...props }) => <Typography variant="body1">{children}</Typography>,
//   li: ({ children, ...props }) => {
//     return (
//     <ListItem>
//         <ListItemText primary={children[0]?.toString()} primaryTypographyProps={{ variant: "h4" }} secondary={children[1]?.toString()} secondaryTypographyProps={{variant: "body1"}} />
//     </ListItem>
//     )
//   },
//   a: ({ node, children, href }) => <Button href={href}>{children}</Button>,
};


interface MarkdownProps {
    children: string;
}

const Markdown = ({children}: MarkdownProps) => {
    return (
      <ReactMarkdown
        children={children}
        components={components}
      />
    );
}

export default Markdown