import React from 'react'
import styles from './styles.module.css'
function ProductCard({ item }) {
  return (
    <div className={styles.card}>
      <img src={item.thumbnail || "https://via.placeholder/150.com"} alt="item.title"
        className={styles.cardImg}
      />

      <div className={styles.cardBody }>
        <h3 className={styles.cardTitle }>{item.title}</h3>
        <p className={styles.cardPrice }>{item.price}</p>

      </div>

    </div>
  )
}

export default ProductCard
