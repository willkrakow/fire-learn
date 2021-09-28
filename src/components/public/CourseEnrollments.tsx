import React from 'react'
import { AvatarGroup } from '@material-ui/lab'
import { Avatar, CircularProgress, Typography } from '@material-ui/core'
import { useFirestore } from '../../contexts'


interface Props {
    courseId: string
}


const CourseEnrollments = ({ courseId }: Props) => {
    const { queryDocuments } = useFirestore() as IFirestoreContext

    const [ totalEnrollments, setTotalEnrollments ] = React.useState(0)
    const [enrollments, setEnrollments] = React.useState<IEnrollment[]>([])

    React.useEffect(() => {
    queryDocuments({
        collectionPath: "enrollments",
        queryParams: ["course_id", "==", courseId]
    })
    .then((enrollments: IEnrollment[]) => {
        setEnrollments(enrollments)
        setTotalEnrollments(enrollments.length)
    })
    .catch(error => console.error(error))

}, [courseId])

    
    return (
        <React.Suspense fallback={<CircularProgress />}>
            <AvatarGroup max={5}>
                {enrollments.slice(0,5).map((enrollment: IEnrollment) => (
                    <Avatar key={enrollment.id} src={enrollment.data.user_id} />
                ))}
            </AvatarGroup>
            <Typography variant="h5">{totalEnrollments} enrollments</Typography>
        </React.Suspense>
    )

}