import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import './components.css'

const Body = ({children}) => {
  return (
    <div className="App">
        {/* <Navbar/> */}
        {children}
        {/* <Footer/> */}
    </div>
  )
}

export default Body