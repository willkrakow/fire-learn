import React from "react";



// const signIn = async (auth: Auth) => {
//   const provider = new GoogleAuthProvider();
//   await signInWithPopup(auth, provider);
// };

// const UserDetails = ({ user }: UserDetailsProps) => {
//   return (
//     <Card>
//       <Typography variant="h4">{user.displayName}</Typography>
//     </Card>
//   );
// };

// const SignInForm = () => {
//   const auth = useAuth();
//   const handleSignIn = () => {
//     signIn(auth);
//   };
//   return (
//     <Card title="Sign-in form">
//       <Button onClick={handleSignIn} />
//     </Card>
//   );
// };

const Home = () => {
//   const { status, data: signInResult } = useSigninCheck();

//   if (status === "loading") {
//     return <span>loading</span>;
//   }
//   const { signedIn, user } = signInResult;

//   return signedIn && user ? <UserDetails user={user} /> : <SignInForm />;
return (
<React.Fragment>
<h1>hi</h1>
</React.Fragment>)
};

export default Home;
