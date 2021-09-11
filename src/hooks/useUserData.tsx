import { User } from "firebase/auth";
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import React from "react";

interface Props {
  user: User;
  db: Firestore;
}

const useUserData = ({ user, db }: Props) => {
  const [userData, setUserData] = React.useState<UserDocument | any>({});

  React.useEffect(() => {
    let isMounted = true;

    const getUserDocs = async () => {
      const q = query(
        collection(db, "users"),
        where("auth_id", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
      if (isMounted && querySnapshot.docs?.[0]?.exists) {
        setUserData(querySnapshot.docs[0].data());
      }
    };

    if (user) {
      try {
        getUserDocs();
      } catch (error) {
        console.log(error);
      }
    }

    return () => {
      // cleanup
      isMounted = false;
    };
  }, [user, db]);

  return userData;
};


export default useUserData;