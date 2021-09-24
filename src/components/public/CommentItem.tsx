import React from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { useAuth, useFirestore } from "../../contexts";
import { User } from "@firebase/auth";
import { Delete } from "@material-ui/icons";

interface Props {
  comment: LessonComment;
  onDelete: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: "inherit",
    height: "auto",
    transition: "all 0.4s ease",
  },
  deleting: {
    transition: "all 0.4s ease",
    backgroundColor: theme.palette.error.light,
  },
}));

const CommentItem = ({ comment, onDelete }: Props) => {
  const [isOwner, setIsOwner] = React.useState<boolean>(false);
  const [deleting, setDeleting] = React.useState<boolean>(false);
  const { deleteDocument } = useFirestore() as IFirestoreContext;
  const { currentUser } = useAuth() as { currentUser: User };
  const classes = useStyles();
  React.useEffect(() => {
    if (currentUser) {
      setIsOwner(currentUser.uid === comment.data.user_id);
    }
  }, [currentUser, comment]);

  const handleDelete = () => {
    setDeleting(true);
    deleteDocument(`comments/${comment.id}`)
      .then(() => {
        setTimeout(() => {
        }, 1000);
      })
      .catch(() => {
        setDeleting(false);
      })
      .finally(() => {
        onDelete();
        setDeleting(false);
      });
  };

  return (
    <ListItem className={deleting ? classes.deleting : classes.root}>
      <ListItemText
        primary={comment.data.text}
        primaryTypographyProps={{ variant: "subtitle1" }}
        secondary={comment.data.user_display_name}
        secondaryTypographyProps={{ variant: "body1" }}
      />
      {isOwner && (
        <IconButton onClick={handleDelete}>
          <Delete fontSize="inherit" color="error" />
        </IconButton>
      )}
    </ListItem>
  );
};

export default CommentItem;
