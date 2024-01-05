import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "http://localhost:5173/registerEmail",
  // This must be true.
  handleCodeInApp: true,
};

export const registerUser = async (email, password, displayName) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: displayName,
      })
        .then(() => {
          console.log("User profile updated successfully");
          // ...
        })
        .catch((error) => {
          console.log("Error updating user profile:", error);
          // ...
        });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ...
    });
};

export const verifyUserEmail = (user) => {
  sendEmailVerification(user, actionCodeSettings)
    .then(() => {
      // Email verification sent!
      // ...
      console.log("Email verification sent!");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
      console.log("Password reset email sent!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode, errorMessage);
    });
};
