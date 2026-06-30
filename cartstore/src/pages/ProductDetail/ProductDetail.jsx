
import React, { useEffect, useState } from 'react'
import { productService } from '../../services/productService';
import { useParams } from 'react-router-dom';
import styles from "./ProductDetail.module.css"


function ProductDetail() {
    const { id } = useParams();
    // states 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    //   useEffect

    useEffect(() => {

        const loadProduct = async () => {
            try {
                const data = await productService.getProductById(id);
                setProduct(data)
            } catch (error) {
                console.log("Failed to load product", error);
            }
            finally {
                setLoading(false);
            }

        }

        loadProduct();
    }, [id])

    if (loading) {
        return <div className={styles.loading}> Loading Product ... </div>
    }

    if (!product) {
        return <div className={styles.loading}> Product not Found ... </div>
    }


    return (
        <div className={styles.page}>
            {/* image */}
            <div className={styles.imageSection}>
                <img src={product.thumbnail} alt={product.title} />
            </div>
            {/* Details  */}
            <div className={styles.details}>
                <h1> {product.title} </h1>
                {/* Meta */}
                <div className={styles.meta}>
                    <span> {product.category} </span>
                    <span> {product.brand} </span>

                </div>
                {/* Rating  */}
                <div className={styles.rating}>
                    ⭐{product.rating}/5
                </div>
                {/* Description  */}
                <p className={styles.description}> {product.description}</p>
                {/* Price */}
                <h2 className={styles.price}> {product.price} </h2>
                {/* stock  */}
                <div className={styles.stockBox}>
                    <p className={styles.stockStatus}>
                        {product.stock > 0 ? "In stock " : "Out of Stock"}
                    </p>
                    <p className={styles.stockCount}>
                        {product.stock} Items Available
                    </p>
                    <p>
                        {product.stock > 0 && product.stock <= 5 && (
                            <p className={styles.lowStock}>
                                ⚠️    Only a few left
                            </p>
                        )}
                    </p>
                </div>
                {/* Actions  */}
                <div className={styles.actions}>
                    <button className={styles.buyBtn}>Buy Now </button>
                    <button className={styles.cartBtn}>Add to Cart </button>
                </div>

            </div>
        </div>
    )
}

export default ProductDetail
