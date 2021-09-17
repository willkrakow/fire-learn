import React from 'react'
import { ListItem, LinearProgress, ListItemText } from '@material-ui/core'
import {useCourse} from '../../../hooks'

interface Props {
    enrollment: IEnrollment;
}

const EnrollmentItem = ({enrollment}: Props) => {
    const { courseData, loading } = useCourse(enrollment.data.course_id) || { loading: true }

    if (loading) {
        return <ListItem>Loading...</ListItem>
    }

    return (
        <ListItem divider key={enrollment.id}>
            <ListItemText
              primary={courseData?.data.name}
              primaryTypographyProps={{ variant: "h4" }}
              secondaryTypographyProps={{ variant: "subtitle1" }}
              secondary={`Started ${enrollment.data.enrolled_at
                .toDate()
                .toLocaleString()}`}
            />
            <LinearProgress
              draggable={false}
              value={enrollment.data.progress}
              variant="determinate"
            />
            <ListItemText
              secondary={`${enrollment.data.progress}% Complete`}
              secondaryTypographyProps={{ variant: "body1" }}
            />
          </ListItem>
    )
}

export default EnrollmentItem