import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Cart from '../pages/Cart/Cart'


function AppRoutes() {
    return (
        <Routes>

            <Route path='/' element={<Home />}/>
            <Route path='/cart' element={ <Cart />}/>
            <Route path='/login' element={<Login />}/>
            

        </Routes>
    )
}

export default AppRoutes
