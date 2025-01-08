"use client"


import { useCart } from '@/hooks/useCart'
import { ShoppingBag, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Cart = () => {
    const [isOpen, setIsOpen] = useState<boolean >(false)
    const {items, removeItem} = useCart()

    const total = items.reduce((curr, acc) => curr + Number(acc.book.price), 0)

  return (
    <div>
        <div onClick={() => setIsOpen(true)}>
            <ShoppingBag className='cursor-pointer'/>
        </div>
        {isOpen ? <div className='w-screen h-screen fixed bg-secondary/80 left-0 top-0 z-50'>
            <div className='w-96 h-full bg-secondary absolute right-0 z-50 flex flex-col px-2 py-4 border-l border-l-border/40'>
                <div className='flex w-full items-center justify-between'>
                    <h2 className='text-xl font-medium'>My Cart</h2>
                    <X className='text-red-500 w-6 h-6 cursor-pointer' onClick={() => setIsOpen(false)}/>
                </div>
                <div className='w-full h-[1.25px] bg-border/70 my-3 shadow' />
                <div className='flex-1 flex flex-col gap-2 px-1 overflow-x-auto'>
                    {items.map(({book}) => (
                        <div className='w-full h-20 flex gap-2 bg-primary rounded-sm overflow-hidden pr-2 shadow-sm border border-border/40' key={book._id}>
                            <div className='h-20 w-16 relative'>
                                <Image fill src={book.cover_image} alt='Cover Image'/>
                            </div>
                            <div className='flex flex-col h-full flex-1 justify-between'>
                                <div className='w-full flex items-center justify-between'>
                                    <h1>{book.title}</h1>
                                    <p className='text-lg font-medium'>$ {book.price}</p>
                                </div>
                                <p className='text-xs'>{book.author}</p>
                                <div className='w-full flex items-center justify-end'>
                                    <button className='ml-auto text-sm text-red-400' onClick={() => removeItem(book._id)}>Remove</button>
                                </div>
                                
                            </div>
                        </div>
                    ))}
                </div>
                <div className='w-full h-[1.25px] bg-border/70 my-3 shadow' />
                <div className='w-full flex flex-col gap-2'>
                    <div className='w-full flex items-center justify-between'>
                        <p>Total items</p>
                        <p>{items.length}</p>
                    </div>
                    <div className='w-full flex items-center justify-between'>
                        <p>Cart total</p>
                        <p>$ {total}</p>
                    </div>
                    <Link href={'/checkout'} className='py-2 w-full flex items-center justify-center bg-accent hover:bg-accent/90 rounded-md shadow font-medium'>Checkout</Link>
                </div>
            </div>

        </div> : null}
    </div>
  )
}

export default Cart