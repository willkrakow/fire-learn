import React from "react";
import {
  makeStyles,
  Theme,
  Button,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { useFirestore } from "../../contexts";
import Editor from "rich-markdown-editor";
import { Timestamp } from 'firebase/firestore'

interface Props {
  lessonData: Lesson;
  loading: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(3),
    marginTop: theme.spacing(0),
  },
  editor: {
    borderColor: theme.palette.secondary.light,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
  }
}));

function countWordsInMarkdown(markdown: string) {
  return markdown.split(/\s+/).length;
}

function calculateReadingTime(markdown: string) {
  const wordsPerMinute = 200;
  const words = countWordsInMarkdown(markdown);
  const minutes = Math.floor(words / wordsPerMinute);
  const seconds = Math.floor((words % wordsPerMinute) / (wordsPerMinute / 60));
  return `${minutes} min ${seconds} sec`;
}

const ContentEditor = ({lessonData, loading}: Props) => {
  const classes = useStyles();
  const [lessonText, setLessonText] = React.useState("");
  const { updateDocument } = useFirestore() as IFirestoreContext;
  const [saving, setSaving] = React.useState(false);

  const handleSaveContent = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSaving(true);
    lessonText &&
      updateDocument({
        path: `lessons/${lessonData.id}`,
        data: { 
          markdown_cntent: lessonText,
          updated_at: Timestamp.fromDate(new Date()),
          reading_time: calculateReadingTime(lessonText),
        },
      })
        .then(() => console.log("updated"))
        .catch((err) => console.log(err))
        .finally(() => setSaving(false));
  };

  React.useEffect(() => {
    if (!lessonText && lessonData?.data.markdown_content) {
      setLessonText(lessonData.data.markdown_content);
    }
  }, [lessonData]);

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   lesson && updateDocument({ path: `lessons/${lesson.id}`, data: lesson.data })
  //   .then(() => console.log("updated lesson dat"))
  //   .catch(err => console.log(err))
  // };

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && lessonData?.data && (
        <>
          <Box className={classes.editor}>
            <Editor
              className={classes.root}
              defaultValue={lessonData.data.markdown_content}
              onChange={(value) => setLessonText(value)}
            />
          </Box>
          <Button
            variant="contained"
            disabled={saving || loading}
            color="primary"
            onClick={handleSaveContent}
          >
            {saving ? <CircularProgress /> : "Save"}
          </Button>
        </>
      )}
    </>
  );
};

export default ContentEditor;
