import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import {Rating} from "@mui/material"
import CountToggle from '../../components/CountToggle'
import Home from '../../components/Home'
import axios from 'axios'
import LoadingPage from '../../components/Loading'
import toast from "react-hot-toast"
const Singleproducts = () => {
  const { id } = useParams();
  const [item, setitem] = useState([]);
  const [loading,setloading] = useState(false)
  const getData = async () => {
    try {
      setloading(true)
      let response = await axios.get(`https://ecommerce-mjv6.vercel.app/product/${id}`);
      setitem(response.data);
      setloading(false)
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    getData();
    setloading(false)
  },[]);
  return (
    <Home>
    { loading!==true && item.length !== 0 ? <Render item={item} id={id}/> :  <LoadingPage/> }
    </Home>
  )
}

const Render = (props) => {

  const {name, reviews, price, description, category, brand
  ,images,id} = props.item;
  const [amount, setamount] = useState(1);
  const [imageid,setimageid]=useState(0)
  const setincrement = () => {
    amount <5 ? setamount(amount + 1) : setamount(5);
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

  const AddtoCart = async()=>{
  const token = window.localStorage.getItem("token")
  if(!token){
    toast.error("Login Required");
  }
    try{
      let res = await axios.post("https://ecommerce-xi-wheat-32.vercel.app/cart/",{
    itemid: id,
    quantity: amount,
    name: name,
    image: images[0]?.image,
    price: price,
    },
      {
        headers :{
          "x-aut-token" : `${token}`
        }
      },
      )
      if(res){
        toast.success(res.data.message)
      }
      else{
        toast.error(res.data.message)
      }
    }
    catch(error){
      console.log(error)
    }
    
  }


  return (
    <div className='grid grid-cols-1 md:grid-cols-2 m-5 mr-8'>
      <div className='grid grid-cols-7 items-center'>
        <div className='col-start-2 col-end-3'>
          <Sidebar images={images} setimageid={setimageid} />
        </div>
        <div className='col-start-4 col-end-7'>
          <img src={images[imageid]?.image} alt="Worry..." />
        </div>
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
      8 py-2 p-2 text-white"
          onClick={AddtoCart}>
            Add to Cart
          </button>
        </div>
        </div>
         
        
      </div>
  )
}

const Sidebar = ({images,setimageid})=>{
  return(
    <div className=" grid grid-col-5 aspect-auto relative rounded-lg p-2 cursor-pointer gap-y-5 border-2">
      {images.map((i)=>{
        return <div  className='border-2 border-slate-100 hover:border-blue-400 rounded'> <img  src={i.image} alt='alt' width={'85px'}/></div>
      })}
    </div>
  )

}

export default Singleproducts
