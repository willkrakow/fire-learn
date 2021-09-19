import React from "react";
import {
  CircularProgress,
  Divider,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { RouterButton } from "../buttons";
import Markdown from "./markdown";
import { useLesson } from "src/hooks";
import { ArrowBack } from "@material-ui/icons";

type Props = {
  lessonId: string;
  courseId: string;
  courseName: string;
};

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
  }
}));

function Lesson({ lessonId, courseId, courseName }: Props) {
  const { lessonData, loading } = useLesson(lessonId) as {
    lessonData: Lesson;
    loading: boolean;
  };
  const classes = useStyles();

  return (
    <>
      {loading && <CircularProgress />}
      {lessonData && !loading && (
        <>
          <RouterButton
            color="primary"
            variant="text"
            href={`/courses/${courseId}`}
          >
            <ArrowBack fontSize="inherit" /> {courseName}
          </RouterButton>
          <Paper className={classes.root}>
            <Typography variant="h2">{lessonData.data.title}</Typography>
            <Typography variant="h4">{lessonData.data.subtitle}</Typography>
            <Divider className={classes.divider} />
              <Markdown children={lessonData.data.markdown_content} />
          </Paper>
        </>
      )}
    </>
  );
}

export default Lesson;
