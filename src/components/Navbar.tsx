"use client"

import { ThemeContext } from '@/context/ThemeContext'
import { Moon, Search, Sun } from 'lucide-react'
import React, { useContext } from 'react'

const Navbar = () => {

  const {setTheme, theme} = useContext(ThemeContext)

  return (
    <div className='w-full h-20 bg-accent flex items-center px-52 shadow-sm text-text gap-6'>
        <div className='flex gap-6 items-center'>
            <h1 className='text-5xl font-semibold'>Logo</h1>
            <p className='text-lg cursor-pointer'>Discover</p>
            <div className='flex'>
                <input className='w-64 h-10 bg-white rounded-tl-sm rounded-bl-sm shadow-sm pl-2 focus:outline-none' placeholder='Search by title or author' />
                <button className='w-10 h-10 rounded-tr-sm rounded-br-sm bg-accent2 shadow-sm text-text flex items-center justify-center'>
                  <Search />
                </button>
            </div>
        </div>
        <p className='text-lg cursor-pointer ml-auto'>Log in</p>
        <button className='text-lg cursor-pointer w-14 h-7 rounded-full bg-accent2 relative' onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}>
            <div className={`absolute top-0.5 ${theme === 'dark' ? 'left-1' : 'right-1'}`}>
              {theme === 'dark' ? <Sun /> : <Moon />}
            </div>
        </button>
    </div>
  )
}

export default Navbar