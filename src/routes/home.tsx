import React from "react";
import { Box, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

import useEnrollments from "../hooks/useEnrollments";
import { CourseCard } from "../components/containers";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: "100%",
    height: "100%",
  },
  grid: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  card: {
    padding: theme.spacing(2),
  },
}));

const CourseGrid = () => {
  const classes = useStyles();

  const { enrollments, isLoading } = useEnrollments();
  return (
    <Box className={classes.paper}>
      <Typography variant="h1">Courses</Typography>
      <Typography variant="subtitle1">
        Here's what you're enrolled in
      </Typography>
      <Divider />
      <Grid container className={classes.grid}>
        {!isLoading &&
          enrollments.map((enrollment) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={enrollment.course_id}>
              <CourseCard
                className={classes.card}
                course_id={enrollment.course_id.toString()}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

const Home = () => {
  const auth = useAuth();

  return auth?.currentUser ? <CourseGrid /> : <Redirect to="/login" />;
};
export default Home;
