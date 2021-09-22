import React from "react";
import { RouteComponentProps, useRouteMatch } from "react-router";
import { useFirestore } from "../../contexts";
import CourseForm from "./CourseForm";
import {
  Grid,
  List,
  ListItemText,
  ListItem,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { LessonTable } from ".";

interface TParams {
  courseId: string;
}


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  gridItem: {
  },
  paper: {
    height: "100%",
    padding: 0,
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    "& *": {
      color: theme.palette.primary.contrastText,
    }
  }
}))

const CourseEditor = ({ match }: RouteComponentProps<TParams>) => {
  const { url } = useRouteMatch();
  const [course, setCourse] = React.useState<Course | null>(null);
  const { getDocument } = useFirestore() as IFirestoreContext;
  const [loading, setLoading] = React.useState(false);
  
  const classes = useStyles();
  React.useEffect(() => {
    setLoading(true);
    getDocument(`courses/${match.params.courseId}`)
      .then(setCourse)
      .finally(() => setLoading(false));
  }, [getDocument, match.params.courseId]);

  return (
    <>
      <Typography variant="h2">{course?.data.name}</Typography>
      <Grid container spacing={10} className={classes.root}>
        {!loading && course && (
          <>
            <Grid item xs={12} lg={4}>
              <Typography variant="h4">Metadata</Typography>
              <CourseForm course={course} url={url} />
            </Grid>
            <Grid item xs={12} lg={8}>
              <Typography variant="h4">Lessons</Typography>
              <LessonTable courseId={course.id} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Typography variant="h4">Analystics</Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Enrollments"
                    secondary="0"
                    primaryTypographyProps={{ variant: "h6" }}
                    secondaryTypographyProps={{ variant: "h5" }}
                  />
                </ListItem>
              </List>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default CourseEditor;
