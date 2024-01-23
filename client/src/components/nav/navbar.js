import React from 'react'
import Container from '../Container'
import { Link } from 'react-router-dom'
import { CiShoppingCart } from "react-icons/ci";
import { RiAccountCircleLine } from "react-icons/ri";


const navbar = () => {
  return (
    <div className="sticky top-0 w-full z-30 shadow-sm bg-white ">  
        <nav className='py-5 border-b-[2px]'>
            <Container>
            <div className='flex justify-between md:gap-0'>
                <Link to="/" className=' text-blue-600 font-extrabold'>E-shopify</Link>
                <div className='hidden md:block'>
                    <input type="text"  className=' border-2 rounded-md w-[700px] h-[40px] placeholder: bg-slate-100 text-lg font-[17px] placeholder-gray-500' placeholder=' Search for Products'/>
                </div>
                <div className='flex item-center gap-8 md:gap-12'>
                    <div> 
                        <Link to="/account">
                        <RiAccountCircleLine className='h-8 w-8'/>  
                        </Link>
                    </div>
                    <div> 
                        <Link to="/cart">
                           <CiShoppingCart className='h-8 w-8'/> 
                        </Link> 
                    </div>
                </div>
            </div>
            </Container>
        </nav> 
    </div>
  )
}

export default navbar
