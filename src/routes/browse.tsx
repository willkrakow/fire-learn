import React from "react";
import { Grid } from "@material-ui/core";
import { DocumentData } from "firebase/firestore";
import { useFirestore } from "../contexts";
import { CourseCard } from "../components/public";

const Browse = () => {
  const { getCollection } = useFirestore() as IFirestoreContext;
  const [courses, setCourses] = React.useState<
    Array<DocumentData | Course | any>
  >([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);

    getCollection("courses").then((courses) => {
        setCourses(courses);
      });
    setLoading(false);
    return () => {
      setCourses([]);
    };
  }, [getCollection]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={3}>
      {courses.map((course: Course) => (
        <Grid item xs={12} md={4} lg={3} key={course.id}>
          <CourseCard course={course} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Browse;
