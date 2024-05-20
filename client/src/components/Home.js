import React from 'react'
import Navbar from './nav/navbar'
import Footer from './footer/footer'

const Home = ({children}) => {
  const logged = window.localStorage.getItem("isLoggedin")

  return (
    <div className="flex flex-col min-h-screen">
        <Navbar log={logged}/>
        <div className="flex-grow">
            {children}
        </div>
        <Footer/>
    </div>
  )
}

export default Home
