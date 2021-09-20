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
import {components} from "./markdown";
import { useLesson } from "src/hooks";
import { ArrowBack } from "@material-ui/icons";
import { useFirestore } from "src/contexts";
import ReactMarkdown from 'react-markdown'
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
  const [ lesson, setLesson ] = React.useState<Lesson | null>(null);
  const {getDocument} = useFirestore() as IFirestoreContext;
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    getDocument(`lessons/${lessonId}`)
    .then(setLesson)
    .finally(() => setLoading(false));
  }, [lessonId]);

  const classes = useStyles();

  return (
    <>
      {loading && <CircularProgress />}
      {lesson && !loading && (
        <>
          <RouterButton
            color="primary"
            variant="text"
            href={`/courses/${courseId}`}
          >
            <ArrowBack fontSize="inherit" /> {courseName}
          </RouterButton>
          <Paper className={classes.root}>
            <Typography variant="h2">{lesson.data.title}</Typography>
            <Typography variant="h4">{lesson.data.subtitle}</Typography>
            <Divider className={classes.divider} />
            <ReactMarkdown
              className={classes.root}
              children={lesson.data.markdown_content.toString()}
              components={components}
              unwrapDisallowed={false}
            />
          </Paper>
        </>
      )}
    </>
  );
}


export default Lesson;
