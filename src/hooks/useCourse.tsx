import React from "react";
import { getDoc, getFirestore, doc } from "firebase/firestore";

const useCourse = (courseId: string) => {
  const [course, setCourse] = React.useState<any>();
  const [ isLoading, setIsLoading ] = React.useState(true);
  const db = getFirestore();

  React.useEffect(() => {
    setIsLoading(true)
    const courseRef = doc(db, "courses", courseId);
    const courseSnapshot = getDoc(courseRef).then((doc) => doc.data());
    courseSnapshot.then((c) => {
      if (c) {
        setCourse(c);
        console.log(c);
        setIsLoading(false);
      }
    });
    return () => {
        setIsLoading(true);
    }
  }, [courseId, db]);

  return {course, isLoading};
};

export default useCourse;
