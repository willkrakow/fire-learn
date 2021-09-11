import React from 'react'
import { useCourse } from '../../hooks'
import { Card, Typography } from '@material-ui/core'

interface Props {
    course_id: string;
    rest?: any;
    className: string;
}
const CourseCard = ({course_id, className, ...rest}: Props) => {
    const {course, isLoading} = useCourse(course_id)
    
    return isLoading ? <div>Loading</div> : (
        <Card className={className} {...rest}>
            <Typography variant="h5">{course.name}</Typography>
            <Typography variant="body1">{course.description}</Typography>
        </Card>
    )
}

export default CourseCard