import React from "react";
import { Switch, Route, useRouteMatch } from "react-router";
import UserTable from "./userTable";
import UserEditor from "./userEditor";


const UserManager = () => {
  const { path } = useRouteMatch()
  return (
      <Switch>
        <Route exact path={path} component={UserTable} />
        <Route path={`${path}/:userId`} component={UserEditor} />
      </Switch>
  );
};

export default UserManager;
