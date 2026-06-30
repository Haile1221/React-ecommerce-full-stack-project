import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css"
/*
  Product Card Component
  - Reusable UI component
  - Handles safe image fallback
*/
const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`} className={styles.card}>

            {/* IMAGE */}
            <div className={styles.imageBox}>
                <img src={product.thumbnail} alt={product.title} />
            </div>

            {/* CONTENT */}
            <div className={styles.content}>
                <h3 className={styles.title}>{product.title}</h3>

                <div className={styles.footer}>
                    <span className={styles.price}>${product.price}</span>

                    <button
                        className={styles.addBtn}
                        onClick={(e) => {
                            e.preventDefault();
                            console.log("Add to cart:", product.id);
                        }}             >
                        Add
                    </button>
                </div>
            </div>

        </Link>
    );
};

export default ProductCard;
