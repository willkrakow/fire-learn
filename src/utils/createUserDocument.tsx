import { addDoc, collection, getFirestore } from "firebase/firestore";
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
    const userRef = await addDoc(collection(db, "users"), {
      ...additionalData,
      ...userAuth
    });
    console.log("Document written with ID: ", userRef.id);
  } catch (error) {
    console.log("error creating user document", error);
  }
};

export default createUserDocument
