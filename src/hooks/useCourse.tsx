import React from "react";
import { useFirestore } from "src/contexts/firestoreContext";

const useCourse = (courseId: string) => {
  const { getDocument } = useFirestore() as IFirestoreContext;
  const [courseData, setCourseData] = React.useState<Course | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    setLoading(true);
    getDocument(`courses/${courseId}`).then((course) => {
      setCourseData(course);
      console.log(course);
      setLoading(false);
    });
  }, [courseId]);

  return {courseData, loading};
};

export default useCourse;
