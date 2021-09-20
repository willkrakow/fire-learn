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
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import { LessonTable } from ".";
import { grey, } from "@material-ui/core/colors";

interface TParams {
  courseId: string;
}


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(4),
  },
  gridItem: {
    backgroundColor: theme.palette.primary.light,
  },
  paper: {
    height: "100%",
    padding: 0,
    backgroundColor: grey[50],
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
      <Grid container spacing={5}>
        {!loading && course && (
          <>
            <Grid item xs={12} md={4} lg={3}>
              <Card className={classes.paper}>
                <CardHeader
                  className={classes.header}
                  title="Details"
                  titleTypographyProps={{ variant: "h5" }}
                />
                <CardContent>
                  <CourseForm course={course} url={url} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8} lg={6}>
              <Card className={classes.paper}>
                <CardHeader
                  className={classes.header}
                  title="Lessons"
                  titleTypographyProps={{ variant: "h5" }}
                />
                <CardContent>
                  <LessonTable courseId={course.id} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Card className={classes.paper}>
                <CardHeader className={classes.header} title="Analytics" titleTypographyProps={{ variant: "h5" }} />
              <CardContent>
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
              </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default CourseEditor;
