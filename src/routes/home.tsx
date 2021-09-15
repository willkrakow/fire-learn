import React from "react";
import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { Redirect, Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

import useEnrollments from "../hooks/useEnrollments";
import { CourseCard } from "../components/containers";
import Hero from "src/components/containers/hero";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    height: "100%",
  },
  grid: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  sectionTitle: {
    marginBottom: theme.spacing(2)
  }
}));

const CourseGrid = () => {
  const classes = useStyles();

  const { enrollments, isLoading } = useEnrollments();
  const { currentUser } = useAuth() as IAuthContext;
  const firstName = currentUser.displayName.split(" ")[0];

  return (
    <Box className={classes.paper}>
      <Hero>
        <Typography variant="h2">Welcome back, {firstName}</Typography>

        <Button variant="contained" component={Link} to="/" color="primary">
          Home
        </Button>
      </Hero>
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.sectionTitle}>
            My courses
          </Typography>
        </Grid>
        {!isLoading &&
          enrollments.map((enrollment) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={enrollment.course_id}>
              <CourseCard course_id={enrollment.course_id.toString()} />
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
