import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'


export const ProductContext = createContext()

export default function Context({children}){
    const [data,setdata] = useState([])

    const api=async()=>{
    const res = await axios.get('https://ecommerce-xi-wheat-32.vercel.app/product')
    setdata(res.data)
    }
    useEffect(()=>{
        api()
    },[])
    return (
        <div>
            <ProductContext.Provider value={data} >
                    {children}
            </ProductContext.Provider>
        </div>
        )
}

