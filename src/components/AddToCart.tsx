"use client"

import { useCart } from '@/hooks/useCart'
import React from 'react'


interface CartProps {
   book: {
    _id: string
    title: string
    author: string
    price: number
    cover_image: string
   }
}

const AddToCart = ({book}: CartProps) => {
    

    const {addItem, removeItem,items} = useCart()

    let item = items.find((item) => item.book._id === book._id)

    if(item) {
        return (
            <div>
                <button className='px-4 py-2 bg-accent shadow rounded-sm flex items-center justify-center my-8'
                onClick={() => removeItem(book._id)}>Remove From Cart</button>
            </div>
          )
    }

  return (
    <div>
        <button className='px-4 py-2 bg-accent shadow rounded-sm flex items-center justify-center my-8' 
        onClick={() => addItem(book)}>Add To Cart</button>
    </div>
  )
}

export default AddToCart