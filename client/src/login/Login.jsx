import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';
const Login = () => {
  const  {register, handleSubmit, setError,formState:{errors} } = useForm();

  const onsumbit = async(data)=>{
    try{
        let res = await axios.post('https://ecommerce-xi-wheat-32.vercel.app/login',{
          email: data.email,
          password: data.password
        })
        if(!res.data.token){ 
            throw new Error(res.data.status)
        }else{
           localStorage.setItem('token',res.data.token)
           window.localStorage.setItem("isLoggedin",true)
           window.location.href='/'
        }
    }
    catch(err){
      setError("root",{
        message : err.message
      })
    }
    
  }
  return (
    <div>
      <div className="@apply flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg px-8 py-6 sm:w-1/3">
            <h1 className="text-2xl font-extrabold text-gray-900 mb-4  md:text-center">Login</h1>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Welcome Back!</h2>
            <form action="/login" method="POST" onSubmit={handleSubmit(onsumbit)}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email Address</label>
                    <input type="email"  {...register("email",{
                      required : 'Enter email',
                      pattern: {
                        value: /@[A-Za-z0-9.-]/,
                        message: "Please enter a valid Email address"
                      }
                    })} className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none" />
                    { errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                    <label  className="block text-gray-700 mb-2">Password</label>
                    <input type="password" {...register("password",{
                      required : "Enter password",
                      
                    })}  className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none" />
                    { errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    { errors.root && <p className="text-red-500">{errors.root.message}</p>}

                </div>
                <div className="flex items-center justify-between mb-4">
                    <label className="flex items-center">
            <input type="checkbox" id="remember" name="remember" className="mr-2 text-blue-500"/>
            <span className="text-gray-700">Remember Me</span>
          </label>
                    <a href="/Forgotpassword" className="text-blue-500 hover:underline">Forgot Password?</a>
                </div>
                <button type="submit" className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none">
          LogIn
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor"  viewBox="0 0 24 24">
            <path d="M5 11L12 5 19 11" />
          </svg>
        </button>
            </form>
            <p className="mt-4 text-center text-gray-500">Don't have an account?
                <a href="/SignUp" className="text-blue-500 hover:underline">Sign Up Now</a>
            </p>
            <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"/>
        </div>
    </div>
    </div>
  )
}

export default Login
