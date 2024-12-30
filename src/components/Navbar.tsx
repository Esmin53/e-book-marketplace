"use client"

import { ThemeContext } from '@/context/ThemeContext'
import { ChartNoAxesColumn, Moon, Search, ShoppingBag, Sun } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'

const Navbar = () => {

  const pathname = usePathname().split("/")[1]

  const {setTheme, theme} = useContext(ThemeContext)
  const session = useSession()

  if(pathname === 'log-in' || pathname === 'dashboard') {
    return null
  }

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
        {
          session?.data?.user ? <button className='text-lg cursor-pointer ml-auto'
          onClick={() => signOut()}>
            Log out
          </button> : 
          <Link href='/log-in' className='text-lg cursor-pointer ml-auto'>Log in</Link>
        }
        {session?.data?.user.role === 'admin' ? <Link href={'/dashboard/new-book'} className='text-text'>
          <ChartNoAxesColumn />
        </Link> : <ShoppingBag className='text-text w-5 h-5 cursor-pointer' />}
        <button className='text-lg cursor-pointer rounded-full' onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}>
              {theme === 'dark' ? <Sun /> : <Moon />}
        </button>

    </div>
  )
}

export default Navbar