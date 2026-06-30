// phase one 
// import React from 'react'
// import styles from './Home.module.css'
// function Home() {
//   return (
//     <div className={styles.container}>
//   <header className={styles.hero}>
//     <h1>Premium Tech and style</h1>
//     <p>For Beshilo Community</p>
//   </header>
// </div>

//   )
// }

// export default Home

// phase 2  product display 
/**
 * 
 * 1. Local hardcoded data
  2. External API (DummyJSON)
  3. Local backend API

 */

// // 1. Local hardcoded data
// import React, { useEffect, useState } from 'react'
// import { auth } from '../../api/firebase';

// function Home() {
//   // 1. Local hardcoded data
//   const localProducts = [
//     { id: 1, title: "iphone", price: 2000, thumbnail: "/images/OIP2.png" },
//     { id: 2, title: "MacBook Pro", price: 2500, thumbnail: "/images/oip3.png" },
//     { id: 3, title: "Airpod", price: 500, thumbnail: "/images/react.png" }

//   ]

//   // States
//   const [externalProducts, setExternalProducts] = useState([]);

//   // external api 
//   // fetch data 
//   useEffect(() => {
//     fetch("https://dummyjson.com/products")
//       .then(res => res.json())
//       .then(data => {
//         console.log(data)
//         setExternalProducts(data.products)
//         console.log(data.products)

//       })
//       .catch(err => console.error("External api error", err))
//   }, []);

//   return (
//     <>
//       <div>
//         <h1>React data Flow</h1>
//         <h2>Local Data </h2>
//         {localProducts.map((item) => (
//           <div key={item.id}>
//             <img src={item.thumbnail || "https://via.placeholder/150"} alt="item.title"
//               width="150"
//               height="auto"
//             />
//             <h3>{item.title}</h3>
//             <p>{item.price}</p>

//           </div>
//         ))}

//       </div>
//     // external api
//       <div>
//         <hr style={{ border: "2px solid blue" }} />
//         <h2>External api Data </h2>
//         {externalProducts.map((item) => (
//           <div key={item.id}>
//             <img src={item.thumbnail || "https://via.placeholder.com/150"} alt="item.title"

//             />

//             <h3>{item.title}</h3>
//             <p>{item.price}</p>

//           </div>
//         ))}

//       </div>
//     </>
//   )
// }

// export default Home

// sepration of components 

import React, { useEffect, useState } from 'react'

import ProductCard from '../../features/products/ProductCard';
import styles from "../../features/products/styles.module.css"

function Home() {
  // 1. Local hardcoded data
  const localProducts = [
    { id: 1, title: "iphone", price: 2000, thumbnail: "/images/OIP2.png" },
    { id: 2, title: "MacBook Pro", price: 2500, thumbnail: "/images/oip3.png" },
    { id: 3, title: "Airpod", price: 500, thumbnail: "/images/react.png" }

  ]

  // States
  const [externalProducts, setExternalProducts] = useState([]);
  const [localApiProducts, setLocalApiProducts] = useState([]);



  useEffect(() => {
    // external api 
    // fetch data 
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setExternalProducts(data.products)
        console.log(data.products)

      })
      .catch(err => console.error("External api error", err))
    // local api /not use it Because you have not a backend right now 
    fetch(" http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setLocalApiProducts(data.products)
        console.log(data.products)

      })
      .catch(err => console.error("local api error", err))
  }, []);



  return (

    <div className={styles.container}>
      <h1 className={styles.mainTitle}>React data Flow</h1>
      {/* Local data  */}
      <h2 className={styles.sectionTitle}>Local Data </h2>

      <div className={styles.grid}>
        {localProducts.map((item) => (

          <ProductCard key={item.id} item={item} />

        ))}

      </div>
      {/*  external api */}
      <hr className={styles.divider} />
      <h2 className={styles.sectionTitle}>External api Data </h2>

      <div className={styles.grid}>


        {externalProducts.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}

      </div>
      {/* local api data  */}
      <hr className={styles.divider}/>
      <h2 className={styles.sectionTitle}>Local api Data </h2>
      <div className={styles.grid}>


        {localApiProducts.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}

      </div>

    </div>





  )
}

export default Home
