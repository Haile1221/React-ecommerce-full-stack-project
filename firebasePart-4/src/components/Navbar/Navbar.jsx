import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
function Navbar() {
    // Pulling  the live quantity from the cart brain 
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    
  // Destructures core variables from global identity hooks
  const { user, profile, logout } = useAuth();


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
                    {/* Conditional Identity Presentation Block */}

                    {user ? (

                        <div className={styles.userMenu}>
                            <span className={styles.userEmail}>
                                👋 WELCOME, <span className={styles.usernameHighlight}>{profile?.username ? profile.username.toUpperCase() : "DEVELOPER"}</span>
                            </span>
                            <button onClick={logout} className={styles.logoutBtn}>Logout</button>
                        </div>


                    ) : (<Link to="/login" className={styles.loginBtn}>Login</Link>)}


                </div>
            </div>
        </nav >
    )
}

export default Navbar
