import React from "react";
import { useRouteMatch, RouteComponentProps } from "react-router";
import {
  CircularProgress,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useFirestore } from "src/contexts/firestoreContext";
import { RouterButton } from "src/components/buttons";
import styles from "./styles";
import LessonRow from "./lessonRow";

const useStyles = makeStyles(styles);

interface TParams {
  courseId: string;
}

const LessonTable = ({ match }: RouteComponentProps<TParams>) => {
  const { courseId } = match.params;
  const { url, path } = useRouteMatch();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [lessons, setLessons] = React.useState<Lesson[]>([]);
  const { queryDocuments } = useFirestore() as IFirestoreContext;

  React.useEffect(() => {
    setLoading(true);
    queryDocuments({
      collectionPath: "lessons",
      queryParams: ["course_id", "==", courseId],
    }).then(setLessons);
    setLoading(false);
  }, [courseId, queryDocuments]);

  return (
    <>
      <Paper className={classes.root}>
        <Typography variant="h3">Lessons</Typography>
        <RouterButton variant="contained" href={`${url}/new`}>
          New Lesson
        </RouterButton>
        {loading ? (
          <CircularProgress />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                {["Title", "Subtitle", "Status", "Actions"].map((label) => (
                  <TableCell key={label}>
                    <Typography variant="h4">{label}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {lessons.map((lesson) => (
                <LessonRow
                  key={lesson.id}
                  lesson={lesson}
                  url={url}
                  path={path}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </>
  );
};

export default LessonTable;
