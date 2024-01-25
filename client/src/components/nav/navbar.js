import React from 'react'
import { Link } from 'react-router-dom'
import { CiShoppingCart } from "react-icons/ci";
import { RiAccountCircleLine } from "react-icons/ri";

const navbar = () => {
    return (
      <div className="sticky top-0 w-full z-30 shadow-sm bg-white "> 
        <nav className='py-3 border-b-[2px]'>
        
        <div className=' grid grid-cols-12 items-center '>

            <div className='col-start-1 col-end-4 text-center'>
            <Link to="/" className=' text-blue-600 font-extrabold'>E-shopify</Link>
            </div>
                
                <div className=' col-start-4  col-end-10'>
                    <input type="text"  className=' border-2 rounded-md  w-full placeholder: bg-slate-100 text-lg font-[17px] placeholder-gray-500' placeholder=' Search for Products'/>
                </div>
                <div className='col-start-11 col-end-13 '>
                <div className='flex item-center gap-8 md:gap-12'>
                    <div> 
                        <Link to="/account"> 
                            <RiAccountCircleLine/>
                        </Link>
                    </div>
                </div>
                    <Link to="/cart">
                        <CiShoppingCart/>
                    </Link>
                </div>
              
            </div>
            </nav> 
    </div>
  )}
export default navbar
