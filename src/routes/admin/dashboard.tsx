import React from "react";
import { Grid } from "@material-ui/core";
import TotalUsers from "../../components/admin/TotalUsers";
import PopularCourses from "../../components/admin/PopularCourses";

const Dashboard = () => {

  return (
    <Grid container>
      <TotalUsers />
      <PopularCourses />
    </Grid>
  );
}

export default Dashboard;