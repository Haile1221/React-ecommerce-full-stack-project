// import { createContext, useContext, useState, useEffect, useCallback } from "react";
// import { loginUser, registerUser, logoutUser, resetUserPassword } from "../services/authService";
// import { createUserProfile, fetchUserProfile } from "../services/profileService";
// import { uploadCartToCloud, downloadCartFromCloud } from "../services/cartSyncService";

// import { saveCartToStorage, clearCartStorage } from "../utils/storage";
// import { useAuthObserver } from "../hooks/useAuthObserver";
// import { clearCart } from "../features/cart/cartSlice";
// import { useDispatch, useSelector } from "react-redux";

// // Generates an isolated global context channel matrix link
// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//     const [user, setUser] = useState(null);   // React state tracking the core active auth session
//     const [profile, setProfile] = useState(null);   // React state housing custom Firestore metadata values
//     const [authLoading, setAuthLoading] = useState(true); // Master gate keeping UI components locked until auth finishes
//     const dispatch = useDispatch();
//     const cart = useSelector((state) => state.cart);

//     // CALLBACK BLOCK: STRIPS BUSINESS LOGIC FROM LIFECYCLE LOOPS
//     // useCallback freezes reference identity bounds to prevent endless hook re-execution loops
//     const handleAuthChange = useCallback(async (firebaseUser) => {

//         if (firebaseUser) {
//             setUser(firebaseUser); // Sets the authenticated user baseline instance

//             try {
//                 // Performance optimization: triggers profile and cart downloads simultaneously in parallel
//                 const [userProfile, cloudCart] = await Promise.all([
//                     fetchUserProfile(firebaseUser.uid),
//                     downloadCartFromCloud(firebaseUser.uid)
//                 ]);
//                 setProfile(userProfile)   // Mounts profile values up to the active interface state layer
//                 // Downstream data sync: hydrate browser memory strings if cloud recovery profiles match
//                 if (clearCart && cloudCart.items?.length > 0) {
//                     saveCartToStorage({
//                         items: cloudCart.items,
//                         totalQuantity: cloudCart.totalQuantity,
//                         totalAmount: cloudCart.totalAmount

//                     })
//                 }

//             } catch (error) {
//                 console.error("Critical error encountered during user data profile hydration:", error);
//             }


//         } else {
//             // Security Sweep: wipes state clear when a session token gets invalidated or logged out
//             setUser(null);
//             setProfile(null);

//         }

//         setAuthLoading(false) // Drops the application startup protection gate


//     }, []);
//     // Registers our long-running session stream watcher logic
//     useAuthObserver(handleAuthChange);

//     // AUTOMATED SYNCHRONIZATION PIPELINE (DEBOUNCED)

//     useEffect(() => {
//         // Abort criteria: do not trigger network sync pipelines if there is no logged-in user session

//         if (!user || authLoading) return;

//         // Debounce mechanic: waits for a 1.2-second pause in user edits before updating the database.
//         // Stops the app from hitting Firestore rate limits every single time an item is added to the cart.
//         const timeOut = setTimeout(async () => {
//             try {
//                 await uploadCartToCloud(user.uid, cart);

//             } catch (error) {
//                 console.error("Background Firestore automated cart backup aborted:", error);

//             }

//         }, 1200);


//         // Cleanup routine: cancels the pending write if user adds another item before the 1.2s timer finishes

//         return () => clearTimeout(timeOut);
//     }, [cart, user, authLoading])
//     // ORCHESTRATED EXPOSED CONTROL WORKFLOW METHODS

//     //   Complex identity creation transaction mapping across separate authentication and database networks.

//     const signup = async (email, password, fullName, username) => {
//         // 1. Provisions account verification tokens inside base Firebase Auth instances
//         const credentials = await registerUser(email, password);
//         // 2. Bridges data packages over to populate deep database tables inside the Firestore cloud engine
//         await createUserProfile(credentials.user.uid, fullName, username, email);

//         // 3. Implements standard industry security: forces log out to cleanly route them back to `/login`
//         await logoutUser();



//     };
//     const login = (email, password) => loginUser(email, password);
//     const logout = async () => {
//         await logoutUser();
//         dispatch(clearCart()); // Wipes current temporary volatile Redux client data states
//         clearCartStorage();    // Purges offline persistence keys to ensure privacy boundaries
//         setProfile(null);    // Safely cleans context profile structures out of client memory space

//     }

//     const resetPassword = (email) => resetUserPassword(email);
//     // Structured matrix value package exposed directly to UI children components

//     const value = { user, profile, signup, login, resetPassword, authLoading }


//     return (
//         <AuthContext.Provider value={value}>
//             {!authLoading && children}
//         </AuthContext.Provider>
//     );

// }

// export const useAuth = () => useContext(AuthContext);

// updated 

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
    loginUser,
    registerUser,
    logoutUser,
    resetUserPassword
} from "../services/authService";

import {
    createUserProfile,
    fetchUserProfile
} from "../services/profileService";

import {
    uploadCartToCloud,
    downloadCartFromCloud
} from "../services/cartSyncService";

import {
    saveCartToStorage,
    clearCartStorage
} from "../utils/storage";

import { useAuthObserver } from "../hooks/useAuthObserver";
import { clearCart } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const handleAuthChange = useCallback(async (firebaseUser) => {
        if (firebaseUser) {
            setUser(firebaseUser);

            try {
                const [userProfile, cloudCart] = await Promise.all([
                    fetchUserProfile(firebaseUser.uid),
                    downloadCartFromCloud(firebaseUser.uid)
                ]);

                setProfile(userProfile);

                // Restore cloud cart safely
                if (cloudCart?.items?.length > 0) {
                    saveCartToStorage({
                        items: cloudCart.items,
                        totalQuantity: cloudCart.totalQuantity || 0,
                        totalAmount: cloudCart.totalAmount || 0,
                    });
                }

            } catch (error) {
                console.error(
                    "Critical error encountered during user data profile hydration:",
                    error
                );
            }
        } else {
            setUser(null);
            setProfile(null);
        }

        setAuthLoading(false);
    }, []);

    useAuthObserver(handleAuthChange);

    useEffect(() => {
        if (!user || authLoading) return;

        const timeout = setTimeout(async () => {
            try {
                await uploadCartToCloud(user.uid, cart);
            } catch (error) {
                console.error(
                    "Background Firestore automated cart backup aborted:",
                    error
                );
            }
        }, 1200);

        return () => clearTimeout(timeout);
    }, [cart, user, authLoading]);

    const signup = async (
        email,
        password,
        fullName,
        username
    ) => {
        const credentials = await registerUser(
            email,
            password
        );

        await createUserProfile(
            credentials.user.uid,
            fullName,
            username,
            email
        );

        // Force login after registration
        await logoutUser();
    };

    const login = (email, password) =>
        loginUser(email, password);

    const logout = async () => {
        await logoutUser();

        dispatch(clearCart());

        clearCartStorage();

        setProfile(null);
        setUser(null);
    };

    const resetPassword = (email) =>
        resetUserPassword(email);

    const value = {
        user,
        profile,
        signup,
        login,
        logout,
        resetPassword,
        authLoading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!authLoading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);