"use client"

import { CloudUpload, Loader2, Trash2 } from 'lucide-react'
import Select from '@/components/Select'
import { useContext, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { BookValidator, TBookValidator } from '@/lib/validators/book-validator'
import { toast } from 'sonner'
import { ThemeContext } from '@/context/ThemeContext'
import Link from 'next/link'
import { uploadFile } from '@/lib/supabaseClient'


const Page = () => {
  const [genres, setGenres] = useState< string[]>([])
  const [coverImg, setCoverImg] = useState<File | null>(null)
  const [coverImgPreview, setCoverImgPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
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




  const onSubmit: SubmitHandler<TBookValidator> = async ({title, price, author, genres}) => {
    if(genres.length === 0) return
    if(coverImg === null ||file === null) {
      toast.error('Please provide valid cover image and a file!')
      return
    }
    setIsLoading(true)
    try {
      
      let cover_image = await uploadFile(coverImg, 'images')
      let book_file = await uploadFile(file, 'files')
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/book`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          price,
          author,
          genres,
          cover_image,
          file_url: book_file
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
          setCoverImg(null)
          setCoverImgPreview(null)
          setFile(null)
          setGenres([])  
        
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
              <label htmlFor='file_input'
              className='w-full h-12 bg-[#76ABAE] rounded-md shadow-sm flex items-center justify-center cursor-pointer' >
                Select File
              </label>
              <input id='file_input'className='hidden'
              type='file' onChange={((e) => {
                if(e.target.files)
                  setFile(e.target.files[0])
              })} />
              {errors.file_url ? <p className='text-xs text-red-500'>{errors.file_url?.message}</p> : null}
              {file ? <p className='text-xs font-medium'>File url: {file.name}</p> : null}
          </div>
          <div className='flex flex-col gap-1 overflow-hidden'>
            <label htmlFor='cover_image' className='w-full relative h-64 border border-dashed border-text flex items-center justify-center 
            rounded-md cursor-pointer z-30'
            >
              <div className='relative w-full h-full flex items-center justify-center'>
              {coverImgPreview ? <img className='aboslute h-full z-40 top-0 left-0'
                src={coverImgPreview}
              /> : null}
              {coverImgPreview ? <Trash2 className='absolute z-50 top-4 right-4 text-red-400' onClick={() => {
                setCoverImg(null)
                setCoverImgPreview(null)
              }}/> : null}
                {!coverImgPreview ? <div className='flex flex-col items-center justify-center'>
                  <CloudUpload  className='w-8 h-8'/>
                  <p className='text-sm font-medium'>Select an cover image for this book.</p>
                </div> : null}
              </div>
            </label>
            <input id='cover_image'className='hidden'
              type='file' onChange={((e) => {
                if(e.target.files && e.target.files[0]) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setCoverImgPreview(reader.result as string);
                  };
                  reader.readAsDataURL(e.target.files[0])
                  setCoverImg(e.target.files[0])
                }
                  
              })} />
            {coverImgPreview ? <p className='text-xs font-medium'>File url: {coverImgPreview}</p> : null}
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