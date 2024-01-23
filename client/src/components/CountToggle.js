import React from 'react'
import { TiMinus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";


const CountToggle = ({amount,setincrement,setdecrement}) => {
  return (
    <div className='flex gap-x-4'>
        <div>
            <button className="border-2 shadow-sm rounded w-5 h-6"   onClick={()=> setdecrement()}>
                <TiMinus />
            </button>
        </div>
        <div>
            {amount}
        </div>
        <div>
            <button className="border-2 shadow-sm rounded w-5 h-6" onClick={()=> setincrement()}>
                <FaPlus />
            </button>
        </div>
      
    </div>
  )
}

export default CountToggle
