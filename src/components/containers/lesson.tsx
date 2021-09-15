import React from "react";
import ReactMarkdown from "react-markdown";
import { useFirestore } from "../../contexts/firestoreContext";
import { DocumentSnapshot, DocumentData, Timestamp } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardMedia, CircularProgress, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import { useStorage } from "src/contexts/storageContext";
import { Link, useLocation, Route, Switch } from "react-router-dom";
import { RouterButton } from "../buttons";
import Markdown from "./markdown";
import { useLesson } from "src/hooks";
import { useAuth } from "src/contexts/authContext";
import LessonEditor from "../admin";


interface ILesson extends DocumentSnapshot<DocumentData> {
  markdown_content: string;
  title: string;
  id: string;
  draft: boolean;
  available: boolean;
  created_at: Timestamp;
  subtitle: string;
  image_path: string;
  image_url?: string;
}


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
  const { downloadFile } = useStorage() as IStorageContext
  const { lessonData, loading } = useLesson(lessonId);
  const { pathname } = useLocation()
  const { isAdmin } = useAuth() as IAuthContext;



  const classes = useStyles();


  return (
    <Switch>
        <Route exact path={`/courses/${courseId}/lessons/${lessonId}`}>
        {loading && <CircularProgress />}
        {!loading && isAdmin() && <RouterButton variant="outlined" color="secondary" href={`${pathname}/edit`}>Edit</RouterButton>}
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
        </Route>
        <Route render={() => {
            if(loading) return <CircularProgress />
            if (!loading && !isAdmin()) return <div>Not allowed</div>
            if (lessonData && isAdmin()) {
                return <LessonEditor lesson={lessonData} />
            }
            return <div>404 - Not allowed</div>
        }} path={`/courses/${courseId}/lessons/${lessonId}/edit`} />
    </Switch>
  );
};

export default Lesson;
