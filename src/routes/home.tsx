import React from "react";
import { Box, Button, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import { Redirect, Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import useEnrollments from "../hooks/useEnrollments";
import { Hero } from "../components/public";
import Browse from "./browse";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    width: "100%",
    height: "100%",
    marginTop: theme.spacing(2),
  },
  grid: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  sectionTitle: {
    marginBottom: theme.spacing(2),
  },
}));

const CourseGrid = () => {
  const classes = useStyles();

  const { enrollments, isLoading } = useEnrollments();
  const { currentUser } = useAuth() as IAuthContext;
  const firstName = currentUser.displayName.split(" ")[0];

  return (
    <>
      <Hero>
        <Typography variant="h2">Welcome back, {firstName}</Typography>
      </Hero>
    <Box className={classes.paper}>

      {!isLoading && <Browse />}
    </Box>
    </>
  );
};

const Home = () => {
  const auth = useAuth();

  return auth?.currentUser ? <CourseGrid /> : <Redirect to="/login" />;
};
export default Home;
