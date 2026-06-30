import React from "react";
import styles from "./ProductCard.module.css"
import { Link } from "react-router-dom";
/*
  Product Card Component
  - Reusable UI component
  - Handles safe image fallback
*/

function ProductCard({ product }) {
    return (
        <Link to={`/product/${product.id}`} className={styles.card} >
            {/* image  */}
            <div className={styles.imageBox}>
                <img src={product.thumbnail} alt={product.title} />
            </div>
            {/* content  */}
            <div className={styles.content}>
                <h3 className={styles.title} >{product.title}</h3>
                <div className={styles.footer}>
                    <span className={styles.price} > {product.price} </span>
                    <button className={styles.addBtn}> Add </button>
                </div>

            </div>
        </Link >
    );
};

export default ProductCard;
