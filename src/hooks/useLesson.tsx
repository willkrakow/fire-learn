import React from "react";
import { useFirestore } from "src/contexts/firestoreContext";

const useLesson = (lessonId: string) => {
  const [loading, setLoading] = React.useState(false);
  const [lessonData, setLessonData] = React.useState<Lesson | null | any>();

  const { getDocument } = useFirestore() as IFirestoreContext;

  React.useEffect(() => {
    setLoading(true);
    getDocument(`lessons/${lessonId}`).then((lesson: Lesson) => {
      setLessonData(lesson);
      setLoading(false);
    });
  }, [lessonId]);

  return { loading, lessonData };
};


export default useLesson;