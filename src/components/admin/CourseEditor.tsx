import React from "react";
import {
  RouteComponentProps,
  useRouteMatch,
} from "react-router";
import { useFirestore } from "../../contexts";
import LessonManager from "../../routes/admin/lessonManager";
import CourseForm from './CourseForm'
import { Tabs, Tab } from '@material-ui/core';
import { useTabs } from "src/hooks";
import { TabPanel } from '../containers'

interface TParams {
  courseId: string;
}


const CourseEditor = ({ match }: RouteComponentProps<TParams>) => {
  const { url } = useRouteMatch();
  const [course, setCourse] = React.useState<Course | null>(null);
  const { getDocument } = useFirestore() as IFirestoreContext;
  const [loading, setLoading] = React.useState(false);
  const { tabValue, handleTabChange, ariaProps } = useTabs(2)
  React.useEffect(() => {
    setLoading(true);
    getDocument(`courses/${match.params.courseId}`)
      .then(setCourse)
      .finally(() => setLoading(false));
  }, [getDocument, match.params.courseId]);



  return (
    <>
      <Tabs onChange={handleTabChange} variant="fullWidth" value={tabValue}>
        {["Metadata", "Lessons"].map((text, index) => (
          <Tab tabIndex={index} key={text} label={text} {...ariaProps[index]} />
        ))}
      </Tabs>
      {!loading && course && (
        <>
        <TabPanel value={tabValue} index={0}>
          <CourseForm course={course} url={url} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <LessonManager />
        </TabPanel>
        </>
      )}
    </>
  );
};

export default CourseEditor;
