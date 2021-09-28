import React from "react";
import {
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import { useCourse } from "../hooks";
import {
  Box,
  Typography,
  makeStyles,
  CircularProgress,
  Grid,
  Paper,
} from "@material-ui/core";
import {LessonList, Hero, Lesson} from "../components/public";
import CourseRating from "../components/public/CourseRating";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    margin: theme.spacing(3),
    borderWidth: 10,
    borderStyle: "solid",
    borderColor: theme.palette.primary.main,
  },
  heroSubtitle: {
    color: theme.palette.primary.contrastText,
  },
  grid: {
    padding: theme.spacing(5),
    margin: theme.spacing(3),
    textAlign: "center",
  },
  aboutTitle: {
    marginBottom: theme.spacing(3),
  }
}));

// const functions = getFunctions()
// const createEnrollment = httpsCallable(functions, "createEnrollment")

type TParams = {
  courseId: string;
};

const Course = ({ courseId }: TParams) => {
  const { path } = useRouteMatch();
  const classes = useStyles();
  const { courseData } = useCourse(courseId);
  return (
    <React.Suspense fallback={<CircularProgress />}>
      <Switch>
        <Route exact path={path}>
          <Hero imagePath={courseData?.data.image_path}>
            <Typography variant="h1">{courseData?.data.name}</Typography>
            <Typography className={classes.heroSubtitle} variant="h3">
              {courseData?.data.description}
            </Typography>
          </Hero>
          <Typography variant="h3">About this course</Typography>
          <Grid
            container
            spacing={4}
            component={Paper}
            className={classes.grid}
          >
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" className={classes.aboutTitle}>Reviews</Typography>
              <CourseRating
                courseId={courseData?.id || ""}
                typographyProps={{ variant: "h5", color: "secondary" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" className={classes.aboutTitle}>Author</Typography>
              <Typography variant="h4">{courseData?.data.author}</Typography>
            </Grid>
          </Grid>
          <Box>
            <Typography variant="h3">Curriculum</Typography>
            <LessonList courseId={courseId} />
          </Box>
        </Route>
        <Route
          path={`${path}/lessons/:lessonId`}
          render={(routeParams) => {
            return (
              <Lesson
                courseId={courseId}
                lessonId={routeParams.match.params.lessonId}
                courseName={courseData?.data.name || "error"}
              />
            );
          }}
        />
      </Switch>
    </React.Suspense>
  );
};

export default Course;
