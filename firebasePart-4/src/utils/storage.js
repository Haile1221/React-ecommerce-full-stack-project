/**
 * Serializes reactive item data structures into static JSON strings inside LocalStorage.
 * Keeps local cart data intact when operators manually refresh browser pages.
 */

export const saveCartToStorage =(cart)=>{
    localStorage.setItem(
        "beshilo_cart",
        JSON.stringify({
            ...cart, 
            isLoading:false, // Injects explicit loading boundary overrides

            error:null // Clears previous failure histories during recovery cycles

        })
    )
}


/**
 * Destroys local caching nodes during user identity transformations (like Logouts).
 * Vital for preventing account crossovers when multiple profiles utilize a shared device terminal.
 */


export const clearCartStorage =()=>{
    localStorage.removeItem("beshilo_cart")
}

