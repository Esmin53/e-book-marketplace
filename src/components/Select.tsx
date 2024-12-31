"use client"

import { ThemeContext } from '@/context/ThemeContext'
import { GENRES } from '@/lib/utils'
import { Plus } from 'lucide-react'
import React, { useContext, useState } from 'react'

interface SelectProps {
    genres: string[]
    handleGenres: (genre: string) => void
}

const Select = ({genres, handleGenres}: SelectProps) => {
    const [isOpen, setIsOpen] = useState<boolean >(false)
    const {theme} = useContext(ThemeContext)

  return (
    <div className='w-full'>
        <div className={`w-full py-3.5 px-2 bg-secondary/60 outline-none shadow-sm border rounded-sm flex gap-1 items-center justify-center cursor-pointer
         ${ theme === 'light' ?  'border-zinc-300' : 'border-secondary' } font-medium`} onClick={() => setIsOpen(true)}>
            Genres
            <Plus className='w-6 h-6'/>  
        </div>
        {isOpen ? <div className='w-screen h-screen fixed bg-secondary/40 outline-none shadow-sm border border-secondary rounded-sm left-0 top-0 z-40 flex items-center justify-center
        '>
            <div className='w-96 bg-secondary z-50 shadow border border-primary/80 rounded-md flex flex-col p-4'>
                <div className='flex w-full flex-wrap gap-2'>
                    {GENRES.map(({id, title}) => 
                    <p className={`text-base font-medium cursor-pointer p-1 py-1.5 rounded-sm shadow-sm ${
                        genres.includes(title) ? `bg-accentBlue` : 'hover:bg-primary/60' 
                    }`} key={id}
                    onClick={() => handleGenres(title)}>
                        {title}
                    </p>)}
                </div>
                <button className='bg-accentBlue w-full h-10 rounded-md mt-8 mb-2' onClick={() => setIsOpen(false)}>Done</button>
                <div className='w-full py-2 mt-auto border-t-[1.5px] border-t-primary flex gap-1'>
                    <p className='text-sm flex-shrink-0'>Selected genres: </p>
                    <div className='flex flex-wrap gap-x-0.5'>
                    {genres.map((item) => <p key={item} className='text-sm'>{item},</p>)}
                    </div>
                </div>
            </div>
        </div> : null}
    </div>
  )
}

export default Select