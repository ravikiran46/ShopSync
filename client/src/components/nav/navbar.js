import React from 'react'
import Container from '../Container'
import { Link } from 'react-router-dom'
import { CiShoppingCart } from "react-icons/ci";
import { RiAccountCircleLine } from "react-icons/ri";


const navbar = () => {
  return (
    <div className="sticky top-0 w-full z-30 shadow-sm bg-slate-300"> 
        <nav className='py-5 border-b-[2px]'>
            <Container>
            <div className='flex items-center justify-between gap-3 md:gap-0'>
                <Link href='/'>E-shopify</Link>
                <div className=' hidden md:block'>
                    search
                </div>
                <div className='flex items-center gap-8 md:gap-12'>
                    <div> <CiShoppingCart/> </div>
                    <div> <RiAccountCircleLine/> </div>
                </div>
            </div>
            </Container>
        </nav> 
    </div>
  )
}

export default navbar
