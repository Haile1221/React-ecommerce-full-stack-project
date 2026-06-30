import React from "react";
import styles from "./ProductCard.module.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../cart/cartSlice";


/*
  Product Card Component
  - Reusable UI component
  - Handles safe image fallback
*/

function ProductCard({ product }) {
    const dispatch = useDispatch();

    // Logic: Check if already added to prevent duplicates
    const isInCart = useSelector((state) =>
        state.cart.items.some(item => item.id === product.id)
    );

    const handleAdd = (e) => {
        e.preventDefault(); // Prevents Link from opening
        if (!isInCart) dispatch(addToCart(product));
    };




    return (
        < Link to={`/product/${product.id}`} className={styles.card} >
            {/* image  */}
            <div className={styles.imageBox}>
                <img src={product.thumbnail} alt={product.title} />
            </div>
            {/* content  */}
            <div className={styles.content}>
                <h3 className={styles.title} >{product.title}</h3>
                <div className={styles.footer}>
                    <span className={styles.price} > ${Number(product.price).toFixed(2)} </span>
                    <button className={isInCart? styles.addedBtn: styles.addBtn }
                    onClick={handleAdd}
                    disabled={isInCart}
                    > {isInCart? "✓ In Bag": " Add"} </button>
                </div>

            </div>
        </Link >
    );
};

export default ProductCard;
