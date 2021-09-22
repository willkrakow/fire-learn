import React from "react";
import { TableRow, Chip, TableCell, Typography, Button, makeStyles, Theme } from "@material-ui/core";
import { RouterButton } from "../../components/buttons";
import { Check, Delete, Edit, NotInterested } from "@material-ui/icons";

// Table row properties
//     title
//     subtitle
//     courses
//     options

interface Props extends React.ComponentProps<typeof TableRow> {
  lesson: Lesson;
  url?: string;
  path?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  buttonCell: {
    display: "flex"
  }
}));



const LessonRow = ({ lesson, ...props }: Props) => {
  const classes = useStyles();
  return (
    <>
      <TableRow key={lesson.id} {...props}>
        <TableCell><Typography variant="subtitle1">{lesson.data.title}</Typography></TableCell>
        <TableCell><Typography variant="body1">{lesson.data.subtitle}</Typography></TableCell>
        <TableCell>
          {lesson.data.published ? (
            <Chip
              icon={<Check color="primary" fontSize="inherit" />}
              label="Published"
              color="primary"
            />
          ) : (
            <Chip
              icon={<NotInterested color="disabled" fontSize="inherit" />}
              label="Not published"

            />
          )}
        </TableCell>
        <TableCell className={classes.buttonCell}>
          <RouterButton href={`/admin/courses/${lesson.data?.courseId || lesson.data?.course_id}/lessons/${lesson.id}`}><Edit fontSize="small" color="primary" /></RouterButton>
          <Button variant="text" onClick={() => console.log("delete")}><Delete fontSize="small" color="error" /></Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default LessonRow;
