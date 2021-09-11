import { collection, addDoc, getFirestore } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";


const createEnrollment = async ({course_id, user_id} : Partial<Enrollment>): Promise<string> => {
    const db = getFirestore()
    const enrollmentRef = await addDoc(collection(db, 'enrollments'), {
        course_id: course_id,
        user_id: user_id,
        enrolled_at: Timestamp.fromMillis(Date.now())
    })
    return enrollmentRef.id
}

export default createEnrollment