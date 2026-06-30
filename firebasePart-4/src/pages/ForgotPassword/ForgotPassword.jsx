import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import styles from '../Login/Auth.module.css'; 
function ForgotPassword() {
  // Extract out-of-band email dispatch controls from application state matrixes
  const { resetPassword } = useAuth();
  
  // Independent notification handlers tracking confirmation dispatches
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  // Initialize dedicated structure for managing single-input form requests
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  /**
   * Validates recovery request parameters.
   * Sends data payloads down into out-of-band system routers and captures the feedback loops.
   */
  const onSubmit = async (data) => {
    try {
      // Wipe old alert alerts out of active tracking values
      setError('');
      setMessage('');
      
      // Dispatch target address to the underlying provider delivery agent
      await resetPassword(data.email);
      
      // Notify the operator to check their inbound application routing channels
      setMessage('Recovery email sent successfully. Check your inbox.');
    } catch (err) {
      // Normalizes platform string codes into uniform presentation messages
      setError(err.code?.split('/')[1]?.replace(/-/g, ' ').toUpperCase() || err.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2>RECOVER ACCESS</h2>
        <p className={styles.subtitle}>Enter your system email to reset access</p>

        {/* State notification feedback containers */}
        {error && <div className={styles.errorAlert}>⚠️ {error}</div>}
        {message && <div className={styles.successAlert}>✨ {message}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          
          {/* Email Request Form Configuration Block */}
          <div className={styles.group}>
            <label>Email Address</label>
            <input 
              type="email" 
              className={styles.input}
              placeholder="operator@domain.com"
              {...register("email", { required: "Target account email is required" })} 
            />
            {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
          </div>

          {/* Trigger dispatch action node */}
          <button type="submit" disabled={isSubmitting} className={styles.btn}>
            {isSubmitting ? "SENDING DISPATCH..." : "RESET PASSWORD"}
          </button>
        </form>

        {/* Fallback configuration links to return to login views */}
        <div className={styles.footer}>
          <Link to="/login" className={styles.link}>Return to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword; 
