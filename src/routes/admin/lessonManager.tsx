import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom'
import {LessonTable, LessonEditor} from '../../components/admin'

const LessonManager = () => {
  const { path } = useRouteMatch()
    return (
        <Switch>
            <Route path={`${path}/:lessonId`} component={LessonEditor} />
        </Switch>
    )
}

export default LessonManager