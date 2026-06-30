import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// get cart data from store
//Dispatch to send actions like + / - / remove 
import { addToCart, removeFromCart, deleteFromCart, clearCart } from '../../features/cart/cartSlice';

import styles from './Cart.module.css';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
    const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    if (items.length === 0) {
        return (
            <div className={styles.emptyContainer}>
                <h2>Your bag is empty</h2>
                <Link to="/" className={styles.shopBtn}> Start Shopping From Beshilo Mall</Link>
            </div>
        );
    }

    return (
        <div className={styles.cartContainer}>
            <div className={styles.header}>
                <h1>Bag ({totalQuantity}) </h1>
                <button className={styles.clearBtn} onClick={() => dispatch(clearCart())}> Clear All </button>
            </div>
            <div className={styles.contentGrid}>
                <div className={styles.itemsList}>
                    {
                        items.map(item => (
                            <div className={styles.cartItem} key={item.id}>

                                <img src={item.image} alt={item.title} className={styles.itemImage} />
                                <div className={styles.itemDetails}>

                                    <h3>{item.title}</h3>
                                    <p className={styles.priceTag}> ${item.price.toFixed(2)}</p>
                                    <button className={styles.deleteLink} onClick={() => dispatch(deleteFromCart(item.id))}> Remove </button>

                                </div>
                                <div className={styles.controls}>
                                    <button onClick={() => dispatch(removeFromCart(item.id))}> - </button>
                                    <span className={styles.qtyLabel}> {item.quantity}</span>
                                    <button onClick={() => dispatch(addToCart(item))}> +  </button>
                                </div>
                                <div className={styles.itemTotal} >
                                    ${item.totalPrice.toFixed(2)}
                                </div>
                            </div>
                        ))
                    }

                </div>
                <div className={styles.summaryCard}>

                    <h3>Order Summary</h3>
                    <div className={styles.summaryNow}>
                        <span > Sub total</span>
                        <span>
                            {totalAmount.toFixed(2)}
                        </span>

                    </div>

                    <div className={styles.summaryTotalRow}>
                        <span > Total</span>
                        <span>
                            {totalAmount.toFixed(2)}
                        </span>

                    </div>
                    <button className={styles.checkoutBtn}
                        onClick={() => navigate('/checkout')}>
                        checkout page is waiting
                    </button>
                </div>

            </div>
        </div>
    )
};

export default Cart;
