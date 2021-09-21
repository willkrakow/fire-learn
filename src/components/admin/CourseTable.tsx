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
  Theme,
} from "@material-ui/core";
import { useFirestore } from "../../contexts";
import { Check, Delete, Edit, NotInterested } from "@material-ui/icons";
import { RouterButton } from "../buttons";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: theme.spacing(5),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  buttonCell: {
    display: "flex",
  }
  }));

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
    <>
      <Typography variant="h3" className={classes.title}>Courses</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Table component={Paper}>
          <TableHead>
            {["Name", "Description", "Status", "Actions"].map((label) => (
              <TableCell key={label}>
                <Typography variant="h5" color="primary">{label}</Typography>
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
                <TableCell className={classes.buttonCell}>
                  <RouterButton
                    href={`${url}/${course.id}`}
                  >
                    <Edit color="primary" fontSize="small" />
                  </RouterButton>
                  <RouterButton onClick={() => console.log("delete")}>
                    <Delete color="error" fontSize="small" />
                  </RouterButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default CourseTable;
