import React from 'react';
import styles from './Cart.module.css';

const Cart = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Your Shopping Bag from cart page</h1>
            <p className={styles.emptyMsg}>Your bag is currently empty.</p>
        </div>
    );
};

export default Cart;
