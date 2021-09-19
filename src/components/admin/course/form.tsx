import React from 'react'
import { CircularProgress, Typography } from '@material-ui/core';
import { RouterButton } from 'src/components/buttons';

interface ICourseForm {
  course: Course | null;
  loading: boolean;
  url: string;
}


const CourseForm = ({ course, loading, url }: ICourseForm) => {

  return (
    <>
      {loading && <CircularProgress />}
      {course ? (
        <>
          <Typography variant="h3">{course.data.name}</Typography>
          <Typography variant="h5">{course.data.description}</Typography>
          <RouterButton href={`${url}/lessons`}>Lessons</RouterButton>
        </>
      ) : (
        <div>404</div>
      )}
    </>
  );
};

export default CourseForm;