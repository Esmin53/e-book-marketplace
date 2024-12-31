"use client"

import { CloudUpload, Loader2 } from 'lucide-react'
import Select from '@/components/Select'
import { useContext, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { BookValidator, TBookValidator } from '@/lib/validators/book-validator'
import { toast } from 'sonner'
import { ThemeContext } from '@/context/ThemeContext'
import Link from 'next/link'


const Page = () => {
  const [genres, setGenres] = useState< string[]>([])
  const [isLoading, setIsLoading] = useState<boolean >(false)

  const {theme} = useContext(ThemeContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm<TBookValidator>({
    resolver: zodResolver(BookValidator)
  })
  
  const handleGenres = (genre: string) => {
    if(genres.includes(genre)) {
      setGenres(prev => {
        let temp = prev.filter(item => item !== genre)
        setValue('genres', prev)
        
        return temp
      })

      
    } else {
      setGenres(prev => {
        let temp = [...prev, genre]
        setValue('genres', temp)
        return temp
      })
    }
  }

  const onSubmit: SubmitHandler<TBookValidator> = async ({title, price, author, genres, cover_image, file_url}) => {
    if(genres.length === 0) return
    setIsLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/book`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          price,
          author,
          genres,
          cover_image,
          file_url
        })
      })
      const data = await response.json()

      if(response.status === 200) {
        toast.success('Book added succesfully!')
        reset({          title: "",
          price: 0,
          author: "",
          genres: [],
          cover_image: "",
          file_url: "",})
        return
      }

      if(response.status === 400) {
        toast.error(data.message)
      }



    } catch (error) {
      toast.error('There was an error adding this book to the database. Please try again.')
      console.log(error)
    } finally {
      setIsLoading(false)
    }
    
  }

  return (
    <div className='flex-1 flex justify-center rounded-lg'>
      <div className='w-full max-w-4xl flex flex-col gap-2 py-2'>
        <h1 className='text-4xl font-semibold'>Add new book</h1>
        <p className='text-sm text-text/60'>You can add new books to the store here. You can apply discounts, edit or delete books in the 
          <Link href={'/dashboard/manage-books'} className='text-accentBlue font-medium'> manage-books section.</Link>
        </p>

        <form className='w-full flex flex-col py-4 gap-4 rounded-lg' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-1'>
              <label className='text-sm' htmlFor='title'>Title</label>
              <input type='text' placeholder='Book title' {...register('title')}
              className={`w-full py-4 px-2 bg-secondary/60 outline-none shadow-sm border  rounded-sm ${
                theme === 'light' ?  'border-zinc-300' : 'border-secondary'
              }`}/>
              {errors.title ? <p className='text-xs text-red-500'>{errors.title?.message}</p> : null}
          </div>
          <div className='flex flex-col gap-1'>
              <label className='text-sm' htmlFor='title'>Author</label>
              <input type='text' placeholder='Books author' {...register('author')}
              className={`w-full py-4 px-2 bg-secondary/60 outline-none shadow-sm border  rounded-sm ${
                theme === 'light' ?  'border-zinc-300' : 'border-secondary'
              }`}/>
          </div>
          <div className='flex flex-col gap-1'>
              <label className='text-sm' htmlFor='title'>Price</label>
              <input  placeholder='Price' step="0.01" type="number" {...register("price", {
                        valueAsNumber: true
                    })}
                    className={`w-full py-4 px-2 bg-secondary/60 outline-none shadow-sm border  rounded-sm ${
                      theme === 'light' ?  'border-zinc-300' : 'border-secondary'
                    }`}/>
          </div>
          <div className='flex flex-col gap-1'>
              <label className='text-sm' htmlFor='title'>Genres</label>
              <Select genres={genres} handleGenres={handleGenres}/>
              <div className='flex flex-wrap gap-1'>
                {
                  genres.map((item) => <p key={item} className='text-sm text-text/90'>{item} - </p> )
                }
              </div>
          </div>
          <div className='flex flex-col gap-1' >
              <label className='text-sm' htmlFor='title'>File url</label>
              <div className='w-full h-12 bg-[#76ABAE] rounded-md shadow-sm flex items-center justify-center cursor-pointer'
              onClick={() => setValue('file_url', 'Mock url to file location')}>
                File Url
              </div>
              {errors.file_url ? <p className='text-xs text-red-500'>{errors.file_url?.message}</p> : null}
              {watch('file_url') ? <p className='text-xs font-medium'>File url: {watch('file_url')}</p> : null}
          </div>
          <div className='flex flex-col gap-1'>
            <div className='w-full h-64 border border-dashed border-text flex items-center justify-center rounded-md  cursor-pointer'
            onClick={() => setValue('cover_image', 'Mock url to cover image')}>
                <CloudUpload  className='w-8 h-8'/>
            </div>
            {watch('cover_image') ? <p className='text-xs font-medium'>File url: {watch('cover_image')}</p> : null}
            {errors.cover_image ? <p className='text-xs text-red-500'>{errors.cover_image?.message}</p> : null}
            </div>

          <button className='w-full h-12 bg-accentBlue rounded-md shadow-sm flex items-center justify-center font-medium' type='submit'>
                {isLoading ? <Loader2 className='animate-spin'/> : "Done"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page