import React from 'react'
import { Card, Theme, CardMedia, Typography, makeStyles, CardContent, CardActions, Button, CardActionArea, CircularProgress} from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'
import { useFirestore } from 'src/contexts/firestoreContext'
import { useCourse } from 'src/hooks'
interface Props {
    course_id: string;
    rest?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 300,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}))

const CourseCard = ({course_id, ...rest}: Props) => {
    const classes = useStyles()
    const { courseData, loading } = useCourse(course_id)

    return loading ? <CircularProgress /> : (
        <Card {...rest} className={classes.root}>
            <CardActionArea>
            <CardMedia className={classes.media} image={courseData?.data.image_url} />
            <CardContent>
                <Typography variant="h5">{courseData?.data.name}</Typography>
                <Typography variant="body1">{courseData?.data.description}</Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
                <Button component={Link} to={`/courses/${course_id}`} size="small" variant="contained" color="primary">
                    See today's lessons
                </Button>
            </CardActions>
        </Card>
    )
}

export default CourseCard