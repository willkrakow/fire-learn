import React from 'react'
import ReactMarkdown from 'react-markdown'
import { getDoc, collection, doc, getFirestore, DocumentData } from 'firebase/firestore'
import { RouteComponentProps, useParams } from 'react-router-dom'
import { DocumentSnapshot } from '@firebase/firestore'

interface ILesson extends DocumentSnapshot<DocumentData> {
    markdown_content: string;
    title: string;
    id: string;
    draft: boolean;
    available: boolean;
    created_at: Date;
}

const Lesson: React.FC<RouteComponentProps<{lesson_id: string}>> = (props) => {
    // const { lesson_id } = useParams<{lesson_id: string}>() || {
    //   lesson_id: "BNCLKUOvntrePi0As5pa",
    // };
    const lesson_id = "BNCLKUOvntrePi0As5pa"
    const [lesson, setLesson] = React.useState<any>(null)

    React.useEffect(() => {
        const db = getFirestore()
        const lessonRef = doc(db, `lessons/${lesson_id}`)
        getDoc(lessonRef).then((l) => {
            const lessonData = l.data() as ILesson
            setLesson(lessonData)
        })

    }, [lesson_id])

    return (
        <div>
            {lesson && <ReactMarkdown>{lesson.markdown_content}</ReactMarkdown>}
        </div>
    )
}

export default Lesson
