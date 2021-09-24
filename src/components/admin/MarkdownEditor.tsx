import React from "react";
import {
  makeStyles,
  Theme,
  Button,
  CircularProgress,
  Box,
  useTheme,
  Paper,
  Typography
} from "@material-ui/core";
import { useFirestore } from "../../contexts";
import Editor, { theme as markdownTheme } from "rich-markdown-editor";
import { Timestamp } from 'firebase/firestore'
import { calculateReadingTime } from '../../utils'
import { useSnackbar } from '../../hooks'

interface Props {
  lessonData: Lesson;
  loading: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 900,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  paper: {
    padding: theme.spacing(4, 5),
    minHeight: 500,
    fontStyle: "normal",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "& h3": {
      fontSize: theme.typography.h3.fontSize,
    },
    "& h4": {
      fontSize: theme.typography.h4.fontSize,
    },
    "& h5": {
      fontSize: theme.typography.h5.fontSize,
    },
    "& h6": {
      fontSize: theme.typography.h6.fontSize,
    },
    "& p": {
      fontSize: theme.typography.body1.fontSize,
    },
  },
  button: {
    width: "min-content",
    margin: theme.spacing(2, "auto"),
  },
}));



const ContentEditor = ({lessonData, loading}: Props) => {
  const theme = useTheme();
  const classes = useStyles();
  const [lessonText, setLessonText] = React.useState(lessonData.data.markdown_content || "");
  const { updateDocument } = useFirestore() as IFirestoreContext;
  const [saving, setSaving] = React.useState(false);
  const { SnackbarAlert, setOpen, setMessage, setSeverity } = useSnackbar();

  const handleSaveContent = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSaving(true);
    lessonText &&
      updateDocument({
        path: `lessons/${lessonData.id}`,
        data: { 
          markdown_content: lessonText,
          updated_at: Timestamp.fromDate(new Date()),
          reading_time: calculateReadingTime(lessonText),
        },
      })
        .then(() => {
          setSaving(false);
          setOpen(true);
          setMessage("Lesson content updated");
          setSeverity("success");
        })
        .catch((err) => {
          setSaving(false);
          setOpen(true);
          setMessage("Error saving lesson");
          setSeverity("error");
        })
        .finally(() => setSaving(false));
  };

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && lessonData?.data && (
        <Box className={classes.root}>
          <Typography variant="h4">Content editor</Typography>
          <Paper className={classes.paper}>
            <Editor
              defaultValue={lessonData.data.markdown_content}
              onChange={(value) => setLessonText(value)}
              headingsOffset={2}
              theme={{
                ...markdownTheme,
                black: theme.palette.text.primary,
                white: theme.palette.common.white,
                primary: theme.palette.primary.main,
                textSecondary: theme.palette.text.secondary,
                almostBlack: theme.palette.text.secondary,
                fontFamily:
                  theme.typography.fontFamily ||
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen'",
                fontFamilyMono:
                  "Menlo, Monaco, Consolas, 'Courier New', monospace",
                fontWeight: 400,
              }}
              // theme={{
              //   ...markdownTheme,
              //   fontFamily:
              //     "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',",
              //   fontFamilyMono: "Roboto Mono",
              //   black: grey[900],
              //   white: grey[50],
              //   background: grey[50],
              //   almostBlack: grey[800],
              //   primary: teal[500],
              // }}
            />
          </Paper>
          <Button
            variant="contained"
            disabled={saving || loading}
            color="primary"
            onClick={handleSaveContent}
            className={classes.button}
          >
            {saving ? <CircularProgress /> : "Save"}
          </Button>
          <SnackbarAlert />
        </Box>
      )}
    </>
  );
};

export default ContentEditor;
