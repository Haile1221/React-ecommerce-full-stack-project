// import { doc, setDoc, getDoc } from "firebase/firestore";
// import { db } from "../firebase/firebase";

// /**
//  * Synchronizes client shopping cart snapshots directly down to remote cloud database paths.
//  * Uses a destructive overwrite schema paired with a structural merge rule to preserve unmapped metadata nodes.
//  */

// export const uploadCartToCloud = async (useId, cart) => {
//     const cartRef = doc(db, 'carts', uid);

//     // Enforces structural integrity properties onto the cloud database document structure

//     await setDoc(cartRef, {
//         items: cart.items,
//         totalQuantity: cart.totalQuantity,
//         totalAmount: cart.totalAmount,
//         updatedAt: new Date().toISOString()

//     }, { merge: true }); // Crucial: prevents destructive overrides on unmapped target configurations


// };

// /**
//  * Downloads user cart arrays from the cloud backup database instance.
//  */


// export const downloadCartFromCloud = async (uid) => {
//     const cartRef = doc(db, 'carts', uid);
//     const snapshot = await getDoc(cartRef);
//     if (snapshot.exists()) {
//         return snapshot.data();

//     }
//     return null;
// }

// updated 

import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

/**
 * Uploads the current Redux cart state to Firestore.
 * Each user owns a single cart document:
 * carts/{uid}
 */
export const uploadCartToCloud = async (uid, cart) => {
    if (!uid) {
        throw new Error("Cannot upload cart: uid is missing.");
    }

    const cartRef = doc(db, "carts", uid);

    await setDoc(
        cartRef,
        {
            items: cart?.items || [],
            totalQuantity: cart?.totalQuantity || 0,
            totalAmount: cart?.totalAmount || 0,
            updatedAt: new Date().toISOString(),
        },
        { merge: true }
    );
};

/**
 * Downloads a user's cart from Firestore.
 * Returns null if no cart document exists yet.
 */
export const downloadCartFromCloud = async (uid) => {
    if (!uid) {
        return null;
    }

    const cartRef = doc(db, "carts", uid);
    const snapshot = await getDoc(cartRef);

    if (snapshot.exists()) {
        return snapshot.data();
    }

    return null;
};