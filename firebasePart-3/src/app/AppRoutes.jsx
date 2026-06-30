import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Cart from '../pages/Cart/Cart'
import ProductDetail from '../pages/ProductDetail/ProductDetail'
import Checkout from '../pages/Checout/Checkout'

import { useAuth } from '../context/AuthContext'
import Register from '../pages/Register/Register'

//  Evaluates active authentication states dynamically before rendering child layout nodes.
const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    // Intercepts unauthorized routing requests and returns operators back to the login portal

    return user ? children : <Navigate to="/login" replace />;

}
function AppRoutes() {
    return (
        <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={< Register />} />

            <Route path='/product/:id' element={<ProductDetail />} />


            <Route path='/checkout' element={
                <ProtectedRoute>
                    < Checkout />
                </ProtectedRoute>

            } />



        </Routes>
    )
}

export default AppRoutes
