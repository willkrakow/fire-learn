import { Auth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const signInWithGoogle = async (auth: Auth) => {
  const provider = new GoogleAuthProvider();
  const userCredential = auth && (await signInWithPopup(auth, provider));
  if (userCredential) {
    const user = userCredential.user;
    if (user) {
      console.log(user);
    }
  }
};

export default signInWithGoogle;
