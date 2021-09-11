import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useCourse, useEnrollments } from '../hooks'
import { Button, Paper, Typography } from '@material-ui/core'
import { useAuth } from '../contexts/authContext'
import { getFirestore } from 'firebase/firestore'
import { collection } from 'firebase/firestore'
import { addDoc } from 'firebase/firestore'
// const functions = getFunctions()
// const createEnrollment = httpsCallable(functions, "createEnrollment")


const Course: React.FC<RouteComponentProps<{course_id: string}>> = (props) => {
    const { course_id } = props.match.params
    const {course, isLoading} = useCourse(course_id)
    const auth = useAuth()
    const uid = auth?.currentUser?.uid ?? ""
    const { enrollments, } = useEnrollments(course_id);
    

    const handleClick = async () => {
        // create enrollment
        // const message = await createEnrollment({course_id: course_id, user_id: uid})
        const db = getFirestore()
        const enrollmentsRef = collection(db, "enrollments")
        const enrollment = await addDoc(enrollmentsRef, {course_id: course_id, course: `/courses/${course_id}`, user_id: uid, enrolled_at: new Date(), progress: 0, user: `/users/${uid}`})
        enrollment.id && window.location.reload()
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
      <Paper>
        <Typography variant="h2">{course.name}</Typography>
        <Typography variant="h5">{course.description}</Typography>
        <Typography variant="h6">{course.price}</Typography>
        {enrollments.length > 0 ? <Typography variant="h6">Enrolled</Typography>
        : <Button onClick={handleClick}>Enroll</Button>}
      </Paper>
    );
}

export default Course