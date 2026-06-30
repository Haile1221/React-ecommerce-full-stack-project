import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Cart from '../pages/Cart/Cart'
import ProductDetail from '../pages/ProductDetail/ProductDetail'

function AppRoutes() {
    return (
        <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/product/:id' element={<ProductDetail />} />



        </Routes>
    )
}

export default AppRoutes
