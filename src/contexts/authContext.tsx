import React, { useContext, useState, useEffect } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";





const AuthContext = React.createContext<IAuthContext | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateUserEmail(email: string) {
    return currentUser
      ? updateEmail(currentUser, email)
      : Promise.reject("No user logged in");
  }

  function updateUserPassword(password: string) {
    return currentUser
      ? updatePassword(currentUser, password)
      : Promise.reject("No user logged in");
  }

  function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider());
  }

  function updateUserName(displayName: string) {
    return currentUser
      ? updateProfile(currentUser, { displayName: displayName })
      : Promise.reject("No user logged in");
  }

  function updateUserPhoto(photoURL: string) {
      return currentUser
      ? updateProfile(currentUser, { photoURL: photoURL })
      : Promise.reject("No user logged in");
  }

  function isAdmin() {
    return currentUser && currentUser.email === "willkrakow@gmail.com"
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  const value: IAuthContext = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
    signInWithGoogle,
    updateUserName,
    updateUserPhoto,
    isAdmin,
  };

  if (loading) {
    return <div>loading...</div>;
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
