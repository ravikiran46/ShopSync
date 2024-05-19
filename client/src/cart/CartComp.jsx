import React, {useEffect, useState} from 'react'
import Home from '../components/Home'
import Container from '../components/Container'
import CountToggle from '../components/CountToggle'
import axios from 'axios'
import toast from "react-hot-toast"
import { Link } from 'react-router-dom'

const priceformat = (price)=>{
  return new Intl.NumberFormat(
      'en-IN',{
          style : 'currency',
          currency:'INR'
      }
  ).format(price)
}

const CartComp = () => {
  const token = window.localStorage.getItem("token")

  const [totalamount,settotalamount]=useState(0);
  const  [cart, setCart] = useState([])
  const handleCartdata = async()=>{
    try{
       let res = await axios.get("https://ecommerce-xi-wheat-32.vercel.app/cart/",{
        headers : {
          "x-aut-token" : `${token}`
        }
       })
       if(res.status ===200){
        setCart(res.data.usercart.products)
       }
    }
    catch(err){
      console.log(err)
    }

  }
  
  useEffect(()=>{
    handleCartdata()
  },[cart])


  const handletotalprice=()=>{
    let price=0
    cart.forEach(item => {
    price=price+(item.price*item.quantity)
    });
    settotalamount(price);
  }
  if(!token){
    return(
      <Home >
      <Container>
      <div className='p-5 text-center mb-10 border-2 shadow-sm mt-5  rounded'>
      <h1 className='text-2xl'>Your Cart is Empty!</h1> 
      <p className=''>Login to view cart </p>
      <br />
      <Link to={"/login"} className='bg-amber-400 p-[10px] text-center text-xl rounded hover:bg-amber-500'>
        LOGIN
    </Link>
   </div>
   </Container>
      </Home>
    )
  }
  

  return (
    <Home >
      <Container>
        <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-6'>
          <div className='lg:col-start-1 lg:col-end-5'>
          <CartItems cart={cart} setCart={setCart} totalamount={totalamount} settotalamount= {settotalamount}/>
          </div>
      {cart.length!==0 &&
      <div className='top-10 w-fit xs:min-w-xs ml-7 lg:w-[400px]'>
      <CartSummary cart={cart} setCart={setCart}  totalamount={totalamount} settotalamount= {settotalamount} handletotalprice={handletotalprice} />
    </div>
    
      }
      </div>

        </div>
      
      </Container>
      
    </Home>
  )
}


const CartItems=({cart,setCart,totalamount,settotalamount})=>{

  
const [amount, setamount] = useState();
const setincrement = (amount) => {
  console.log(amount)
  amount <5 ? setamount(amount + 1) : setamount(5);
};
const setdecrement = (amount) => {
  amount > 1 ? setamount(amount - 1) : setamount(1);
};


const handleDelete=async(id)=>{
  try{
    const res  = await axios.delete(`https://ecommerce-xi-wheat-32.vercel.app/cart/${id}`,{
      headers:{
        'x-aut-token': localStorage.getItem('token')
      }
    })
    if(res){
      toast.success(res.data.message)
    }
    else{
      toast.error(res.data.message)
    }
  }catch(error){
    console.log(error)
  }

} 

  return(
    <div className='lg:m-5 p-5'>  
      <div className='border-2 p-1 rounded-md shadow-md text-wrap'>
        {
          cart.length ===0 ? 
          (
            <div className='grid grid-cols-1'>
              <div className='w-auto text-wrap p-3 lg:p-14'>
                <span className='text-xl '>
                Your Cart is Empty!
                </span>
                <br />
               <span>
               add items to your cart
                </span>                 
                <br />
                <br />
                <Link to={"/"} className='border-2 p-2 bg-blue-500 text-white rounded-md shadow-md text-wrap'>
                  Shop now
                </Link>
              </div>
            </div>
            
          ) :
        
        cart.map((item)=>{
          return (
            <div>
            <Link to={`/product/${item.productId}`}>
              <div key={item.productId} className='mb-10 p-1 overflow-auto'>
                <div className='gap-5 lg:gap-[30px] flex  items-center'>
                  <img src={item.image} alt="product" className='h-[100px] w-[150px]  object-contain'/>
                  <p className='font-sans font-thin text-ellipsis'>{item.name}</p>
                </div>
            </div>  
            </Link>
              <div className='flex m-4 gap-4 lg:gap-[90px]'>
                <CountToggle amount={item.quantity} setincrement={()=>setincrement(item.quantity)} setdecrement={()=>setdecrement(item.quantity)}  />
                <span className='font-medium'>{priceformat(item.price)}</span>
                <span className='bg-slate-100 hover:cursor-pointer' onClick={()=>handleDelete(item.productId)}>🗑️</span>
              </div>
            </div>
          )
        })}
      </div>  
    </div>
  )

}

const CartSummary=({cart,setCart,totalamount,settotalamount,handletotalprice})=>{

  useEffect(()=>{
    handletotalprice();
  })

  return(
    <div className='p-3 bg-slate-100 rounded-md shadow-md min-w-full h-auto lg:m-11'>
      <h1 className='text-xl font-normal'>Price Summary</h1>
      <br />
      <hr   />
      <div className='mt-3 flex flex-col gap-y-4'>
        <p>Total Items: {cart.length}</p>
        <p>Delivery Charges: {123}</p>
        <hr />
        <p className='text-xl font-medium'>Total Amount:   &nbsp; &nbsp;  {priceformat(totalamount)}</p>
        
        <Link to={"/checkout"} className='bg-amber-400 p-[5px] text-center hover:bg-amber-500'>
            PLACE ORDER
        </Link>
  
      </div>
    </div>
  )
}

export default CartComp
