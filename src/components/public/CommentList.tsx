import React from 'react'
import { List, makeStyles, Theme } from '@material-ui/core'
import CommentItem from './CommentItem'


interface Props {
    comments: LessonComment[];
    onDelete: () => void;
}


const CommentList = ({comments, onDelete}: Props) => {
    return (
      <List>
        {comments.sort((a,b) => a.data.created_at - b.data.created_at).map((comment: LessonComment, i: number) => (
          <CommentItem comment={comment} onDelete={onDelete} key={i} />
        ))}
      </List>
    );
}


export default CommentList