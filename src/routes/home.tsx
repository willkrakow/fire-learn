import React from "react";
import { Box, makeStyles, Theme, Typography } from "@material-ui/core";
import { Redirect, } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
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

  const { currentUser } = useAuth() as IAuthContext;
  const firstName = currentUser.displayName.split(" ")[0];

  return (
    <>
      <Hero>
        <Typography variant="h2">Welcome back, {firstName}</Typography>
      </Hero>
    <Box className={classes.paper}>
      <Browse />
    </Box>
    </>
  );
};

const Home = () => {
  const auth = useAuth();

  return auth?.currentUser ? <CourseGrid /> : <Redirect to="/login" />;
};
export default Home;
