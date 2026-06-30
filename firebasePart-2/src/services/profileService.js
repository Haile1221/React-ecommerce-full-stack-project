import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

/**
 * Generates an extensive identity profile document mapped precisely to the user's account UID.
 * Normalizes input structures (like trim/lowercase) to guarantee structural safety inside database fields.
 */

export const createUserProfile = async (uid, fullName, username, email) => {
    // Configures a direct resource locator targeting the 'users' collection matching the specific UID
    const userRef = doc(db, 'users', uid);
    // Writes structured schema parameters down to Cloud Firestore
    await setDoc(useRef, {
        fullName,
        username: username.toLowerCase.trim(),
        createdAt: new Date().toISOString()
    });
}

export const fetchUserProfile = async (uid) => {
    const userRef = doc(db, 'users', uid);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
        return snapshot.data();

    }
    return null;
}