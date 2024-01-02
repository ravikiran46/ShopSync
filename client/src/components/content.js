import React from 'react'
import Container from './Container'
import Banner from './Banner'
import ProductCard from './ProductCard'
import { products } from '../assets/products'
const content = () => {
  return (
    <div>
        <Container>
            <div className=''>
                <Banner/>
            </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-2">
            {
               products.map((items)=>{
                  return <ProductCard data={items} key={items.id}/>
                })
            }
        </div>
      </Container>
    </div>
  )
}

export default content
