import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useEffect } from "react";

/**
 * Custom React lifecycle loop wrapper. Watches active cryptographically signed user sessions.
 * @param {Function} onUserChange - Asynchronous callback executed instantly upon authentication changes.
 */

export function useAuthObserver(onUserChange) {
    useEffect(() => {
        // Spawns a stream listener monitoring cookie/token lifecycles directly via Firebase Auth
        const unsubscribe = onAuthStateChanged(auth, onUserChange);

        return () => unsubscribe();


    }, [onUserChange]);

}
