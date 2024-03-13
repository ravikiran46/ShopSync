import axios from 'axios'
import { React, useEffect, useState} from 'react'
import Home from '../components/Home'
import { Link } from 'react-router-dom'

const Accountpage = () => {
  const [userinfo, setuserinfo] = useState([])
  const data = window.localStorage.getItem("token")
  const logged = window.localStorage.getItem("isLoggedin")
  
  const handleLogout = ()=>{
    localStorage.removeItem("isLoggedin")
    localStorage.removeItem('token')
  }
  
      
  useEffect(()=>{
    const handleinfo = async()=>{
      try{
        let res = await axios.get("https://ecommerce-xi-wheat-32.vercel.app/auth",{
          headers:{
            "x-aut-token" : `${data}`
          },
        })
        setuserinfo(res.data)
        
      }catch(err){
        console.log(err)
        
      }
    }
    handleinfo();
        
        
      },[])
      
  if(logged === false) return <Home />
  
  
  return (
      <Home>
        <div className='grid grid-cols-2 m-4 p-2 bg-gray-100 '>
          <div className='mx-4'>
            <div className='h-fit rounded-lg shadow-md bg-white w-fit'>
              <div className='p-4'>
                <div className='flex gap-2'> 
                  <img src="/" alt="img" />
                  <h1> Hello {userinfo?.name}</h1>
                </div>
                <br />
                <hr />
                <br />
                <div className=''>
                  <Link to='/orders'>
                    <button className='font-medium  hover:text-blue-600'>My Orders</button>
                  </Link>
                  <br />
                  <br />


                  <button className='font-medium hover:text-blue-600'> Profile Info </button>
                  <br />
                  <br />

                  <Link to='/' >
                  <button className='font-medium hover:text-blue-600' onClick={handleLogout}>
                    Logout
                  </button>
                  </Link>

                </div>

              </div>
            </div>
          </div>
          {/*  Right side of the page (details) */}
          <div>
            <Details/>
          </div>
        </div>
      </Home>
  )
}


const Details = ()=>{
  const genders = ['Male', 'Female'];
  const [selectedGender, setSelectedGender] = useState('');

  const handleChange = (event) => {
    setSelectedGender(event.target.value);
  };

  return(
    <div className="container mx-auto px-3 mb-20 py-8  lg:px-8 rounded-lg shadow-md bg-white">
      <form>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-xs font-bold text-gray-700 mb-2"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 rounded py-3 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:ring-blue-500 focus:ring-opacity-50"
              type="text"
              placeholder="First Name"
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-xs font-bold text-gray-700 mb-2"
            >
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 rounded py-3 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:ring-blue-500 focus:ring-opacity-50"
              type="text"
              placeholder="Last Name"
            />
          </div>

        <div className="mb-6 mt-2 px-3">
          <label className="block uppercase tracking-wide text-xs font-bold text-gray-700 mb-2">
          Gender
          </label>
          <div className="flex items-center space-x-4">
            {genders.map((gender) => (
              <div key={gender}>
                <input
                  type="radio"
                  value={gender}
                  checked={selectedGender === gender}
                  onChange={handleChange}
                  className="w-4 h-4 border-gray-300 rounded focus:ring-blue-500 focus:ring-opacity-50"
                />
                <label htmlFor={gender} className="text-gray-700 ml-2">
                  {gender}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full mt-1 md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-xs font-bold text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 rounded py-3 px-3 mb-3 leading-tight focus:outline-none focus:bg-white focus:ring-blue-500 focus:ring-opacity-50"
              type="email"
              placeholder="email"
            />
          </div>
      </div>
      </form>
    </div>
  )
}

export default Accountpage
