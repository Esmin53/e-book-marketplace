import BookFeed from '@/components/BookFeed'
import React from 'react'

const Page = () => {
  return (
    <div className='flex-1 flex flex-col gap-6'>
        <div className='w-full'>
            <h1 className='text-4xl font-semibold'>Manage Books</h1>
            <div className='w-4/6 h-[1px] shadow bg-accentBlue my-1.5' />
            <p className='text-sm text-text/60'>You can view all the books in the store, edit info about books, delete or apply discounts. </p>
        </div>
        <BookFeed />
    </div>
  )
}

export default Page