import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Cart from '../pages/Cart/Cart'
import ProductDetail from '../pages/ProductDetail/ProductDetail'
import Checkout from '../pages/Checout/Checkout'

function AppRoutes() {
    return (
        <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/checkout' element={< Checkout />} />



        </Routes>
    )
}

export default AppRoutes
