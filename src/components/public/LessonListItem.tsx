import React from 'react'
import { ListItem, ListItemText } from '@material-ui/core'
import { Link } from 'react-router-dom'


interface Props{
  lesson: Lesson;
  url: string;
  index: number;
}

const LessonListItem = ({ lesson, url, index, ...props }: Props) => {
  return (
    <ListItem key={lesson.id} {...props} >
      <Link to={`${url}/lessons/${lesson.id}`}>
        <ListItemText
          primary={`${(index + 1).toString()}. ${lesson.data.title}`}
          primaryTypographyProps={{ variant: "h4" }}
          secondaryTypographyProps={{ variant: "body1" }}
          secondary={lesson.data.subtitle}
        />
      </Link>
    </ListItem>
  );
};

export default LessonListItem;
