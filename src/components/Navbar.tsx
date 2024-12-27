import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full h-20 bg-[#A7727D] flex items-center justify-between px-52 shadow-sm'>
        <div className='flex gap-6 items-center'>
            <h1 className='text-5xl text-white font-semibold'>Logo</h1>
            <p className='text-lg cursor-pointer'>Discover</p>
            <div className='flex'>
                <input className='w-64 h-10 bg-white rounded-tl-sm rounded-bl-sm shadow-sm pl-2 focus:outline-none text-gray-900' placeholder='Search...' />
                <button className='w-10 h-10 rounded-tr-sm rounded-br-sm bg-[#EAC7C7] shadow-sm'></button>
            </div>
        </div>
        <p className='text-lg cursor-pointer'>Login</p>
    </div>
  )
}

export default Navbar