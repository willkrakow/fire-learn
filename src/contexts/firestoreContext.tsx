import React from "react";
import {
  getDoc,
  getFirestore,
  collection,
  doc,
  DocumentReference,
  DocumentData,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore";



export const FirestoreContext = React.createContext<IFirestoreContext | null>(null);

export const useFirestore = () => React.useContext(FirestoreContext);

export const FirestoreProvider: React.FC = ({ children }) => {
  const db = getFirestore();

  const getDocument = async (path: string) => {
      const documentRef = doc(db, path);
      const snapshot = await getDoc(documentRef);
      console.log(snapshot);
      return {
          data: snapshot.data(),
          id: snapshot.id
      };
  };

  const getDocumentFromReference = async (documentRef: DocumentReference<DocumentData>) => {
      const snapshot = await getDoc(documentRef);
      console.log(snapshot);
      return {
          data: snapshot.data(),
          id: snapshot.id
      };
  };

  const getCollection = async (path: string) => {
      const q = query(collection(db, path));
      const snapshot = await getDocs(q)
      return snapshot.docs.map((doc) => {
          return {
          id: doc.id,
          data: doc.data(),
          path: doc.ref.path,
          ref: doc.ref,
          metadata: doc.metadata
      }});
  };
  async function addDocument(
    collectionPath: string,
    data: any
  ) {
    const snapshot = await addDoc(collection(db, collectionPath), data);
    return snapshot;
  };

  const updateDocument = async ({
    path,
    data,
  }: IDocument) => {
      await updateDoc(doc(db, path), data);
  };

  const deleteDocument = async (path: string) => {
      await deleteDoc(doc(db, path));
  };

  const queryDocuments = async ({collectionPath, queryParams}: IQuery) => {
      const collectionRef = collection(db, collectionPath);
      const q = query(collectionRef, where(queryParams[0], queryParams[1], queryParams[2]));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => {
          return {
              id: doc.id,
              data: doc.data(),
              path: doc.ref.path,
              ref: doc.ref,
              metadata: doc.metadata
          }
      })
  }


  const getSubCollection = async ({collectionName, collectionItem, subCollectionName }: IGetSubCollection ) => {
      const subcollectionRef = collection(db, collectionName, collectionItem, subCollectionName);
      const snapshot = await getDocs(subcollectionRef);
      return snapshot.docs.map((doc) => {
          return {
              id: doc.id,
              data: doc.data()
          }
      })
  }

  const getSubCollectionDocument = async ({collectionName, collectionItem, subCollectionName, subCollectionItem}: IGetSubCollectionDocument) => {
      const docRef = doc(db, collectionName, collectionItem, subCollectionName, subCollectionItem);
      const snapshot = await getDoc(docRef);
      return snapshot.data();
  }

  const value = {
    getDocument,
    getCollection,
    addDocument,
    updateDocument,
    deleteDocument,
    queryDocuments,
    getSubCollection,
    getSubCollectionDocument,
    getDocumentFromReference,
  };
  return (
    <FirestoreContext.Provider value={value}>{children}</FirestoreContext.Provider>
  );
};
