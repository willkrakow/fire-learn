import React from 'react'
import { useFirestore } from '../contexts/firestoreContext';

const useCourseLessons = (courseId: string) => {
    const [loading, setLoading] = React.useState(false);
    const [lessons, setLessons] = React.useState<Lesson[]>([]);
    const { queryDocuments } = useFirestore() as IFirestoreContext;

    

    React.useEffect(() => {
        const loadLessons = () => {
          setLoading(true);
          queryDocuments({
            collectionPath: "lessons",
            queryParams: ["course_id", "==", courseId],
          }).then(setLessons);
          setLoading(false);
        };
        loadLessons();

        return () => {
            setLessons([]);
        };
    }, [courseId, queryDocuments]);

    return { loading: loading, lessons: lessons }
}

export default useCourseLessons;
