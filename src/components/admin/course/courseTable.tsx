import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Chip,
  Paper,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { useFirestore } from "src/contexts/firestoreContext";
import { Check, Delete, Edit, NotInterested } from "@material-ui/icons";
import styles from "./styles";
import { RouterButton } from "src/components/buttons";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);

const CourseTable = () => {
  const classes = useStyles();
  const { getCollection } = useFirestore() as IFirestoreContext;
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { url } = useRouteMatch();

  React.useEffect(() => {
    setLoading(true);
    getCollection("courses")
      .then(setCourses)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [getCollection]);

  return (
    <Paper className={classes.root}>
      <Typography variant="h3">Courses</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Table size="small">
          <TableHead>
            {["Name", "Description", "Status", "Options"].map((label) => (
              <TableCell key={label}>
                <Typography variant="h4">{label}</Typography>
              </TableCell>
            ))}
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.data.name}>
                <TableCell>
                  <Typography variant="subtitle1">
                    {course.data.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {course.data.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  {course.data.published ? (
                    <Chip
                      icon={<Check color="primary" fontSize="inherit" />}
                      label="Published"
                    />
                  ) : (
                    <Chip
                      icon={
                        <NotInterested color="disabled" fontSize="inherit" />
                      }
                      label="Not published"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Link
                    to={{
                      pathname: `${url}/${course.id}`,
                      state: { data: course.data, id: course.id },
                    }}
                  >
                    <Edit fontSize="inherit" color="secondary" />
                  </Link>
                  <RouterButton onClick={() => console.log("delete")}>
                    <Delete fontSize="inherit" color="error" />
                  </RouterButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default CourseTable;
