import React from 'react'
import { Card, Theme, CardMedia, Typography, makeStyles, CardContent, CardActions, Button, Box} from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 0,
    position: "relative",
  },
  media: {
    height: 532,
  },
  content: {
    "& p": {
      color: theme.palette.primary.contrastText
    }
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  actions: {
    padding: theme.spacing(2),
  },
  dark: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(3),
    position: "absolute",
    bottom: 0,
    background: `linear-gradient(to bottom,
        rgba(0,0,0,0.0) 0%,
        rgba(0,0,0,0.1) 5%,
        rgba(0,0,0,0.2) 10%,
          rgba(0,0,0,0.5) 20%,
        rgba(0,0,0,0.6) 30%,
        rgba(0,0,0,0.9) 80%)`,
  },
}));


interface Props extends React.ComponentProps<typeof Card> {
   course: Course
}

const CourseCard: React.FC<Props> = ({course, ...props}) => {
    const classes = useStyles()
    return (
        <Card className={classes.root} {...props}>
            <CardMedia className={classes.media} image={course?.data.image_url} title={course?.data.name} />
            <Box className={classes.dark}>
            <CardContent className={classes.content}>
                <Typography variant="h3">{course?.data.name}</Typography>
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