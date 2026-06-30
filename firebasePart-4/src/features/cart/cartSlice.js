import { createSlice } from '@reduxjs/toolkit';

/**
* 1. Check if item exists. 
 *2. If yes, increase quantity. 
*3. If no, push new item to array.
 * HELPER: Math for grand totals
 * Updates both the item count and the dollar amount.
 */
const calculateTotals = (items) => {
    return items.reduce(
        (acc, item) => {
            acc.totalQuantity += item.quantity;
            acc.totalAmount += item.totalPrice;
            return acc;
        },
        { totalQuantity: 0, totalAmount: 0 }
    );
};

/**
 * HELPER: Data normalization
 * Ensures price is always a number and images are mapped correctly.
 */
const normalizeProduct = (product) => ({
    id: product.id,
    title: product.title,
    price: Number(product.price) || 0,
    image: product.thumbnail || product.image || '',
});

// Initialization 

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    isLoading: false,
    error: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Action: Logic for adding or increasing quantity
        addToCart(state, action) {
            const product = normalizeProduct(action.payload);
            if (!product.id) return;

            const existingItem = state.items.find((item) => item.id === product.id);

            if (!existingItem) {
                state.items.push({
                    ...product,
                    quantity: 1,
                    totalPrice: product.price,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += product.price;
            }

            // Re-calculate the grand totals
            const { totalQuantity, totalAmount } = calculateTotals(state.items);
            state.totalQuantity = totalQuantity;
            state.totalAmount = totalAmount;
        },

        // Action: Decrease quantity by 1
        removeFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            if (!existingItem) return;

            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }

            const { totalQuantity, totalAmount } = calculateTotals(state.items);
            state.totalQuantity = totalQuantity;
            state.totalAmount = totalAmount;
        },

        // Action: Remove whole product line
        deleteFromCart(state, action) {
            const id = action.payload;
            state.items = state.items.filter((item) => item.id !== id);
            const { totalQuantity, totalAmount } = calculateTotals(state.items);
            state.totalQuantity = totalQuantity;
            state.totalAmount = totalAmount;
        },

        // Action: Wipe the bag
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        }
    },
});



export const {
    addToCart, removeFromCart, deleteFromCart, clearCart } = cartSlice.actions;

    export const cartReducer = cartSlice.reducer;