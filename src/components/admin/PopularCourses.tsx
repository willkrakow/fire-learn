import {
  CircularProgress,
  Table,
  TableHead,
  TableCell,
  Typography,
  TableRow,
  TableBody,
} from "@material-ui/core";
import React from "react";
import { useFirestore } from "../../contexts";
import DashboardItem from "./DashboardItem";
import { groupBy, sortBy } from "lodash";
import { MultilineChart } from '@material-ui/icons'


const PopularCourses = () => {
  const [loading, setLoading] = React.useState(false);
  const [courseEnrollments, setCourseEnrollments] = React.useState(
    [] as IPopularCourseItem[]
  );

  const { getCollection } = useFirestore() as IFirestoreContext;

  React.useEffect(() => {
    setLoading(true);
    getCollection("enrollments")
      .then((enrollments: any[]) => {
        const enrollmentData = enrollments.map((e) => e.data);
        const grouped = groupBy(enrollmentData, "course_id");
        const sorted = sortBy(grouped, (e: any) => !e.length);
        const popularCourses = sorted.map((e: any) => ({
          courseId: e[0].course_id,
          enrollments: e.length,
        }));
        setCourseEnrollments(popularCourses);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [getCollection]);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <DashboardItem
        title="Popular courses"
        loading={loading}
        data={<Table>
            <TableHead>
                <TableCell><Typography variant="h6">Course</Typography></TableCell>
                <TableCell><Typography variant="h6">Enrollments</Typography></TableCell>
                </TableHead>
                <TableBody>
            {courseEnrollments.slice(0,3).map((e: IPopularCourseItem) => (
                <PopularCourseItem
                key={e.courseId}
                courseId={e.courseId}
                enrollments={e.enrollments}
                />
                ))}
                </TableBody>
          </Table>
        }
        icon={MultilineChart}
        />
      )}
    </>
  );
};

export default PopularCourses;

interface IPopularCourseItem {
  courseId: string;
  enrollments: number;
}

const PopularCourseItem = ({ courseId, enrollments }: IPopularCourseItem) => {
  const { getDocument } = useFirestore() as IFirestoreContext;
  const [course, setCourse] = React.useState<Course | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    getDocument(`courses/${courseId}`)
      .then(setCourse)
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [courseId, getDocument])

  return (
    <>
      {loading || !course?.data ? (
        <CircularProgress />
      ) : (
        <TableRow>
            <TableCell>
                <Typography variant="h5">{course.data.name}</Typography>
            </TableCell>
            <TableCell>
                <Typography variant="h4">{enrollments.toString()}</Typography>
            </TableCell>
        </TableRow>
      )}
    </>
  );
};
