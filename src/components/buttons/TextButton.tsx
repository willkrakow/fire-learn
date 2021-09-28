import React from "react";
import clsx from "clsx";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { withStyles, WithStyles, StyleRules } from "@material-ui/core/styles";
import {
  green,
  teal,
} from "@material-ui/core/colors";
interface Props extends WithStyles<typeof styles> {
  children?: React.ReactNode;
  className?: string;
}

// We can inject some CSS into the DOM.
const styles: StyleRules = {
  root: {
    background: `linear-gradient(45deg, ${teal[700]} 30%, ${green[400]} 90%)`,
    backgroundClip: "text",
    color: "transparent",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    border: 0,
    height: 48,
    padding: "0 30px",
    textTransform: "uppercase",
    letterSpacing: "0.1rem"
  },
};

const PrimaryButton: React.FC<Props & ButtonProps> = (props) => {
  const { classes, children, className, ...other } = props;

  return (
    <Button className={clsx(classes.root, className)} {...other}>
      {children || "class names"}
    </Button>
  );
};

export default withStyles(styles)(PrimaryButton);
