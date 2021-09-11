
const functions = require("firebase-functions");
// // The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();


// firebase.initializeApp()
// interface IEnrollment {
//     user_id: string;
//     course_id: string;
//     user: any;
//     course: any;
// }

// interface IContext {
//     auth: {
//         uid: string;
//         token: any;
//     };
//     params: any;
//     request: any;
//     response: any;
// }

// interface Props {
//     context: IContext;
//     data: IEnrollment;
// }

// exports.createEnrollment = functions.https.onCall(({data, context}: Props ) => {
//     const { auth } = context
//     console.log(auth)
//     return {
//         message: "Hello World"
//     }
//     // if (!auth) {
//     //     throw new functions.https.HttpsError('unauthenticated', 'User is not authenticated')
//     // }
//     // if (auth.uid !== user_id) {
//     //     throw new functions.https.HttpsError('permission-denied', 'User is not authorized to create enrollment')
//     // }
//     // return admin.firestore().collection("enrollments").add({
//     //     createdAt: new Date(),
//     //     user_id: user_id,
//     //     course_id: course_id,
//     //     user: admin.firestore().doc(`users/${user_id}`),
//     //     course: admin.firestore().doc(`courses/${course_id}`)
//     // }).then(() => {
//     //     console.log('Enrollment created')
//     //     return {
//     //         message: 'Enrollment created'
//     //     }
//     // })

// });


