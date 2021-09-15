import React from "react";
import { Paper, makeStyles, Theme } from "@material-ui/core";
import { useFirestore } from "../../../contexts/firestoreContext";
import Editor from 'rich-markdown-editor'

interface Props {
  lesson: Lesson;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        margin: theme.spacing(4)
    }
}));

const LessonEditor = ({ lesson }: Props) => {
  const classes = useStyles();

  const [lessonText, setLessonText] = React.useState(
    lesson.data.markdown_content
  );
  const { updateDocument } = useFirestore() as IFirestoreContext;
  const handleTextChange = (value: () => string): void => {
    console.log("here")      
  }

  const handleSave = ({done}: {done: boolean}): void => {
      console.log(done)
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // updateDocument({
    //   path: `lessons/${lesson.id}`,
    //   data: { markdown_content: lessonText },
    // })
    //   .then(() => {
    //     console.log("Successfully updated lesson");
    //   })
    //   .catch((error) => {
    //     console.log("Error updating lesson", error);
    //   });
  };

  const markdownTest = "# This is a heading\nAnd more text"
  return (
    <Paper className={classes.root}>
      <Editor
        className={classes.root}
        defaultValue={lesson.data.markdown_content}
      />
    </Paper>
  );
};

export default LessonEditor;
