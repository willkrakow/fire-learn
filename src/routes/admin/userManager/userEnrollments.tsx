import React from "react";
import { useFirestore } from "../../../contexts/firestoreContext";
import { CircularProgress, Paper, Typography } from "@material-ui/core";
import EnrollmentList from "./enrollmentList";

const UserEnrollments = ({ userId }: { userId: string }) => {
  const { queryDocuments, getDocument } = useFirestore() as IFirestoreContext;
  const [enrollmentDocs, setEnrollmentDocs] = React.useState<IEnrollment[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    queryDocuments({
      collectionPath: "enrollments",
      queryParams: ["userId", "==", userId],
    })
      .then((e: IEnrollment[]) => {
        setEnrollmentDocs(e);
        setLoading(false);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [userId, getDocument, queryDocuments]);

  if (loading) return <CircularProgress />;
  if (enrollmentDocs.length === 0)
    return (
      <Paper>
        <Typography variant="h3">Enrollments</Typography>
        <Typography variant="h5">No enrollments</Typography>
      </Paper>
    );
  return (
    <Paper>
      <Typography variant="h3">Enrollments</Typography>
      {enrollmentDocs && !loading && (
        <EnrollmentList enrollmentDocs={enrollmentDocs} />
      )}
    </Paper>
  );
};

export default UserEnrollments;
