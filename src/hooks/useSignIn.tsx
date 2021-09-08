import React from 'react'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { AuthContext } from '../contexts'
import { useAuthState } from 'react-firebase-hooks/auth';

export const useSignIn = () => {
    const auth = React.useContext(AuthContext)

    const [user, initialising, error] = useAuthState(auth);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const signInWithGoogle = async (redirect?: string) => {
        const provider = new GoogleAuthProvider();
        const userCredential = auth && await signInWithPopup(auth, provider);
        const token = userCredential && userCredential.user && await userCredential.user.getIdToken(true)
        localStorage.setItem('token', token || "");

        redirect ? window.location.href = redirect : window.location.reload();
    };

    const signInWithEmail = async (email: string, password: string, redirect?: string) => {
        const userCredential = auth && await signInWithEmailAndPassword(auth, email, password);
        if (userCredential) {
            const user = userCredential.user;
            if (user) {
                if (redirect) {
                    window.location.href = redirect;
                }
                window.location.href = '/';
            }
        }
    };

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return { user, initialising, error, signInWithGoogle, signInWithEmail, setEmail, setPassword, email, password, handleChangeEmail, handleChangePassword };
}