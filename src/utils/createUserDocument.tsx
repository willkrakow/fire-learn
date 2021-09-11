import { setDoc, doc, getFirestore, Timestamp } from "firebase/firestore";
import { User } from 'firebase/auth'

interface Props {
    userAuth: User;
    additionalData?: Partial<UserDocument>
}

const createUserDocument = async ({
  userAuth,
  additionalData }: Props
) => {
  const db = getFirestore();
  if (!userAuth) return;

  try {
    const updated_at = Timestamp.fromMillis(Date.now())
    await setDoc(doc(db, 'users', userAuth.uid), {
      ...additionalData,
      ...userAuth,
      updated_at: updated_at,
    });
    console.log("Document written with ID: ", userAuth.uid);
  } catch (error) {
    console.log("error creating user document", error);
  }
};

export default createUserDocument
