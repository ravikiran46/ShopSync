import React from 'react'
import { Link } from 'react-router-dom'
import { CiShoppingCart } from "react-icons/ci";
import { RiAccountCircleLine } from "react-icons/ri";

const navbar = () => {
    return (
      <div className="sticky top-0 w-full z-30 shadow-sm bg-white "> 
        <nav className='py-3 border-b-[2px]'>
        <div className='grid grid-cols-13 items-center'>
            <div className='col-start-1 col-end-3 text-center'>
            <Link to="/" className=' text-blue-600 font-extrabold'>E-shopify</Link>
            </div>
                
                <div className=' col-start-3 col-end-9'>
                    <input type="text"  className=' border-2 rounded-md h-9 w-full placeholder: bg-slate-100 text-lg font-[17px] placeholder-gray-500' placeholder=' Search for Products'/>
                </div>

                <div className='flex items-center gap-4 md:gap-9 col-start-10 col-end-12'>

                    <div className='flex text-center justify-center min-w-24 h-9 rounded-md hover:bg-blue-600 hover:text-slate-50'>
                        <Link to="/login" className='flex items-center gap-2'>                       
                         <RiAccountCircleLine className='w-5 h-5' />Login
                        </Link>
                    </div>

                    <div> 
                        <Link to="/account" className='flex items-center'> 
                            <RiAccountCircleLine className='h-7 w-7'/>
                        </Link>
                    </div>

                    <div>
                    <Link to="/cart">
                        <CiShoppingCart className='h-7 w-7'/>
                    </Link>
                    </div>
                    
                </div>
              
            </div>
            </nav> 
    </div>
  )}
export default navbar
