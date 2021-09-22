import React from "react";
import { CircularProgress } from "@material-ui/core";
import { useFirestore } from "../../contexts/firestoreContext";
import { useHistory } from "react-router";
import { DocumentData, DocumentReference, Timestamp } from "@firebase/firestore";
import { PlusOne } from "@material-ui/icons";
import { PrimaryButton } from '../buttons'
const AddCourse = () => {
  const { addDocument } = useFirestore() as IFirestoreContext;
  const [loading, setLoading] = React.useState(false);
  const { push } = useHistory();

  const handleNewCourse = () => {
    setLoading(true);
    addDocument("courses", {createdAt: Timestamp.fromDate(new Date())}).then(
      (ref: DocumentReference<DocumentData>) => {
        setLoading(false);
        push(`courses/${ref.id}`);
      }
    );
  };

  return (
    <PrimaryButton
      onClick={handleNewCourse}
      variant="contained"
      color="primary"
      fullWidth
    >
      {loading ? (
        <CircularProgress size="small" />
      ) : (
        <PlusOne fontSize="inherit" />
      )}
      Add course
    </PrimaryButton>
  );
};

export default AddCourse;
