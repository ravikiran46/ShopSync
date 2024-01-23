import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductContext } from '../../assets/Context'
import {Rating} from "@mui/material"
import CountToggle from '../../components/CountToggle'

const Singleproducts = () => {
  const {id} = useParams()
  const data = useContext(ProductContext)
  console.log(data)
  const singlepord = data[0]
  console.log(singlepord)
  const [amount,setamount] = useState(1)

const setincrement=()=>{
    setamount(amount+1)
  }

const setdecrement=()=>{
      amount > 1 ? setamount(amount-1) : setamount(1)
  }


  const priceformat = (price)=>{
    return new Intl.NumberFormat(
        'en-IN',{
            style : 'currency',
            currency:'INR'
        }
    ).format(price)
}

const rating = singlepord && singlepord?.reviews.reduce((acc,item)=> item.rating + acc,0 / singlepord && singlepord?.reviews.length)


  return (
    <div className='grid grid-cols-1 md:grid-cols-2 m-5 mr-8'>
      <div>
        <img src="" alt="" />
      </div>
      <div>
        <h2 className='text-2xl text-justify'>{singlepord && singlepord.name}</h2> 
        <span className='text-3xl font-bold'>{priceformat(singlepord && singlepord.price)}</span>
        <div className='flex items-center'>
          <Rating value={rating} readOnly />
          <p>({singlepord.reviews.length}) reviews</p>
        </div>
        <div>
          <p className="text-justify">{singlepord.description}</p>
        </div>
        <br />
        <hr/>

        <div>
          <span className='font-bold text-lg'>Category :</span> {singlepord.category}<br/>
          <span className='font-bold text-lg'>Brand :</span> {singlepord.brand}
        </div>
        <br />
        <hr />

        <div>
          <span className='font-bold text-lg'>Quantity : </span>
          <CountToggle amount={amount} setincrement={setincrement} setdecrement={setdecrement}/>
        </div>
        <div className='mt-4 flex justify-between'>
          <button className='bg-green-600 hover:bg-green-700
          transition duration-200 ease-in-out rounded-lg shadow-md px
          8 py-2 text-white'> Add to Cart </button>
        </div>



      </div>

    </div>
  )
}

export default Singleproducts
