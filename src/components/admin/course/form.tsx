import React from 'react'
import { CircularProgress, makeStyles, Typography, Paper, Theme } from '@material-ui/core';
import { RouterButton } from 'src/components/buttons';
import styles from './styles'

interface ICourseForm {
  course: Course | null;
  loading: boolean;
  url: string;
}

const useStyles = makeStyles((theme: Theme) => styles(theme));

const CourseForm = ({ course, loading, url }: ICourseForm) => {
  const classes = useStyles();

  return (
    <>
      {loading && <CircularProgress />}
      {course ? (
        <Paper className={classes.root}>
          <Typography variant="h3">{course.data.name}</Typography>
          <Typography variant="h5">{course.data.description}</Typography>
          <RouterButton href={`${url}/lessons`}>Lessons</RouterButton>
        </Paper>
      ) : (
        <div>404</div>
      )}
    </>
  );
};

export default CourseForm;