import React from 'react'
import { CircularProgress, Typography, List, ListItem, ListItemText } from '@material-ui/core'
import { useFirestore } from 'src/contexts/firestoreContext'
import { Link } from 'react-router-dom'


interface Props {
    courseId: string
}

const LessonList = ({courseId}: Props) => {
    const { queryDocuments } = useFirestore() as IFirestoreContext
    const [ lessons, setLessons ] = React.useState<Lesson[]>([])
    const [ loading, setLoading ] = React.useState(true)
    React.useEffect(() => {
        setLoading(true)
        queryDocuments({collectionPath: `lessons`, queryParams: ["course_id", "==", courseId] })
            .then(setLessons)
            .catch (console.error)
            .finally(() => setLoading(false))

    }, [courseId, queryDocuments])

    if (loading) {
        return <CircularProgress />
    }
    if (!lessons.length) {
        return <Typography variant="h5">No lessons found</Typography>
    }
    return (
        <List>
            {lessons.map(lesson => (
                <ListItem component={Link} to={`/courses/${courseId}/lessons/${lesson.id}`}  key={lesson.id}>
                    <ListItemText primary={lesson.data.title} primaryTypographyProps={{variant: "h4"}} secondaryTypographyProps={{ variant: "body1" }} secondary={lesson.data.subtitle} />
                </ListItem>
            ))}
        </List>
    )
}

export default LessonList
        