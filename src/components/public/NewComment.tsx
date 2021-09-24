import React from "react";
import { CircularProgress, TextField } from "@material-ui/core";
import { useAuth } from "../../contexts";
import { User } from "@firebase/auth";
import { RouterButton, PrimaryButton } from "../buttons";
interface Props {
  lessonId: string;
  comment: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
}

const NewComment = ({ comment, handleChange, handleSubmit, loading }: Props) => {
  const { currentUser } = useAuth() as { currentUser: User };
  

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="comment"
        label={
          currentUser ? (
            currentUser.displayName
          ) : (
            <RouterButton href="/login">Log in to comment</RouterButton>
          )
        }
        InputLabelProps={{
          shrink: true,
        }}
        multiline
        rows={3}
        variant="outlined"
        fullWidth
        onChange={handleChange}
        value={comment}
        disabled={!currentUser}
      />
      <PrimaryButton disabled={loading} type="submit">
        {loading && <CircularProgress />}Post
      </PrimaryButton>
    </form>
  );
};

export default NewComment;
