import React from "react";
import {
  CircularProgress,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import ContentEditor from "./MarkdownEditor";
import { RouteComponentProps } from "react-router";
import { useLesson } from "../../hooks";
import LessonMetadataEditor from "./LessonMetadataEditor";

interface TParams {
  lessonId: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const LessonEditor = ({ match }: RouteComponentProps<TParams>) => {
  const classes = useStyles();
  const { lessonId } = match.params;
  const { lessonData, loading } = useLesson(lessonId) as {
    lessonData: Lesson;
    loading: boolean;
  };

  return (
    <>
      {loading && <CircularProgress />}
      {lessonData?.data && (
        <>
          <Typography variant="h3">{lessonData.data.title}</Typography>
          <Grid container spacing={5} className={classes.root}>
            <Grid item xs={12} lg={6}>
              <LessonMetadataEditor lessonData={lessonData} lessonId={lessonId} />
            </Grid>
            <Grid item xs={12} lg={6}>
              {!loading && lessonData && (
                <ContentEditor lessonData={lessonData} loading={loading} />
              )}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default LessonEditor;
