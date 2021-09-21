import React from 'react'
import { CircularProgress, Typography, List, } from '@material-ui/core'
import { useFirestore } from '../../contexts/firestoreContext'
import { useRouteMatch } from 'react-router'
import LessonListItem from './LessonListItem'

interface Props {
    courseId: string
}

const LessonList = ({courseId}: Props) => {
    const { queryDocuments } = useFirestore() as IFirestoreContext
    const [ lessons, setLessons ] = React.useState<Lesson[]>([])
    const [ loading, setLoading ] = React.useState(true)
    const { url } = useRouteMatch()
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
        {lessons.map((lesson, index) => (
          <LessonListItem key={index} lesson={lesson} url={url} index={index} />
        ))}
      </List>
    );
}

export default LessonList


        