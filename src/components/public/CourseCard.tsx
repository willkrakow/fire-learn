import React from 'react'
import { Card, Theme, CardMedia, Typography, makeStyles, CardContent, CardActions, Button, Box} from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        maxWidth: 345,
        padding: 0,
        position: 'relative',
    },
    media: {
        height: 532,
    },
    content: {
        "& *": {
            color: theme.palette.primary.light
        }
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
    actions: {
        padding: theme.spacing(2),
    },
    dark: {
        backgroundColor: "rgba(20, 20, 50, 0.8)",
        padding: theme.spacing(1),
        position: 'absolute',
        bottom: 0,
    }
}))

const CourseCard = ({course}: {course: Course}) => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={course?.data.image_url} />
            <Box className={classes.dark}>
            <CardContent className={classes.content}>
                <Typography variant="h4">{course?.data.name}</Typography>
                <Typography variant="body1">{course?.data.description}</Typography>
            </CardContent>
            <CardActions className={classes.actions}>
                <Button component={Link} to={`/courses/${course?.id}`} variant="contained" color="primary">
                    View course
                </Button>
            </CardActions>
            </Box>
        </Card>
    )
}

export default CourseCard