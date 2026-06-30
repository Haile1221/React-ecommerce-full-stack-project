// import React from 'react'
// import { useAuth } from '../../context/AuthContext'
// import { useForm } from 'react-hook-form';

// function Register() {
//     const {signup} = useAuth();

//     const {register }  = useForm();

//   return (
//     <div>
//     <div>
//         <h2>Create accout </h2>
//         <p>Build your Beshilo identity profile</p>
//     </div>
//     <form >
//  <div> 
//     <label > Full Name </label>
//     <input type="text" 
//     placeholder='Enter Your name'  />
//  </div>

//     </form>
//     </div>
//   )
// }

// export default Register

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

import styles from '../Login/Auth.module.css'

function Register() {
    // ACTIVITY: Identity & Routing Instantiation
    // Fetch signup functionality from our global context and initialize React Router navigation
    const { signup } = useAuth();
    const navigate = useNavigate();

    // ACTIVITY: Local UI State Management
    // 'error' captures raw authentication errors from the server to display in the UI banner
    // 'showPassword' controls the visibility toggle state (text vs password input types)
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // ACTIVITY: Form Management Engine Initialization
    // Destructure utility methods from react-hook-form to register inputs, track validation states,
    // watch values in real-time, and detect active submissions.
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm();

    // ACTIVITY: Form Submission & Authentication Pipeline
    // Processes validated form payloads, attempts server-side user provisioning, and routes cleanly on success.
    const onSubmit = async (data) => {
        try {
            // Clear any lingering error messages from previous submission attempts
            setError('');

            // Fire the asynchronous registration call using the formatted form parameters
            await signup(
                data.email,
                data.password,
                data.fullName,
                data.username
            );

            // Redirect the user to the login screen, passing a success state string through the router 
            // to automatically trigger the global success toast on arrival
            navigate('/login', {
                state: {
                    success:
                        'Account created successfully. Please login using your credentials.'
                }
            });

        } catch (err) {
            // Error Parsing Activity: Strips provider prefixes (e.g., "auth/email-already-in-use"),
            // converts hyphens to spaces, and capitalizes the text into a readable user banner.
            setError(
                err.code
                    ?.split('/')[1]
                    ?.replace(/-/g, ' ')
                    ?.toUpperCase() || err.message
            );
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>

                <h2>CREATE ACCOUNT</h2>

                <p className={styles.subtitle}>
                    Build your Beshilo identity profile
                </p>

                {/* ACTIVITY: Dynamic Feedback Display */}
                {/* Renders an error banner only if an authentication failure occurs during submission */}
                {error && (
                    <div className={styles.errorAlert}>
                        ⚠️ {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={styles.form}
                >

                    {/* ACTIVITY: Full Name Registration & Validation */}
                    <div className={styles.group}>
                        <label>Full Name</label>

                        <input
                            type="text"
                            className={styles.input}
                            placeholder="John Doe"
                            {...register('fullName', {
                                required: 'Full name field is required'
                            })}
                        />

                        {/* Inline Error Handling: Checks if a 'fullName' validation rule was violated */}
                        {errors.fullName && (
                            <span className={styles.errorText}>
                                {errors.fullName.message}
                            </span>
                        )}
                    </div>

                    {/* ACTIVITY: Username Management & Pattern Matching */}
                    <div className={styles.group}>
                        <label>Username</label>

                        <input
                            type="text"
                            className={styles.input}
                            placeholder="johndoe_dev"
                            {...register('username', {
                                required: 'Username field is required',
                                // RegEx Pattern Match: Restricts input to alphanumeric characters and underscores between 3-15 symbols long
                                pattern: {
                                    value: /^[a-zA-Z0-9_]{3,15}$/,
                                    message:
                                        'Username must be 3-15 characters and contain only letters, numbers, or underscores'
                                }
                            })}
                        />

                        {errors.username && (
                            <span className={styles.errorText}>
                                {errors.username.message}
                            </span>
                        )}
                    </div>

                    {/* ACTIVITY: Email Capture Field */}
                    <div className={styles.group}>
                        <label>Email Address</label>

                        <input
                            type="email"
                            className={styles.input}
                            placeholder="example@domain.com"
                            {...register('email', {
                                required: 'Email address is required'
                            })}
                        />

                        {errors.email && (
                            <span className={styles.errorText}>
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    {/* ACTIVITY: Password Input with Field-Type Masking Toggle */}
                    <div className={styles.group}>
                        <label>Password</label>

                        <div className={styles.passwordWrapper}>
                            {/* Dynamically swaps type between 'text' and 'password' based on showPassword boolean */}
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className={styles.input}
                                placeholder="Enter your password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must contain at least 6 characters'
                                    }
                                })}
                            />

                            {/* UI Interactive Toggle Control */}
                            <button
                                type="button"
                                className={styles.showBtn}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>

                        </div>

                        {errors.password && (
                            <span className={styles.errorText}>
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    {/* ACTIVITY: Confirm Password Cross-Field Verification */}
                    <div className={styles.group}>
                        <label>Confirm Password</label>

                        <input
                            type={showPassword ? 'text' : 'password'}
                            className={styles.input}
                            placeholder="Confirm your password"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                // Cross-Field Validation Activity: Evaluates current value against the live monitored 'password' field 
                                validate: (value) =>
                                    value === watch('password') || 'Passwords do not match'
                            })}
                        />

                        {errors.confirmPassword && (
                            <span className={styles.errorText}>
                                {errors.confirmPassword.message}
                            </span>
                        )}
                    </div>

                    {/* ACTIVITY: Legal Terms Verification Integration */}
                    <div className={styles.terms}>

                        <label className={styles.checkboxLabel}>
                            {/* Checkbox binding maps assertion rules directly to form engine state validation */}
                            <input
                                type="checkbox"
                                {...register('terms', {
                                    required: 'You must accept Terms & Conditions'
                                })}
                            />

                            <span>
                                I agree to the{' '}
                                <Link to="/terms" className={styles.link}>
                                    Terms & Conditions
                                </Link>
                                {' '}and{' '}
                                <Link to="/privacy" className={styles.link}>
                                    Privacy Policy
                                </Link>
                            </span>

                        </label>

                        {errors.terms && (
                            <span className={styles.errorText}>
                                {errors.terms.message}
                            </span>
                        )}

                    </div>

                    {/* ACTIVITY: Conditional Submission Handling */}
                    {/* Disables interactive clicks when an API network request is actively pending */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles.btn}
                    >
                        {isSubmitting ? 'CREATING ACCOUNT...' : 'Register'}
                    </button>

                </form>

                {/* ACTIVITY: Alternative Interface Navigation */}
                <div className={styles.footer}>
                    <p>
                        Already registered?{' '}
                        <Link to="/login" className={styles.link}>
                            Sign In
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Register;
