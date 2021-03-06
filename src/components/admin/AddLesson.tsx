import React from 'react'
import { Button, CircularProgress } from '@material-ui/core'
import { useFirestore } from '../../contexts/firestoreContext'
import { useHistory } from 'react-router'
import { DocumentData, DocumentReference } from "@firebase/firestore";
import { PlusOne } from '@material-ui/icons';
import { PrimaryButton } from '../buttons';


interface Props extends React.ComponentProps<typeof Button> {
    courseId: string
}

const AddLesson = ({ courseId, ...props }: Props) => {
    const { addDocument } = useFirestore() as IFirestoreContext
    const [ loading, setLoading ] = React.useState(false)
    const { push } = useHistory()
    const handleNewLesson = () => {
    setLoading(true);
    addDocument('lessons', { course_id: courseId, courseId: courseId })
      .then((ref: DocumentReference<DocumentData>) => {
        setLoading(false);
        push(`/admin/courses/${courseId}/lessons/${ref.id}`);
      })
  }

    return (
        <PrimaryButton onClick={handleNewLesson} fullWidth >
            {loading ? <CircularProgress size="small" /> : <PlusOne fontSize="inherit" />}
            Add lesson
        </PrimaryButton>
    )
}

export default AddLesson