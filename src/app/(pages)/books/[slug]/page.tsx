import { GENRES } from '@/lib/utils'
import Book from '@/models/Book'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface PageParams  {
    params: {
        [key: string]: string
    }
}

async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const {slug} = await params
   
    const book:  {
        _id: string
        title: string
        author: string
        price: number
        genres: string[],
        cover_image: string
      } | null = await Book.findOne({_id: slug}, '_id title author price cover_image genres')

      const moreByAuthor: {
        _id: string
        title: string
        cover_image: string
      }[] = await Book.find({
        author: book?.author
      }, '_id title cover_image').limit(8)

      console.log("MBA", moreByAuthor)

      if(!book) {
        return <div>

        </div>
      }

  return (
    <div className='text-text w-full px-12 lg:px-28 xl:px-52 py-16 flex-1'>
        <div className='flex gap-10'>
            <div className='w-80 h-96'>
                <div>
                    <h2 className='text-xl'>Discover other genres</h2>
                    <div className='px-2 py-1 flex flex-col'>
                        {GENRES.map((item) => <Link href={'/'} key={item.id}>{item.title}</Link>)}
                    </div>
                </div>
                <div>
                    <h2 className='text-xl'>More by this author</h2>
                    <div className='px-2 py-1 flex flex-col'>
                        {moreByAuthor.map((item) => (
                            <Link href={`/books/${item._id}`} className={`${item.title == book.title ? 'text-accent' : ''} `} key={item._id}>{item.title}</Link>
                            ))}
                    </div>
                </div>
            </div>
        <div className='w-full flex h-full gap-6'>
            <div className='w-64 h-80 relative rounded-sm overflow-hidden'>
                <Image fill src={book?.cover_image} alt='cover image' /> 
            </div>
            <div className='flex-1 h-fit py-2'>
                <h1 className='text-2xl font-medium'>{book.title}</h1>
                <h2 className=' text-text/90 font-medium'><span className='font-normal'>by</span> {book.author}</h2>
                <div className='py-2 p-1 flex gap-1'>
                    {book.genres.map((item, i) => <p key={i} className="text-sm text-accent">{item}</p>)}
                </div>
                <div className='flex flex-col gap-1 py-2'>
                    <h2>Description</h2>
                    <p className='text-sm text-text/85'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus est consequuntur dolores ut ratione! Sapiente esse, dolorum tempora vero debitis ducimus deleniti est rerum alias quia rem totam minus dicta nulla illum animi ullam blanditiis repellat! Vitae dolorum fugiat veritatis.
                    </p>
                </div>
                <div className='flex gap-1'>
                    <Star className='text-yellow-400 cursor-pointer' />
                    <Star className='text-yellow-400 cursor-pointer' />
                    <Star className='text-yellow-400 cursor-pointer' />
                    <Star className='text-text/70 cursor-pointer' />
                    <Star className='text-text/70 cursor-pointer' />
                </div>
                <button className='bg-accent px-4 py-2 rounded-sm my-8'>Add to cart</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Page