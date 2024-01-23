import React from 'react'
import Navbar from './nav/navbar'
import Footer from './footer/footer'

const Home = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar/>
        <div className="flex-grow">

            {children}
        </div>
        <Footer/>
    </div>
  )
}

export default Home
