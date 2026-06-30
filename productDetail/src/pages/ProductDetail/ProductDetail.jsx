// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { productService } from "../../services/productService";

// /*
//   Product Detail Page
//   - Full ecommerce product view
//   - Handles loading + error states
// */


// function ProductDetail() {
//     const { id } = useParams();

//     // states 
//     const [product, setProduct] = useState();
//     const [loading, setLoading] = useState(true);


//     // Load products on page mount
//     useEffect(() => {
//         // 1 data fetching phase

//         // Responsible for requesting product data from API/service layer
//         const loadProduct = async () => {
//             try {
//                 // 1.1 Api call
//                 // Sends request to productService to retrieve single product
//                 const data = await productService.getProductById(id);
//                 // 2. STATE UPDATE (DATA STORAGE)

//                 // Stores fetched data into React state
//                 setProduct(data) // store data 

//             } catch (error) {
//                 // ERROR HANDLING  
//                 // Catches API/network failures and logs them for debugging
//                 console.log("Failed to load product", error);

//             }

//             finally {
//                 // 3.Loading state upadte 
//                 // Runs whether request succeeds or fails
//                 // Ensures loading spinner is removed after request completes

//                 setLoading(false);
//             }
//         }

//         // 4. FUNCTION EXECUTION
//         // Initiates the data fetching process


//         loadProduct();

//     }, [id]);


//     // Loading Ui 
//     if (loading) {
//         return <div> Loading Mall Product ... </div>;
//     }

//     if (!product) {
//         return <div>  Mall Product Not Found  ... </div>;
//     }
//     return (

//         <div>

//             {/* images */}
//             <div >
//                 <img
//                     src={product.thumbnail || product.images?.[0]}
//                     alt={product.title}
//                 />
//             </div>

//             {/* Details */}
//             <div>

//                 <h1>{product.title}</h1>

//                 {/* meta  */}
//                 <div>
//                     <span>{product.category}</span>
//                     <span>{product.brand}</span>
//                 </div>
//                 {/* Rating  */}
//                 <div >
//                     ⭐ {product.rating} / 5
//                 </div>

//                 {/* Description  */}
//                 <p >
//                     {product.description}
//                 </p>

//                 {/* Price */}
//                 <h2 >${product.price}</h2>

//                 {/* stock */}
//                 <div>

//                     <p>
//                         {product.stock > 0 ? "In Stock" : "Out of Stock"}
//                     </p>

//                     <p >
//                         {product.stock} items available
//                     </p>

//                     {product.stock > 0 && product.stock <= 5 && (
//                         <p className={styles.lowStock}>
//                             ⚠️ Only a few left
//                         </p>
//                     )}

//                 </div>

//                 {/* Action  */}
//                 <div>
//                     <button>Buy Now</button>
//                     <button > Add to Cart</button>
//                 </div>

//             </div>

//         </div>


//     )
// }

// export default ProductDetail

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { productService } from "../../api/productService";
import { productService } from "../../services/productService";
import styles from "./ProductDetail.module.css";

/*
  Product Detail Page
  - Full ecommerce product view
  - Handles loading + error states
*/
const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (error) {
        console.log("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Loading Product...</div>;
  }

  if (!product) {
    return <div className={styles.loading}>Product not found</div>;
  }

  return (
    <div className={styles.page}>

      {/* IMAGE */}
      <div className={styles.imageSection}>
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
        />
      </div>

      {/* DETAILS */}
      <div className={styles.details}>

        <h1>{product.title}</h1>

        {/* META */}
        <div className={styles.meta}>
          <span>{product.category}</span>
          <span>{product.brand}</span>
        </div>

        {/* RATING */}
        <div className={styles.rating}>
          ⭐ {product.rating} / 5
        </div>

        {/* DESCRIPTION */}
        <p className={styles.description}>
          {product.description}
        </p>

        {/* PRICE */}
        <h2 className={styles.price}>${product.price}</h2>

        {/* STOCK (IMPROVED) */}
        <div className={styles.stockBox}>

          <p className={styles.stockStatus}>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <p className={styles.stockCount}>
            {product.stock} items available
          </p>

          {product.stock > 0 && product.stock <= 5 && (
            <p className={styles.lowStock}>
              ⚠️ Only a few left
            </p>
          )}

        </div>

        {/* ACTIONS */}
        <div className={styles.actions}>
          <button className={styles.buyBtn}>Buy Now</button>
          <button className={styles.cartBtn}>Add to Cart</button>
        </div>

      </div>

    </div>
  );
};

export default ProductDetail;


