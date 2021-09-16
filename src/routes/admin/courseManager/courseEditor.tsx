import React from "react";
import {
  Route,
  Switch,
  RouteComponentProps,
  useRouteMatch,
} from "react-router";
import { useFirestore } from "src/contexts/firestoreContext";
import LessonManager from "../lessonManager";
import { CourseForm } from 'src/components/admin/course'


interface TParams {
  courseId: string;
}


const CourseEditor = ({ match }: RouteComponentProps<TParams>) => {
  const { path, url } = useRouteMatch();
  const [course, setCourse] = React.useState<Course | null>(null);
  const { getDocument } = useFirestore() as IFirestoreContext;
  const [loading, setLoading] = React.useState(false);


  React.useEffect(() => {
    setLoading(true);
    getDocument(`courses/${match.params.courseId}`)
      .then(setCourse)
      .finally(() => setLoading(false));
  }, [getDocument, match.params.courseId]);


  return (
    <Switch>
      <Route
        exact
        path={path}
        render={() => (
          <CourseForm course={course} loading={loading} url={url} />
        )}
      />
      <Route path={`${path}/lessons`} component={LessonManager} />
    </Switch>
  );
};

export default CourseEditor;
