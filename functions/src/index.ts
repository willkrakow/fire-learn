import * as functions from "firebase-functions";
import {addDoc, collection, getFirestore} from 'firebase/firestore'
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.addUserDoc = functions.auth.user().onCreate(async (user) => {
    const db = getFirestore()
    try {
        const userRef = await addDoc(collection(db, 'users'), {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            createdAt: new Date().toISOString()
        })
        return userRef
    }
    catch(error){
        console.log(error)
        return false
    }
});
