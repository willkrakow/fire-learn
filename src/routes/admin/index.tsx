import { Breadcrumbs } from "@material-ui/core";
import React from "react";
import { Redirect, Switch, Route, useLocation } from "react-router";
import { RouterButton } from "src/components/buttons";
import { useAuth } from "src/contexts/authContext";
import AdminMenu from "./adminMenu";
import CourseManager from "./courseManager";
import UserManager from "./userManager";

const Admin = () => {
  const { isAdmin } = useAuth() as IAuthContext;
  const [breadcrumbs, setBreadcrumbs] = React.useState<any[]>([]);
  const { pathname } = useLocation();

  React.useEffect(() => {
    const pathArray = pathname.split("/");
    const breadcrumbsArray = pathArray.map((path, index) => {
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
      <Breadcrumbs>
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <RouterButton href={breadcrumb.link} key={index}>
              {breadcrumb.name}
            </RouterButton>
          );
        })}
      </Breadcrumbs>
      <Switch>
        <Route exact path="/admin" render={() => <div>admin</div>} />
        <Route path="/admin/courses" component={CourseManager} />
        <Route path="/admin/users" component={UserManager} />
      </Switch>
    </>
  );
};

export default Admin;
