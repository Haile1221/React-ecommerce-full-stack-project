import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../features/cart/cartSlice";

/**
 * Persists the cart state to LocalStorage so users don't 
 * lose their items when they refresh the browser.
 * * STEP 1: Load saved cart from browser storage (localStorage)
 * This is used to restore cart after page refresh.
 */

const loadState = () => {
    try {
        // Read data from browser storage:
        // Get saved cart data (string format)
        const saved = localStorage.getItem('beshilo_cart');
        // If data exists → convert JSON string to JS object
        // If not → return undefined (Redux will use initial state)
        return saved ? JSON.parse(saved) : undefined;
    } catch (err) {
         // If JSON is broken or error happens → ignore and return nothing
         return undefined; }
};

/**
 * STEP 2: Create Redux store
 * This is the global state container for your app
 */

export const store = configureStore({
    reducer: {
           // cart state is controlled by cartReducer
        cart: cartReducer },
        
    preloadedState: { cart: loadState() }
});

store.subscribe(() => {
    localStorage.setItem('beshilo_cart', JSON.stringify(store.getState().cart));
});
