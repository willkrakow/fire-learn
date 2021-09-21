import React from "react";
import { Grid } from "@material-ui/core";
import TotalUsers from "src/components/admin/TotalUsers";
import PopularCourses from "src/components/admin/PopularCourses";

const Dashboard = () => {

  return (
    <Grid container>
      <TotalUsers />
      <PopularCourses />
    </Grid>
  );
}

export default Dashboard;