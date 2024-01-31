import React from 'react'
import banner from '../assets/banner.jpg'
const Banner = () => {
  return (
    <div>
        <div className='mt-2 flex flex-col justify-center overflow-hidden rounded-lg'>
            <img className='' src={banner} alt=" banner" />
        </div>
    </div>
  )
}

export default Banner
