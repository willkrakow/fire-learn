import React from "react";
import { Paper, makeStyles, Theme, Button, CircularProgress } from "@material-ui/core";
import { useFirestore } from "../../../contexts/firestoreContext";
import Editor from 'rich-markdown-editor'
import { RouteComponentProps } from "react-router";


interface TParams {
  lessonId: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        margin: theme.spacing(4)
    }
}));

const LessonEditor = ({match}: RouteComponentProps<TParams>) => {
  const classes = useStyles();
  const { lessonId } = match.params;
  const [ loading, setLoading ] = React.useState(false);
  const [ lesson, setLesson ] = React.useState<Lesson | null>(null);
  const [lessonText, setLessonText] = React.useState("");
  const { getDocument, updateDocument } = useFirestore() as IFirestoreContext;
  

  // const handleSave = ({done}: {done: boolean}): void => {
  //     console.log(done)
  // }
  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log(lessonText)
    lesson && updateDocument({ path: `lessons/${lesson.id}`, data: { markdown_content: lessonText } })
    .then(() => console.log("updated"))
    .catch(err => console.log(err))
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

  React.useEffect(() => {
    setLoading(true);
    getDocument(`lessons/${lessonId}`)
      .then((lesson) => {
        setLesson(lesson);
        setLessonText(lesson.data().markdown_content);
      })
      .catch((error) => {
        console.log("Error getting lesson", error);
      })
      .finally(() => setLoading(false));

    }, [lessonId, getDocument]);
    



  return (
    <Paper className={classes.root}>
      {loading && <CircularProgress />}
      {!loading && lesson?.data && (
        <>
      <Editor
        className={classes.root}
        defaultValue={lesson.data.markdown_content}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save
      </Button>
      </>
      )}
    </Paper>
  );
};

export default LessonEditor;
