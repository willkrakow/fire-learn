import React from "react";
import { useRouteMatch } from "react-router";
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  makeStyles,
  Theme
} from "@material-ui/core";
import LessonRow from "./LessonRow";
import useCourseLessons from "../../hooks/useCourseLessons";
import AddLesson from "./AddLesson";
import AdminTableCell from "./AdminTableCell";


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(5),
  },
}));

interface TParams {
  courseId: string;
}

const LessonTable = ({courseId}: TParams) => {
  const { url, path } = useRouteMatch();
  const { lessons, loading } = useCourseLessons(courseId);
  const classes = useStyles();
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Table component={Paper} className={classes.root} >
          <TableHead>
            <TableRow>
              {["Title", "Subtitle", "Status", "Actions"].map(
                (label, index) => (
                  <AdminTableCell typographyVariant="h5" align="left" value={label} key={index} />
                )
              )}
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
      <AddLesson courseId={courseId} />
    </>
  );
};

export default LessonTable;
