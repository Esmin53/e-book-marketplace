"use client"

import { ThemeContext } from '@/context/ThemeContext'
import { ChartArea, FolderCog, Home, LogOut, Moon, Package, Plus, Sun, UserCogIcon, UserPen } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'

const Sidebar = () => {

    const pathname = usePathname().split('/')[2]
    const {theme, setTheme} = useContext(ThemeContext)

  return (
    <div className="w-80 min-h-96 flex flex-col gap-2 p-4">
        <div className='w-full flex'>
            <h1 className='text-xl font-medium'>My Dashoard
            </h1>
        </div>
        <div className='w-full h-[1px] bg-gray-500/80 shadow'/>
        <div className={`flex gap-2 py-2 px-3 cursor-pointer items-center rounded-md hover:pl-5 duration-200 
            ${pathname==='new-book' ? 'border border-primary/80 border-opacity-60 shadow bg-primary pl-5' : ''}`}>
            <Plus className='w-6 h-6' />
            <p className="text-lg font-medium">New Book</p>
        </div>
        <div className={`flex gap-2 py-2 px-3 cursor-pointer items-center rounded-md hover:pl-5 duration-200 
            ${pathname==='overview' ? 'border border-primary/80 border-opacity-60 shadow bg-primary pl-5' : ''}`}>
            <ChartArea className='w-6 h-6' />
            <p className="text-lg font-medium">Overview</p>
        </div>
        <div className={`flex gap-2 py-2 px-3 cursor-pointer items-center rounded-md hover:pl-5 duration-200 
            ${pathname==='manage-books' ? 'border border-primary/80 border-opacity-60 shadow bg-primary pl-5' : ''}`}>
            <FolderCog className='w-6 h-6' />
            <p className="text-lg font-medium">Manage books</p>
        </div>
        <div className={`flex gap-2 py-2 px-3 cursor-pointer items-center rounded-md hover:pl-5 duration-200 
            ${pathname==='orders' ? 'border border-primary/80 border-opacity-60 shadow bg-primary pl-5' : ''}`}>
            <Package className='w-6 h-6' />
            <p className="text-lg font-medium">Orders</p>
        </div>
        <div className={`flex gap-2 py-2 px-3 cursor-pointer items-center rounded-md hover:pl-5 duration-200 
            ${pathname==='admins' ? 'border border-primary/80 border-opacity-60 shadow bg-primary pl-5' : ''}`}>
            <UserCogIcon className='w-6 h-6' />
            <p className="text-lg font-medium">Admins</p>
        </div>
        <div className={`flex gap-2 py-2 px-3 cursor-pointer items-center rounded-md hover:pl-5 duration-200 
            ${pathname==='users' ? 'border border-primary/80 border-opacity-60 shadow bg-primary pl-5' : ''}`}>
            <UserPen className='w-6 h-6' />
            <p className="text-lg font-medium">Users</p>
        </div>
        <div className='mt-auto w-full h-[1.5px] bg-gray-500/80 shadow'/>
        <div className='w-full h-12 flex items-center justify-between'>
            <Link href={'/'}>
                <Home className='w-7 h-7'/>
            </Link>
            <button className='text-lg cursor-pointer rounded-full' onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}>
                {theme === 'dark' ? <Sun className='w-7 h-7 text-[#EABE6C]'/> : <Moon className='w-7 h-7 text-[#76ABAE]'/>}
            </button>
            <LogOut className='w-7 h-7 cursor-pointer'/>
        </div>
  </div>
  )
}

export default Sidebar