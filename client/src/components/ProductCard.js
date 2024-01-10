import React from 'react'
import {Rating} from '@mui/material'

export const trimstring=(str)=>{
    if(str.length>25){
        return str.substring(0,25) + "..."
    }
    return str
}


const ProductCard = ({data}) => {

    const priceformat = (price)=>{
        return new Intl.NumberFormat(
            'en-IN',{
                style : 'currency',
                currency:'INR'
            }
        ).format(price)
    }

    const rating = data.reviews.reduce((acc,item)=> item.rating + acc,0 / data.reviews.length)

   

  return (
    <div className='col-span-1 cursor-pointer 
    border-[1px] border-slate-200 bg-slate-50
    rounded-sm p-2   
    text-center text-sm transition hover:scale-90 rounded-md'>
        <div className='flex flex-col items-center w-full gap-1'>
            <div className='aspect-square overflow-hidden relative w-full '>
                <img className='w-full h-full object-contain ' src={data.images[0].image} alt={trimstring(data.name)} />
            </div>
            <div className='mt-4'>
                 {trimstring(data.name)}
            </div>
            <div> 
                <Rating value={rating} readOnly/>
            </div>
            <div>{data.reviews.length} reviews</div>
            <div className='font-semibold'>{priceformat(data.price)}</div>
        </div>
    </div>
  )
}

export default ProductCard
