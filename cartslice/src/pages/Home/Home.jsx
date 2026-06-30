// phase one 
// import React from 'react'
// import styles from './Home.module.css'
// function Home() {
//   return (
//     <div className={styles.container}>
//       <header className={styles.hero}>
//         <h1>Premium Tech and style</h1>
//         <p>For Beshilo Community</p>
//       </header>
//     </div>


//   )
// }

// export default Home


// phase 2


// import React, { useState, useEffect } from 'react'
// import { productService } from '../../services/productService'
// import styles from './Home.module.css'
// import ProductCard from '../../features/products/ProductCard';


// /*
//   Home Page
//   - Fetches products using service layer
//   - Handles loading state
// */

// function Home() {

//   // states 
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Load products on page mount
//   useEffect(() => {
//     // 1 data fetching phase

//     // Responsible for requesting product data from API/service layer
//     const fetchProducts = async () => {
//       try {
//         // 1.1 Api call
//         // Sends request to productService to retrieve all products
//         const data = await productService.getAllProducts();
//         // 2. STATE UPDATE (DATA STORAGE)

//         // Stores fetched data into React state
//         setProducts(data) // store data 

//       } catch (error) {
//         // ERROR HANDLING  
//         // Catches API/network failures and logs them for debugging
//         console.error("Failed to load products", error);

//       }

//       finally {
//         // 3.Loading state upadte 
//         // Runs whether request succeeds or fails
//         // Ensures loading spinner is removed after request completes

//         setLoading(false);
//       }
//     }

//     // 4. FUNCTION EXECUTION
//     // Initiates the data fetching process


//     fetchProducts();

//   }, []);

//   // Loading Ui 
//   if (loading) {
//     return <div className={styles.loading}> Loading Mall ... </div>
//   }



//   return (
//     <div className={styles.page}>
//       {/* Hero page  */}
//       <header className={styles.hero}>
//         <div>
//           <h1>Next-Gen <span className={styles.highligh}> Shopping Mall </span> </h1>
//           <p>Curated Tech & Lifestyle for the Modern Developer</p>
//         </div>
//       </header>

//       {/* Products  */}
//       <main   className={styles.container}>
//         <h2>Featured Collection</h2>
//         <div  className={styles.grid}>
//           {products.map((product) => (

//             <ProductCard key={product.id} product={product} />

//           ))}
//         </div>

//       </main>
//     </div>
//   )
// }

// export default Home

// product search and category 

import React, { useState, useEffect } from 'react'
import { productService } from '../../services/productService'
import styles from './Home.module.css'
import ProductCard from '../../features/products/ProductCard';


/*
  Home Page
  - Fetches products using service layer
  - Handles loading state
*/

function Home() {

  // states 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filteredProducts = products.filter((product) => {

    const matchesSearch =
      product.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    "all",
    ...new Set(products.map((p) => p.category))
  ];




  // Load products on page mount
  useEffect(() => {
    // 1 data fetching phase

    // Responsible for requesting product data from API/service layer
    const fetchProducts = async () => {
      try {
        // 1.1 Api call
        // Sends request to productService to retrieve all products
        const data = await productService.getAllProducts();
        // 2. STATE UPDATE (DATA STORAGE)

        // Stores fetched data into React state
        setProducts(data) // store data 

      } catch (error) {
        // ERROR HANDLING  
        // Catches API/network failures and logs them for debugging
        console.error("Failed to load products", error);

      }

      finally {
        // 3.Loading state upadte 
        // Runs whether request succeeds or fails
        // Ensures loading spinner is removed after request completes

        setLoading(false);
      }
    }

    // 4. FUNCTION EXECUTION
    // Initiates the data fetching process


    fetchProducts();

  }, []);

  // Loading Ui 
  if (loading) {
    return <div className={styles.loading}> Loading Mall ... </div>
  }



  return (
    <div className={styles.page}>
      {/* Hero page  */}
      <header className={styles.hero}>
        <div>
          <h1>Next-Gen <span className={styles.highligh}> Shopping Mall </span> </h1>
          <p>Curated Tech & Lifestyle for the Modern Developer</p>
        </div>
      </header>

      {/* Products  */}
      <main className={styles.container}>
        <h2>Featured Collection</h2>

        <div className={styles.topBar}>

          {/* Search */}

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />

          {/* Category Filter */}

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.filterSelect}
          >

            {categories.map((cat) => (

              <option key={cat} value={cat}>
                {cat}
              </option>

            ))}

          </select>

        </div>

        <div className={styles.grid}>
          {filteredProducts.map((product) => (

            <ProductCard key={product.id} product={product} />

          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className={styles.empty}>
            No products found
          </div>
        )}


      </main>
    </div>
  )
}

export default Home

