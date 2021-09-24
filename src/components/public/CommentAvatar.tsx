import React from "react";
import { makeStyles, Theme, CircularProgress, ListItemAvatar } from "@material-ui/core";
import { useFirestore } from "../../contexts";


interface Props {
  userId: string;
}


const useStyles = makeStyles((theme: Theme) => ({
    avatar: {
        width: "50px",
        height: "50px",
    }
}));

const CommentAvatar = ({ userId }: Props) => {
  const classes = useStyles();
  const { getDocument } = useFirestore() as IFirestoreContext;
  const [user, setUser] = React.useState<UserDocument | null>(null);
  React.useEffect(() => {
    getDocument(`users/${userId}`)
      .then(setUser)
      .catch((error) => {
        console.error(error.message);
      })
  }, [getDocument, userId]);

  return (
    <ListItemAvatar>
      <React.Suspense fallback={<CircularProgress />}>
          {user?.data?.id}
        <img src="" alt="avatar" className={classes.avatar} />
      </React.Suspense>
    </ListItemAvatar>
  );
};


export default CommentAvatar;