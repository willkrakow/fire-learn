import React from "react";
import { Paper, Breadcrumbs, makeStyles, Theme } from "@material-ui/core";
import { Redirect, Switch, Route, useLocation } from "react-router";
import { RouterButton } from "../../components/buttons";
import { useAuth } from "../../contexts/authContext";
import AdminMenu from "./adminMenu";
import CourseManager from "./courseManager";
import UserManager from "./userManager";
import Dashboard from "./dashboard";


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  breadcrumbs: {
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(1),
    marginTop: 0,
    borderRadius: theme.shape.borderRadius,
  },
}))

const Admin = () => {
  const { isAdmin } = useAuth() as IAuthContext;
  const [breadcrumbs, setBreadcrumbs] = React.useState<any[]>([]);
  const { pathname } = useLocation();
  const classes = useStyles();

  React.useEffect(() => {
    const pathArray = pathname.split("/");
    const breadcrumbsArray = pathArray.slice(2).map((path, index) => {
      return {
        name: path.toLocaleUpperCase(),
        link: pathArray.slice(0, index + 1).join("/"),
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
          <Route exact path="/admin" component={Dashboard} />
          <Route path="/admin/courses" component={CourseManager} />
          <Route path="/admin/users" component={UserManager} />
        </Switch>
      </Paper>
    </>
  );
};

export default Admin;
