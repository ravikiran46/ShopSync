import React from 'react'

const Login = () => {
  return (
    <html><body>
    <div>
      <div class="@apply flex flex-col justify-center items-center h-screen bg-gray-100">
        <div class="bg-white shadow-md rounded-lg px-8 py-6 sm:w-1/3">
            <h1 class="text-2xl font-extrabold text-gray-900 mb-4  md:text-center">Login</h1>
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Welcome Back!</h2>
            <form action="/login" method="POST">
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 mb-2">Email Address</label>
                    <input type="email" id="email" name="email" class="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none" required/>
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-gray-700 mb-2">Password</label>
                    <input type="password" id="password" name="password" class="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none" required/>
                </div>
                <div class="flex items-center justify-between mb-4">
                    <label for="remember" class="flex items-center">
            <input type="checkbox" id="remember" name="remember" class="mr-2 text-blue-500"/>
            <span class="text-gray-700">Remember Me</span>
          </label>
                    <a href="/Forgotpassword" class="text-blue-500 hover:underline">Forgot Password?</a>
                </div>
                <button type="submit" class="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none">
          LogIn
          <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M5 11L12 5 19 11" />
          </svg>
        </button>
            </form>
            <p class="mt-4 text-center text-gray-500">Don't have an account?
                <a href="/SignUp" class="text-blue-500 hover:underline">Sign Up Now</a>
            </p>
            <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"/>
        </div>
    </div>
    </div>
    </body>
</html>
  )
}

export default Login
