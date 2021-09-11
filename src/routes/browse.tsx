import React from 'react'
import { Grid, Card, Typography, Theme, Button, CardActions } from '@material-ui/core'
import { collection, getDocs, getFirestore, DocumentData, query, where } from 'firebase/firestore'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    padding: theme.spacing(2),
  },
}));

const Browse = () => {
    const db = getFirestore()
    const [courses, setCourses] = React.useState<Array<DocumentData | Course | any>>([])
    const [loading, setLoading] = React.useState(true)
    const [ enrollments, setEnrollments ] = React.useState<Array<DocumentData | Enrollment | any>>([])
    const auth = useAuth() as IAuthContext
    const { currentUser } = auth

    const classes = useStyles()
    React.useEffect(() => {
        setLoading(true)
        const getEnrollments = async () => {
            const q = query(collection(db, 'enrollments'), where("user_id", "==", currentUser?.uid))
            const userEnrollments = await getDocs(q)
            setEnrollments(userEnrollments.docs.map(d => d.data().course_id))
        }

        const getAllCourses = async () => {
            const coursesRes = await getDocs(collection(db, 'courses'))
            const coursesArray = coursesRes.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            setCourses(coursesArray)
        }
        getEnrollments()
        getAllCourses()
        setLoading(false)
        return () => {
            setCourses([])
        }
    }, [currentUser, db])
    
    if (loading) {
        return <div>Loading...</div>
    }

    
    return (
        <Grid container spacing={3}>
            {courses.filter((c: Course) => !enrollments.includes(c.id)).map((course: Course) => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                    <Card className={classes.card} >
                        <Typography variant="h3">{course.name}</Typography>
                        <Typography variant="subtitle1">{course.description}</Typography>
                        <Typography variant="subtitle2">{course.price}</Typography>
                        <Typography variant="subtitle2">by {course.author}</Typography>
                        <CardActions>
                            <Button component={Link} to={`/courses/${course.id}`}>View</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default Browse

