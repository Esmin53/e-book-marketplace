"use client"

import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const SearchBar = () => {
    const [search, setSearch] = useState<string >("")
    const [hydrated, setHydrated] = useState(false)
  
    useEffect(() => {
        setHydrated(true)
    }, [])

    return (
    <div className='flex'>
    {hydrated ?  <input 
    className='w-64 h-10 bg-white rounded-tl-sm rounded-bl-sm shadow-sm pl-2 focus:outline-none' 
    placeholder='Search by title or author'  value={search} onChange={(e) => setSearch(e.target.value)}/> :
    <div className='w-64 h-10 bg-white rounded-tl-sm rounded-bl-sm shadow-sm pl-2 focus:outline-none' />
    }
        <button className='w-10 h-10 rounded-tr-sm rounded-br-sm bg-accent2 shadow-sm text-text flex items-center justify-center'>
          <Search />
        </button>
    </div>
  )
}

export default SearchBar