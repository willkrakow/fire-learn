import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Request:", JSON.stringify(request));
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const onUserCreate = functions.auth.user().onCreate((user) => {
  // Add a new document in collection "users"
  const userRef = admin.firestore().collection("users").doc(user.uid);
  userRef
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber,
      disabled: user.disabled,
      metadata: user.metadata,
      creationTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime,
      providerData: user.providerData,
      customClaims: user.customClaims,
      tenantId: user.tenantId,
      tokensValidAfterTime: user.tokensValidAfterTime,
    })
    .then(() => {
      functions.logger.info(
        `Document successfully written! New user document: ${user.displayName}: ${user.uid}`
      );
    })
    .catch((error) => {
      functions.logger.error("Error writing document: ", error);
    });
});

export const onUserDelete = functions.auth.user().onDelete((user) => {
  // Delete the document in collection "users"
  const userRef = admin.firestore().collection("users").doc(user.uid);
  userRef
    .delete()
    .then(() => {
      functions.logger.info(
        `Document successfully deleted! User document: ${user.displayName}: ${user.uid}`
      );
    })
    .catch((error) => {
      functions.logger.error("Error deleting document: ", error);
    });
});

export const onUserUpdate = functions.firestore
  .document("users/{userId}")
  .onUpdate((change, context) => {
    if (!context.auth?.uid) {
      return null;
    }
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const newValue = change.after.data();

    // ...or the previous value before this update
    const previousValue = change.before.data();

    const dataToUpdate = newValue ? newValue : previousValue;

    // access a particular field as you would any JS property
    admin
      .auth()
      .updateUser(context.auth?.uid, {
        displayName: dataToUpdate.displayName,
        email: dataToUpdate.email,
        photoURL: dataToUpdate.photoURL,
        emailVerified: dataToUpdate.emailVerified,
        phoneNumber: dataToUpdate.phoneNumber,
        disabled: dataToUpdate.disabled,
      })
      .then(() => {
        functions.logger.info(
          `Document successfully updated! User document: ${dataToUpdate.displayName}: ${context.auth?.uid}`
        );
      })
      .catch((error) => {
        functions.logger.error("Error updating document: ", error);
      });

    return null;
  });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
