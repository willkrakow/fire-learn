import React from "react";
import { Theme, List, makeStyles } from "@material-ui/core";
import EnrollmentItem from "./enrollmentItem";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
  },
}));

interface Props {
  enrollmentDocs: IEnrollment[];
}

const EnrollmentList = ({ enrollmentDocs }: Props) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {enrollmentDocs.map((enrollment: IEnrollment) => (
        <EnrollmentItem key={enrollment.id} enrollment={enrollment} />
      ))}
    </List>
  );
};

export default EnrollmentList;
