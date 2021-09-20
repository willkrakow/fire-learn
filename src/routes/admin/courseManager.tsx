import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import {CourseEditor, CourseTable} from "../../components/admin";


const CourseManager = () => {
  const { path } = useRouteMatch();


  return (
    <Switch>
      <Route exact path={path} component={CourseTable} />
      <Route path={`${path}/:courseId`} component={CourseEditor} />
    </Switch>
  );
};

export default CourseManager;
