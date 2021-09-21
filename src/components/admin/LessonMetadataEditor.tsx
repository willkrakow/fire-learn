import React from "react";
import {
  TextField,
  IconButton,
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Theme,
  Snackbar,
  Checkbox,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";
import { useFirestore } from "../../contexts/firestoreContext";
import { useLesson } from "../../hooks";
import TagsInput from "./TagsInput";
import { Close as CloseIcon } from "@material-ui/icons";

interface Props {
  lessonId: string;
}

enum Languages {
  ENGLISH = "ENGLISH",
  SPANISH = "SPANISH",
  FRENCH = "FRENCH",
  GERMAN = "GERMAN",
  ITALIAN = "ITALIAN",
  JAPANESE = "JAPANESE",
  KOREAN = "KOREAN",
  PORTUGUESE = "PORTUGUESE",
}

enum Tags {
  "Math",
  "Science",
  "English",
  "History",
  "Geography",
  "Biology",
  "Chemistry",
  "Physics",
  "Music",
  "Art",
  "Literature",
  "Computer Science",
  "Business",
  "Economics",
  "Accounting",
  "Health",
  "Law",
  "Psychology",
  "Sociology",
  "Philosophy",
  "Religion",
}

const useStyles = makeStyles((theme: Theme) => ({
  grid: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  form: {
    marginBottom: theme.spacing(4),
  },
}));

const LessonMetadataEditor = ({ lessonId }: Props) => {
  const classes = useStyles();
  const { lessonData, loading } = useLesson(lessonId) as {
    lessonData: Lesson;
    loading: boolean;
  };
  const { updateDocument } = useFirestore() as IFirestoreContext;
  const [lessonUpdates, setLessonUpdates] = React.useState<Lesson | any>(null);
  const [saving, setSaving] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setMessage("");
  };

  React.useEffect(() => {
    if (lessonData && !lessonUpdates) {
      setLessonUpdates(lessonData);
    }
  }, [lessonData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    updateDocument({
      path: `lessons/${lessonId}`,
      data: {
        ...lessonUpdates.data,
        published: true,
      },
    })
      .then(() => {
        setMessage("Lesson updated successfully");
      })
      .catch((err) => {
        console.error(err);
        setMessage(err.message);
      })
      .finally(() => {
        setSnackbarOpen(true);
        setSaving(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name)
    console.log(e.target)
    console.log(value)
    setLessonUpdates({
      id: lessonId,
      data: {
        ...lessonUpdates?.data,
        [name]: value,
      },
    });
  };

  const handleTagsChange = (e: React.ChangeEvent<{}>, value: string[]) => {
    setLessonUpdates({
      id: lessonId,
      data: {
        ...lessonUpdates?.data,
        tags: value,
      },
    });
  };

  const handleLanguageChange = (e: React.ChangeEvent<{}>, value: string[]) => {
    setLessonUpdates({
      id: lessonId,
      data: {
        ...lessonUpdates?.data,
        languages: value,
      },
    });
  };

  const handlePublishedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLessonUpdates({
      id: lessonId,
      data: {
        ...lessonUpdates?.data,
        published: e.target.checked,
      },
    });
  };

  return (
    <>
      {loading && <CircularProgress />}
      {!loading && lessonUpdates?.data ? (
        <>
          <form onSubmit={handleSubmit} className={classes.form}>
            <Grid container spacing={5} className={classes.grid}>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  label="Title"
                  onChange={handleChange}
                  value={lessonUpdates.data.title}
                  variant="outlined"
                  name="title"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  label="Subtitle"
                  onChange={handleChange}
                  value={lessonUpdates.data.subtitle}
                  name="subtitle"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Summary"
                  onChange={handleChange}
                  value={lessonUpdates.data.summary}
                  name="summary"
                  fullWidth
                  multiline
                  variant="outlined"
                  minRows={3}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TagsInput
                  options={Object.values(Languages)}
                  onChange={handleLanguageChange}
                  label="Languages"
                  currentValues={lessonUpdates.data.languages}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TagsInput
                  options={Object.values(Tags).map((tag) => tag.toString())}
                  onChange={handleTagsChange}
                  currentValues={lessonUpdates.data.tags}
                  label="Tags"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                control={
                      <Checkbox
                        color="primary"
                        name="published"
                        checked={lessonUpdates.data.published}
                        onChange={handlePublishedChange}
                      />
                    }
                    label="Publish now?"
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              disabled={saving}
              color="primary"
              type="submit"
            >
              {saving && <CircularProgress />}
              {!lessonUpdates.data.published ? "Save as draft" : "Publish"}
            </Button>
          </form>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={message}
            action={
              <React.Fragment>
                <Button
                  color="secondary"
                  size="small"
                  onClick={handleSnackbarClose}
                >
                  Close
                </Button>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleSnackbarClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default LessonMetadataEditor;
