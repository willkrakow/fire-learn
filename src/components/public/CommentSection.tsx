import React, { Suspense } from "react";
import { CircularProgress, makeStyles, Theme, Box, Typography } from "@material-ui/core";
import { useAuth, useFirestore } from "../../contexts";
import CommentList from "./CommentList";
import NewComment from "./NewComment";
import { User } from "@firebase/auth";
import { Timestamp } from "@firebase/firestore";



const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 900,
    margin: theme.spacing(2, "auto"),
  },
}));



interface Props {
  lessonId: string;
}

const CommentSection = ({ lessonId }: Props) => {
  const [comments, setComments] = React.useState<Array<LessonComment | any>>(
    []
  );
  const classes = useStyles();
  const { queryDocuments, addDocument } = useFirestore() as IFirestoreContext;
  const { currentUser } = useAuth() as { currentUser: User };
  const [comment, setComment] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    addDocument("comments", {
      lesson_id: lessonId,
      user_id: currentUser.uid,
      text: comment,
      created_at: Timestamp.fromDate(new Date()),
      user_display_name: currentUser.displayName,
    }).then(() => {
      setComment("");
      setLoading(false);
      console.log("here");
      getComments();
    });
  };

  const getComments = React.useCallback(() => {
    queryDocuments({
      collectionPath: "comments",
      queryParams: ["lesson_id", "==", lessonId],
    })
      .then(setComments)
      .catch((error) => console.error(error));
  }, [lessonId, queryDocuments]);

  React.useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <Box className={classes.root}>
      <Suspense fallback={<CircularProgress />}>
          <Typography variant="h5">Comments</Typography>
        <CommentList comments={comments} onDelete={getComments} />
        <NewComment
          lessonId={lessonId}
          loading={loading}
          comment={comment}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Suspense>
    </Box>
  );
};

export default CommentSection;
