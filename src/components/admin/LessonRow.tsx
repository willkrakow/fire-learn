import React from "react";
import { TableRow, Chip, TableCell, Typography } from "@material-ui/core";
import { RouterButton } from "src/components/buttons";
import { Check, NotInterested } from "@material-ui/icons";

// Table row properties
//     title
//     subtitle
//     courses
//     options

interface Props {
  lesson: Lesson;
  url: string;
  path: string;
}


const LessonRow = ({ lesson, url, path }: Props) => {
  return (
    <>
      <TableRow key={lesson.id}>
        <TableCell><Typography variant="subtitle1">{lesson.data.title}</Typography></TableCell>
        <TableCell><Typography variant="body1">{lesson.data.subtitle}</Typography></TableCell>
        <TableCell>
          {lesson.data.draft ? (
            <Chip
              icon={<Check color="primary" fontSize="inherit" />}
              label="Published"
            />
          ) : (
            <Chip
              icon={<NotInterested color="disabled" fontSize="inherit" />}
              label="Not published"
            />
          )}
        </TableCell>
        <TableCell>
          <RouterButton href={`${url}/lessons/${lesson.id}`}>Edit</RouterButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default LessonRow;
