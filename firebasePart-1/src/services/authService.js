import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase/firebase';

/**
 * Provisions a fresh login identity inside the core Firebase Authentication database.
 * Does not create the database profile document—only the auth identity.
 */
export const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

/**
 * Submits credentials to Firebase Auth to verify identity and generate short-lived JWT tokens.
 */
export const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);


export const logoutUser = () => signOut(auth);

export const resetUserPassword = (email) =>
    sendPasswordResetEmail(auth, email);
