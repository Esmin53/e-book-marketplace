"use client"

import { useCart } from '@/hooks/useCart'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'

const Page = () => {
    const [isLoading, setIsLoading] = useState(false)

    const {items, removeItem, clearCart} = useCart()
    
    const total = items.reduce((curr, acc) => curr + Number(acc.book.price), 0)

    const handlePlayment = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment`, {
                method: "POST",
                body: JSON.stringify({
                    books: items,
                    total
                })
            })
    
            const data = await response.json()
            
            if(response.ok) {
                clearCart()
                toast.success("Payment completed!")
            }
        } catch (error) {
            toast.success("Payment failed!")
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className='px-52 py-4 text-text '>
        <h1 className='text-3xl font-medium pb-4'>Checkout</h1>
        <div className='flex-1 flex gap-6'>
            <div className='flex-1 flex flex-col gap-2'>
                {items.map(({book}) => (
                    <div className='w-full flex gap-4' key={book._id} >
                        <div className='w-40 h-52 relative'>  
                            <Image fill src={book.cover_image} alt='Cover Image'/>
                        </div>
                        <div className='flex-1 flex flex-col p-2 gap-2'>
                            <p className='text-sm font-medium'>{book._id}</p>
                            <h1 className='text-2xl font-medium'>{book.title}</h1>
                            <p>{book.author}</p>
                            <p className='text-xl font-medium'>${book.price}</p>
                            <div className='w-full py-2 mt-auto flex gap-6'>
                                <button className='text-red-400 text-sm' onClick={() => removeItem(book._id)}>Remove</button>
                                <Link href={`/books/${book._id}`} className='text-blue-500 text-sm'>View</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='w-80 h-72 rounded-md bg-secondary border border-border/50 shadow-sm flex flex-col p-4 gap-2 sticky top-4'>
                <h1 className='text-2xl font-medium'>Order Sumary</h1>
                <div className='w-full flex justify-between items-center'>
                    <p>Total Items</p>
                    <p>{items.length}</p>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <p>Shipping</p>
                    <p>$ 0</p>
                </div>
                <div className='w-full flex justify-between items-center'>
                    <p>Total</p>
                    <p>${total}</p>
                </div>
                <div className='w-full h-[1px] bg-border/50 shadow' />
                <div className='w-full flex justify-between items-center'>
                    <p>Order Total</p>
                    <p>${total}</p>
                </div>
                <button className='w-full p-2 flex items-center justify-center font-medium bg-accent mt-auto rounded'
                onClick={() => handlePlayment()} disabled={isLoading}>
                    {isLoading ? <Loader2 className='animate-spin' /> : "Payment"}
                </button>
            </div>
        </div>
    </div>
  )
}

export default Page