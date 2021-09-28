import React from "react";
import { CircularProgress, Typography, TypographyProps } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useFirestore } from "../../contexts";

interface Props {
  courseId: string;
  typographyProps?: TypographyProps;
}

interface IRating {
  id: string;
  data: {
    user_id: string;
    course_id: string;
    value: number;
  };
}

const CourseRating = ({ courseId, typographyProps = {
    variant: "body2",
    color: "primary",
} }: Props) => {
  const { queryDocuments } = useFirestore() as IFirestoreContext;

  const [rating, setRating] = React.useState(0);
  const [totalRatings, setTotalRatings] = React.useState<number>(0);

  const getRatings = React.useCallback(() => {
    queryDocuments({
      collectionPath: "ratings",
      queryParams: ["course_id", "==", courseId],
    })
      .then((ratings: IRating[]) => {
        // Calculate the average rating for this course
        const average =
          ratings.reduce((acc, curr) => {
            return acc + curr.data.value;
          }, 0) / ratings.length || 0;
        setRating(average);

        // Count the number of ratings for this course
        setTotalRatings(ratings.length);
      })
      .catch((error) => console.error(error));
  }, [courseId, queryDocuments]);

  React.useEffect(() => {
    getRatings();

    return getRatings;
  }, [getRatings]);

  return (
    <React.Suspense fallback={<CircularProgress />}>
      <Rating
        name={`ratings-${courseId}`}
        value={rating}
        precision={0.5}
        readOnly
      />
      <Typography
        {...typographyProps}
      >{`${totalRatings} reviews`}</Typography>
    </React.Suspense>
  );
};

export default CourseRating;
