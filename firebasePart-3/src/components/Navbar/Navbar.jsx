import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useSelector } from 'react-redux';
function Navbar() {
    // Pulling  the live quantity from the cart brain 
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    {/* Logo */}
                    BESHILO <span>MALL</span>
                </Link>

                <div className={styles.links}>
                    {/* Navigation Links */}
                    <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink>

                    <NavLink to="/cart" className={({ isActive }) => isActive ? styles.active : ''}>
                        Cart 
                        {/* live  badge count */}
                        <span className={styles.badge}> {totalQuantity}</span>
                    </NavLink>


                    <Link to="/login" className={styles.loginBtn}>Login</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
