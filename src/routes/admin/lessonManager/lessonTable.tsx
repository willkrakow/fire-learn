import React from "react";
import { useRouteMatch, RouteComponentProps, useHistory } from "react-router";
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useFirestore } from "src/contexts/firestoreContext";
import LessonRow from "./lessonRow";
import { DocumentData, DocumentReference } from "@firebase/firestore";


interface TParams {
  courseId: string;
}

const LessonTable = ({ match }: RouteComponentProps<TParams>) => {
  const { courseId } = match.params;
  const { url, path } = useRouteMatch();
  const { push } = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [lessons, setLessons] = React.useState<Lesson[]>([]);
  const { queryDocuments, addDocument } = useFirestore() as IFirestoreContext;

  React.useEffect(() => {
    setLoading(true);
    queryDocuments({
      collectionPath: "lessons",
      queryParams: ["course_id", "==", courseId],
    }).then(setLessons);
    setLoading(false);
  }, [courseId, queryDocuments]);

  const handleNewLesson = () => {
    setLoading(true);
    addDocument('lessons', { course_id: courseId, courseId: courseId })
      .then((ref: DocumentReference<DocumentData>) => {
        setLoading(false);
        push(`${path}/${ref.id}`);
      })
  }

  return (
    <>
        <Typography variant="h3">Lessons</Typography>
        <Button variant="contained" onClick={handleNewLesson}>
          New Lesson
        </Button>
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
    </>
  );
};

export default LessonTable;
