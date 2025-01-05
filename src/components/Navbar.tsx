"use client"

import { ThemeContext } from '@/context/ThemeContext'
import { ChartNoAxesColumn, Moon, Search, ShoppingBag, Sun } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext, useState } from 'react'
import SearchBar from './SearchBar'
import Cart from './Cart'

const Navbar = () => {

  const pathname = usePathname().split("/")[1]
  const [search, setSearch] = useState<string >("")

  const {setTheme, theme} = useContext(ThemeContext)
  const session = useSession()

  if(pathname === 'log-in' || pathname === 'dashboard') {
    return null
  }

  return (
    <div className='w-full h-20 bg-accent flex items-center px-52 shadow-sm text-text gap-6'>
        <div className='flex gap-6 items-center'>
            <Link href='/' className='text-5xl font-semibold'>Logo</Link>
            <p className='text-lg cursor-pointer'>Discover</p>
            <SearchBar />
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
        </Link> : <Cart />}
        <button className='text-lg cursor-pointer rounded-full' onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}>
              {theme === 'dark' ? <Sun /> : <Moon />}
        </button>

    </div>
  )
}

export default Navbar