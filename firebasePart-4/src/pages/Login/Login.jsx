// import React from 'react'
// import styles from "./Login.module.css"
// function Login() {
//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.card}>
//         <h2>Member Login from login page</h2>
//         <p>Access yourr Beshilo Account</p>
//       </div>
//     </div>
//   )
// }

// export default Login

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import styles from './Auth.module.css';

function Login() {
  // Destructure direct SDK entry method provided by AuthContext abstraction layers
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Local interaction trackers for managing form masking states and request errors
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Capture cross-page notifications passing through React Router navigation histories
  const successFlashMessage = location.state?.success || '';

  // Initialize form validation logic 
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  /**
   * Orchestrates account login.
   * Validates form items, signs into base system networks, and navigates back to index paths.
   */
  const onSubmit = async (data) => {
    try {
      // Reset state boundaries before handling a new transaction
      setError('');
      
      // Request new token validation arrays using raw email/password structures
      await login(data.email, data.password);
      
      // Navigate to application dashboard and broadcast confirmation tokens
      navigate('/', { state: { success: 'Access Granted. Welcome back to terminal interface.' } });
    } catch (err) {
      // Normalizes API error strings for UI use
      setError(err.code?.split('/')[1]?.replace(/-/g, ' ').toUpperCase() || err.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2>MEMBER LOGIN</h2>
        <p className={styles.subtitle}>Access your Beshilo account terminal</p>

        {/* Notification feedback layers */}
        {successFlashMessage && <div className={styles.successAlert}>✅ {successFlashMessage}</div>}
        {error && <div className={styles.errorAlert}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          
          {/* Email Address Form Group */}
          <div className={styles.group}>
            <label>Email Address</label>
            <input 
              type="email" 
              className={styles.input}
              placeholder="operator@domain.com"
              {...register("email", { required: "Email path is a mandatory field" })} 
            />
            {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
          </div>

          {/* Password Form Group with Masking Controls */}
          <div className={styles.group}>
            <label>Password</label>
            <div className={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                className={styles.input}
                placeholder="••••••••"
                {...register("password", { required: "Password verification field is blank" })} 
              />
              <button 
                type="button" 
                className={styles.showBtn} 
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
          </div>

          {/* Form verification execution control block */}
          <button type="submit" disabled={isSubmitting} className={styles.btn}>
            {isSubmitting ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>

        {/* Secondary recovery navigation controls */}
        <div className={styles.footer}>
          <Link to="/forgot-password" className={styles.linkWarning}>Forgot Password?</Link>
          <p>New User ? <Link to="/register" className={styles.link}>Register Here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;

