import React from "react";
import {useForm} from 'react-hook-form'
import axios from 'axios';

const SignUp = () => {
  const  {register, handleSubmit, setError,formState:{errors, isSubmitting} } = useForm();
  // on submit event handler
  const  onSubmit = async(data) =>{
    try{
      let response  = await axios.post('https://ecommerce-xi-wheat-32.vercel.app/register',{
        name: data.name,
        email : data.email,
        password : data.password,
      })
      if(response.data.status===200){
        alert('User Created')
        window.location.href='/login'
      }
      else{
       alert('User Cannot be created')
      }  
    } catch(error){
      setError("root",{
        message : "Something  went wrong!"
      })
    }
  }
  return (
    <div className="@apply flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg px-8 py-6 sm:w-1/3">
            <h1 className="text-2xl  hover:non-italic font-extrabold text-gray-900 mb-4  md:text-center">SignUp</h1>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Create Your Account</h2>
            <form action="/signup" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" > Full Name </label>
                    <input {...register("name",
                    {required : "Enter Name",
                     minLength:{value:4 , message:"Name must be at least 4 characters"},
                    })
                    } type="text" className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"></input>
                    { errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>  
                <div className="mb-4">
                    <label  className="block text-gray-700 mb-2">Email Address</label>
                    <input type="email" {...register("email",
                    {
                      required:"Enter email",
                      pattern: {
                        value: /@[A-Za-z0-9.-]/,
                        message: "Please enter a valid Email address"
                      }
                    })} className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"/>
                    { errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                    <label  className="block text-gray-700 mb-2">Password</label>
                    <input type="password" {...register("password",
                    {required : "Enter password",
                    minLength: {value: 8,message: "Password should be atleast 8 characters"},
                    pattern :{
                      value:/(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]:;\"\'{}|,.<>\/?\\])(?=.*[a-z])(?=.*[A-Z]).*$/,
                      message :"Must contain the following: \nOne uppercase letter.\nOne lowercase letter.\na number.\na special character."
                    }
                  })} className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"/>
                    { errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    { errors.root && <p className="text-red-500">{errors.root.message}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none">
                 { isSubmitting? "Loading..." : "Sign up"}
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor"  viewBox="0 0 24 24">
                    <path d="M5 11L12 5 19 11" />
                  </svg>
                </button>
            </form>

            <p className="mt-4 text-center text-gray-500">Already have an account?
                <a href="/Login" className="text-blue-500 hover:underline">login</a>
            </p>
            <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"/>
        </div>
    </div>
  );
};

export default SignUp;
