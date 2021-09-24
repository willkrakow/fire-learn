import React from "react";
import {
  Paper,
  Typography,
  makeStyles,
  Theme,
} from "@material-ui/core";
import markdownComponents from "../../theme/markdownComponents";
import ReactMarkdown from "react-markdown";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: "100vh",
    padding: theme.spacing(3),
    maxWidth: 900,
    margin: "auto",
  },
  image: {
    height: 300,
    width: `calc(100% + ${2 * theme.spacing(5)}px)`,
    boxShadow: theme.shadows[5],
    objectFit: "cover",
    objectPosition: "top",
    margin: theme.spacing(2, -5),
  },
}));

interface Props extends React.ComponentProps<typeof Paper> {
  lesson: Lesson;
}

function LessonContent({ lesson, ...props }: Props) {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.root} {...props}>
        <Typography variant="h2">{lesson.data.title}</Typography>
        <Typography variant="h4">{lesson.data.subtitle}</Typography>
        {lesson.data.image_url && (
          <img
            className={classes.image}
            src={lesson.data.image_url}
            alt={lesson.data.title}
          />
        )}
        <ReactMarkdown
          children={lesson.data?.markdown_content?.toString() || " "}
          components={markdownComponents}
          unwrapDisallowed={false}
        />
      </Paper>
    </>
  );
}

export default LessonContent;
