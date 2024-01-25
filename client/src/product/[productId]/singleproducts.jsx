import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import {Rating} from "@mui/material"
import CountToggle from '../../components/CountToggle'
import Home from '../../components/Home'
import axios from 'axios'
const Singleproducts = () => {
  const { id } = useParams();
  const [item, setitem] = useState([]);
  const getData = async () => {
    try {
      let response = await axios.get(`https://ecommerce-mjv6.vercel.app/${id}`);
      setitem(response.data);
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    getData();
  });
  return (
    <>
    {item.length === 0 ? "Loding...." : <Render item={item}  />}
    </>
  )
}

const Render = (props) => {
  const {name, reviews, price, description, category, brand
  ,images} = props.item;
  console.log(images)
  const [amount, setamount] = useState(1);
  const setincrement = () => {
    setamount(amount + 1);
  };
  const setdecrement = () => {
    amount > 1 ? setamount(amount - 1) : setamount(1);
  };

  const priceformat = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  const rating = reviews.reduce((acc, i) => i.rating + acc, 0 / reviews.length);


  return (
    <Home>
    <div className='grid grid-cols-1 md:grid-cols-2 m-5 mr-8'>
      <div>
        <img src="" alt="" />
      </div>
      <div>
        <h2 className='text-2xl text-justify'>{name}</h2> 
        <span className='text-3xl font-bold'>{priceformat(price)}</span>
        <div className='flex items-center'>
          <Rating value={rating} readOnly />
          <p>({reviews.length}) reviews</p>
        </div>
        <div>
          <p className="text-justify">{description}</p>
        </div>
        <br />
        <hr/>

        <div>
          <span className='font-bold text-lg'>Category :</span> {category}<br/>
          <span className='font-bold text-lg'>Brand :</span> {brand}
        </div>
        <br />
        <hr />

                  <div>
                    <span className="font-bold text-lg">Quantity : </span>
                    <CountToggle
                        amount={amount}
                        setincrement={setincrement}
                       setdecrement={setdecrement}/>
                    </div>
           <div className="mt-4 flex justify-between">
          <button
            className="bg-green-600 hover:bg-green-700
      transition duration-200 ease-in-out rounded-lg shadow-md px
      8 py-2 text-white"
          >
            Add to Cart
          </button>
        </div>
        </div>
      </div>
      </Home>
  )
}

export default Singleproducts
