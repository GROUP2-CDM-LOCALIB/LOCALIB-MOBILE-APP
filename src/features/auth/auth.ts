import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import type { Dispatch, SetStateAction } from "react";



export const AuthError = {
  WRONG_CREDENTIALS: "wrongCredentials",
  LOGIN_ERROR: "logInError",
  MISSING_CREDENTIALS: "missingCredentials",
  UNKNOWN: "unknown",
} as const;

export type AuthErrorType = (typeof AuthError)[keyof typeof AuthError];

type LoginSubmitParams = {
  studentNo: string;
  password: string;
  setError: Dispatch<SetStateAction<AuthErrorType | null>>;
  onSuccess?: (token: string) => void; // Added callback for success
};

export async function logIn({
  studentNo,
  password,
  setError,
  onSuccess,
}: LoginSubmitParams) {
  setError(null);
  const trimmedStudentNo = studentNo.trim();

  if (!trimmedStudentNo || !password) {
    setError(AuthError.MISSING_CREDENTIALS);
    return;
  }

  // NOTE: If students don't type an '@', append your school's domain here:
  // const emailToVerify = `${trimmedStudentNo}@yourschool.edu`;
  const emailToVerify = trimmedStudentNo; 

  try {
    // 1. Firebase verifies the credentials here
    const userCredential = await signInWithEmailAndPassword(
      auth,
      emailToVerify,
      password
    );

    // 2. Get the Firebase ID Token
    const token = await userCredential.user.getIdToken();
    console.log("User verified! Token:", token);

    // 3. Tell SignInScreen that login worked and pass the token
    if (onSuccess) {
      onSuccess(token);
    }
  } catch (err) {
    if (err instanceof FirebaseError) {
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/invalid-email" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setError(AuthError.WRONG_CREDENTIALS);
        return;
      }
      setError(AuthError.LOGIN_ERROR);
      return;
    }
    setError(AuthError.UNKNOWN);
  }
}