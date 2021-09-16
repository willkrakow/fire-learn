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
} from "@material-ui/core";
import Lesson from "src/components/containers/lesson";
import Hero from "src/components/containers/hero";
import LessonList from "src/components/containers/lessonList";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  heroSubtitle: {
    color: theme.palette.primary.contrastText,
  },
}));

// const functions = getFunctions()
// const createEnrollment = httpsCallable(functions, "createEnrollment")

type TParams = {
  courseId: string;
};

const Course = ({ courseId }: TParams) => {
  const { path } = useRouteMatch();
  const classes = useStyles();
  const { courseData, loading } = useCourse(courseId);
  return (
    <>
      {loading && <CircularProgress />}
      {!loading && courseData?.data && (
        <Switch>
          <Route exact path={path}>
            <Hero imagePath={courseData?.data.image_path}>
              <Typography variant="h2">{courseData?.data.name}</Typography>
              <Typography className={classes.heroSubtitle} variant="h5">
                {courseData?.data.description}
              </Typography>
            </Hero>
            <Box className={classes.root}>
              <Typography variant="h3">Lessons</Typography>
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
                  courseName={courseData.data.name}
                />
              );
            }}
          />
        </Switch>
      )}
    </>
  );
};

export default Course;