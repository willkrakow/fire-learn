import React from "react";
import clsx from "clsx";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { blueGrey, deepOrange, orange } from '@material-ui/core/colors'
interface Props extends WithStyles<typeof styles> {
  children?: React.ReactNode;
  className?: string;
}


// We can inject some CSS into the DOM.
const styles = {
  root: {
    background: `linear-gradient(45deg, ${orange[700]} 30%, ${deepOrange[400]} 90%)`,
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: `0 3px 5px 3px ${blueGrey[50]}`,
  },
};

const PrimaryButton: React.FC<Props & ButtonProps> = (props) => {
  const { classes, children, className, ...other } = props;

  return (
    <Button className={clsx(classes.root, className)} {...other}>
      {children || "class names"}
    </Button>
  );
}

export default withStyles(styles)(PrimaryButton);
