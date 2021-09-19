import React from "react";
import { useRouteMatch, RouteComponentProps } from "react-router";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import LessonRow from "./lessonRow";
import useCourseLessons from "src/hooks/useCourseLessons";
import AddLesson from "./addLesson";


interface TParams {
  courseId: string;
}

const LessonTable = ({ match }: RouteComponentProps<TParams>) => {
  const { courseId } = match.params;
  const { url, path } = useRouteMatch();
  const { lessons, loading } = useCourseLessons(courseId);
 
  return (
    <>
        <Typography variant="h3">Lessons</Typography>
        <AddLesson courseId={courseId} />
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
