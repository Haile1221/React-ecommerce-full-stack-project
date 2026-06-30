import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.css'
import AppRoutes from './app/AppRoutes'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
function App() {
  return (
    <BrowserRouter>

      <Navbar />
      <AppRoutes />
      <Footer/>

    </BrowserRouter>
  )
}

export default App
