import React from "react";
import {
  CircularProgress,
} from "@material-ui/core";
import { RouterButton } from "../buttons";
import { ArrowBack } from "@material-ui/icons";
import { useFirestore } from "src/contexts";
import LessonContent from './LessonContent'

type Props = {
  lessonId: string;
  courseId: string;
  courseName: string;
};


function Lesson({ lessonId, courseId, courseName }: Props) {
  const [ lesson, setLesson ] = React.useState<Lesson | null>(null);
  const {getDocument} = useFirestore() as IFirestoreContext;
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    getDocument(`lessons/${lessonId}`)
    .then(setLesson)
    .finally(() => setLoading(false));
  }, [lessonId]);


  return (
    <>
      {loading && <CircularProgress />}
      {lesson && !loading && (
        <>
          <RouterButton
            color="primary"
            variant="text"
            href={`/courses/${courseId}`}
          >
            <ArrowBack fontSize="inherit" /> {courseName}
          </RouterButton>
          <LessonContent lesson={lesson} />
        </>
      )}
    </>
  );
}


export default Lesson;



