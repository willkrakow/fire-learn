import React from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Grid,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
} from "@material-ui/core";
import { useFirestore } from "../../contexts";
import TagsInput from "./TagsInput";
import { useSnackbar } from '../../hooks'
interface Props {
  lessonId: string;
  lessonData: Lesson;
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


const LessonMetadataEditor = ({ lessonId, lessonData }: Props) => {
  const { updateDocument } = useFirestore() as IFirestoreContext;
  const [lessonUpdates, setLessonUpdates] = React.useState<Lesson | any>(lessonData);
  const [saving, setSaving] = React.useState(false);
  const { SnackbarAlert,  setOpen, setMessage, setSeverity } = useSnackbar();

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
        setSeverity("success");
      })
      .catch((err) => {
        setSeverity("error");
        setMessage(err.message);
      })
      .finally(() => {
        setSaving(false);
        setOpen(true);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
      {lessonUpdates?.data ? (
        <Box>
          <Typography variant="h4">Lesson details</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    label="Title"
                    onChange={handleChange}
                    value={lessonUpdates.data.title}
                    variant="filled"
                    name="title"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Subtitle"
                    onChange={handleChange}
                    value={lessonUpdates.data.subtitle}
                    name="subtitle"
                    variant="filled"
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
                    variant="filled"
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
            <SnackbarAlert />
        </Box>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default LessonMetadataEditor;
