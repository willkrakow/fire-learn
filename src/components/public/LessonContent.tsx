import React from "react";
import {
  Paper,
  Typography,
  Divider,
  makeStyles,
  Theme,
} from "@material-ui/core";
import markdownComponents from "../../theme/markdownComponents";
import ReactMarkdown from "react-markdown";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: "100vh",
    padding: theme.spacing(5),
  },
  card: {
    padding: theme.spacing(2),
  },
  image: {
    height: 300,
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

interface Props {
  lesson: Lesson;
}

function LessonContent({ lesson }: Props) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="h2">{lesson.data.title}</Typography>
      <Typography variant="h4">{lesson.data.subtitle}</Typography>
      <Divider className={classes.divider} />
      <ReactMarkdown
        className={classes.root}
        children={lesson.data.markdown_content.toString()}
        components={markdownComponents}
        unwrapDisallowed={false}
      />
    </Paper>
  );
}

export default LessonContent;
