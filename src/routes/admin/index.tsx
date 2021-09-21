import React from "react";
import { Paper, Breadcrumbs, makeStyles, Theme, Grid } from "@material-ui/core";
import { Redirect, Switch, Route, useLocation } from "react-router";
import { RouterButton } from "../../components/buttons";
import { useAuth } from "../../contexts/authContext";
import AdminMenu from "./adminMenu";
import Dashboard from "./dashboard";
import { CourseEditor, CourseTable, UserEditor } from "src/components/admin";
import { LessonTable, LessonEditor } from "src/components/admin";
import UserTable from "./userManager/userTable";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: "transparent",
  },
  breadcrumbs: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(3),
    marginTop: 0,
    borderRadius: theme.shape.borderRadius,
  },
  gridItem: {
  }
}));

const Admin = () => {
  const { isAdmin } = useAuth() as IAuthContext;
  const [breadcrumbs, setBreadcrumbs] = React.useState<any[]>([]);
  const { pathname } = useLocation();
  const classes = useStyles();

  React.useEffect(() => {
    const pathArray = pathname.split("/");
    const breadcrumbsArray = pathArray.slice(1).map((path, index) => {
      return {
        link: pathArray.slice(0, index + 2).join("/"),
        name: path.toLocaleUpperCase(),
      };
    });
    setBreadcrumbs(breadcrumbsArray);
  }, [pathname]);

  if (!isAdmin) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <AdminMenu />
      <Breadcrumbs className={classes.breadcrumbs}>
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <RouterButton size="small" href={breadcrumb.link} key={index}>
              {breadcrumb.name}
            </RouterButton>
          );
        })}
      </Breadcrumbs>
        <Paper elevation={0} className={classes.root}>
          <Switch>
            <Route exact path="/admin">
              <Dashboard />
            </Route>
            <Route path="/admin/courses">
              <Route exact path="/admin/courses" component={CourseTable} />
              <Route path="/admin/courses/:courseId">
                <Route
                  exact
                  path="/admin/courses/:courseId"
                  component={CourseEditor}
                />
                <Route path="/admin/courses/:courseId/lessons">
                  <Route
                    exact
                    path="/admin/courses/:courseId/lessons"
                    render={(routeProps) => <LessonTable courseId={routeProps.match.params.courseId} />}
                  />
                  <Route
                    path="/admin/courses/:courseId/lessons/:lessonId"
                    component={LessonEditor}
                  />
                </Route>
              </Route>
            </Route>
            <Route path="/admin/users">
              <Route exact path="/admin/users" component={UserTable} />
              <Route path="/admin/users/:userId" component={UserEditor} />
            </Route>
          </Switch>
        </Paper>
    </>
  );
};

export default Admin;
