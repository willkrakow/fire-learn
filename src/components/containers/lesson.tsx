import React from "react";
import { Card, CardContent, CardHeader, CircularProgress, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import { RouterButton } from "../buttons";
import Markdown from "./markdown";
import { useLesson } from "src/hooks";


type Props = {
    lessonId: string;
    courseId: string;
    courseName: string;
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minHeight: "100vh",
    },
    card: {
        padding: theme.spacing(2),
    },
    image: {
        height: 300
    },
}));

function Lesson({lessonId, courseId, courseName}: Props) {
  const { lessonData, loading } = useLesson(lessonId);
  const classes = useStyles();


  return (
      <>
        {loading && <CircularProgress />}
        {lessonData && !loading && (
            <Paper className={classes.root}>
                <RouterButton color="primary" variant="text" href={`/courses/${courseId}`}>&larr; Back to {courseName}</RouterButton>
            <Card className={classes.card}>
                <CardHeader title={courseName} titleTypographyProps={{ variant: "h4" }} subheader={lessonData.data.title} subheaderTypographyProps={{ variant: "h2" }} />
                <CardContent>
                    <Typography variant="subtitle1">{lessonData.data.subtitle}</Typography>
                    <Markdown children={lessonData.data.markdown_content} />
                </CardContent>
            </Card>
            </Paper>
        )
        }
        </>
  );
};

export default Lesson;
