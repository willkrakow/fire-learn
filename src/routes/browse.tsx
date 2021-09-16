import React from 'react'
import { Grid, Card, Typography, Theme, Button, CardActions } from '@material-ui/core'
import { DocumentData, } from 'firebase/firestore'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import { useFirestore } from 'src/contexts/firestoreContext'
const useStyles = makeStyles((theme: Theme) => ({
  card: {
    padding: theme.spacing(2),
  },
}));

const Browse = () => {
    const { getCollection, queryDocuments } = useFirestore() as IFirestoreContext
    const [courses, setCourses] = React.useState<Array<DocumentData | Course | any>>([])
    const [loading, setLoading] = React.useState(true)
    const [ enrollments, setEnrollments ] = React.useState<Array<DocumentData | Enrollment | any>>([])
    const auth = useAuth() as IAuthContext
    const { currentUser } = auth

    const classes = useStyles()
    React.useEffect(() => {
        setLoading(true)
        const getEnrollments = async () => {
            queryDocuments({
                collectionPath: "enrollments",
                queryParams: [ "user_id", "==", currentUser?.uid ]
            })
            .then((enrollments: Array<DocumentData | Enrollment | any>) => {
                setEnrollments(enrollments)
            })
        }

        const getCourses = async () => {
            getCollection("courses").then(courses => {
                setCourses(courses)
            })
        }    
            
        getEnrollments()
        getCourses()
        setLoading(false)
        return () => {
            setCourses([])
        }
    }, [currentUser, getCollection, queryDocuments])
    
    if (loading) {
        return <div>Loading...</div>
    }

    
    return (
        <Grid container spacing={3}>
            {courses.filter((c: Course) => !enrollments.includes(c.id) || true).map((course: Course) => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                    <Card className={classes.card} >
                        <Typography variant="h3">{course.data.name}</Typography>
                        <Typography variant="subtitle1">{course.data.description}</Typography>
                        <Typography variant="subtitle2">{course.data.price}</Typography>
                        <Typography variant="subtitle2">by {course.data.author}</Typography>
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

