import React from "react";
import {
  makeStyles,
  Paper,
} from "@material-ui/core";
import styles from "./styles";
import { Switch, Route, useRouteMatch } from "react-router";
import UserTable from "./userTable";
import UserEditor from "./userEditor";

const useStyles = makeStyles(styles);

const UserManager = () => {
  const classes = useStyles();
  const { path } = useRouteMatch()
  return (
    <Paper elevation={0} className={classes.root}>
      <Switch>
        <Route exact path={path} component={UserTable} />
        <Route path={`${path}/:userId`} component={UserEditor} />
      </Switch>
    </Paper>
  );
};

export default UserManager;
