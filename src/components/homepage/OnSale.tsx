

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const OnSale = async () => {
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/books?category=Non-Fiction`)

    const data: {
        _id: string
        author: string
        price: number
        title: string
        cover_image: string
    }[] = await res.json()

    return (
    <div className='w-full h-96 flex flex-col gap-2'>
        <h2 className='text-text/90 text-2xl'>Free books and deals</h2>
        <div className='flex overflow-x-auto no-scrollbar gap-4'>
            {data.map((item) => <Link href={`/books/${item._id}`} key={item._id} className='flex flex-col rounded-sm shadow-sm overflow-hidden'>
                <div className='w-52 h-64 bg-teal-200 relative'>
                    <Image fill src={item.cover_image} alt='cover image' />
                </div>
                <h1 className='text font-medium'>{item.title}</h1>
                <p className='text-text/80 text-sm'>{item.author}</p>
                <p className='text-lg font-medium'>
                    $ {item.price}
                </p>
            </Link>)}
            
        </div>
    </div>
  )
}

export default OnSale