import React from 'react'
import { collection, getDocs, getFirestore, query, where, limit, DocumentData } from 'firebase/firestore'
import { useAuth } from '../contexts/authContext';

interface ReturnProps {
  enrollments: Array<DocumentData | Enrollment | any | undefined>
  isLoading: boolean
}

const useEnrollments = (course_id?: string): ReturnProps => {
    const [ isLoading, setIsLoading ] = React.useState(true)
    const [enrollments, setEnrollments] = React.useState<Enrollment[]>([])
    const auth = useAuth()
    

    React.useEffect(() => {
        setIsLoading(true);
        const queryEnrollments = async (user_id: string) => {
          const db = getFirestore();
          const enrollmentsRef = collection(db, "enrollments");
          const q = course_id
            ? query(
                enrollmentsRef,
                where("user_id", "==", user_id),
                where("course_id", "==", course_id),
                limit(1)
              )
            : query(enrollmentsRef, where("user_id", "==", user_id));
          const enrollmentSnapshot = await getDocs(q);

          setEnrollments(enrollmentSnapshot.docs.map((doc) => doc.data()));
          setIsLoading(false);
        };
        auth?.currentUser && queryEnrollments(auth?.currentUser?.uid)
        return () => {
            setIsLoading(false);
        }
    }, [auth?.currentUser, course_id])

    return {enrollments, isLoading}
    
}

export default useEnrollments