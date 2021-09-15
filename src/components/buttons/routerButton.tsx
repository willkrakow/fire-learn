import * as React from "react";
import { MemoryRouter as Router } from "react-router";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import Button from "@material-ui/core/Button";

const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, "to">>(
  (props, ref) => <RouterLink ref={ref} to={props.href || "/"} {...props} role={undefined} />
);

export default function RouterButton(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
        <Button variant={props.variant} color={props.color} component={LinkBehavior} children={props.children} href={props.href} />
  );
}
