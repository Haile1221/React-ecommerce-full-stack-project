
import React, { useEffect, useState } from 'react'
import { productService } from '../../services/productService';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "./ProductDetail.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';


function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // states 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Logic: Check if already added to prevent duplicates
    const isInCart = useSelector((state) =>
        state.cart.items.some(i => i.id === Number(id))
    );

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
    }, [id]);

    const handleBuyNow = () => {
        if (!isInCart) dispatch(addToCart(product));
        navigate("/cart");
    };

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
                <h2 className={styles.price}> ${Number(product.price).toFixed(2)}</h2>
                {/* stock  */}
                <div className={styles.stockBox}>
                    <p className={styles.stockStatus}>
                        {product.stock > 0 ? "In stock " : "Out of Stock"}
                    </p>
                    <p className={styles.stockCount}>
                        {product.stock} Items Available
                    </p>
                  
                        {product.stock > 0 && product.stock <= 5 && (
                            <p className={styles.lowStock}>
                                ⚠️    Only a few left
                            </p>
                        )}
                  
                </div>
                {/* Actions  */}
                <div className={styles.actions}>
                    {/* Multi-logic button: Redirect if already added */}

                    <button className={styles.buyBtn} onClick={handleBuyNow}>
                        {isInCart ? "View Bag" : "Buy Now"}
                    </button>


                    {/* Visual state change */}
                    <button
                        className={isInCart ? styles.cartBtnAdded : styles.cartBtn}
                        onClick={() => !isInCart && dispatch(addToCart(product))}
                        disabled={isInCart}
                    >
                        {isInCart ? "✓ Added to Bag" : "Add to Cart"}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ProductDetail
