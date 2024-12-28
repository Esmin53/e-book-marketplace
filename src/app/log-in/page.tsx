"use client"

import { Loader2 } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {

    const [isLoading, setIsLoading] = useState(false)
    const session = useSession()
    const router = useRouter()

    const login = () => {
        setIsLoading(true)
        try {
            signIn('google', {redirect: true, callbackUrl: process.env.NEXT_PUBLIC_SERVER_URL})
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(session.status === 'authenticated') {
            router.push('/')
        }
    }, [session.status])


  return (
    <div className='flex-1 h-full bg-primary flex text-text'>
        <div className='flex-1 bg-red-100 relative hidden md:block'>
            <Image fill src={'/library.jpg'} alt='Library' className='obeject-center'/>
        </div>
        <div className='flex-1 mx-auto max-w-lg md:max-w-96 xl:max-w-lg h-full flex items-center justify-center px-6'>
            <div className='w-full p-10 flex flex-col justify-center items-center'>
                <p className='text-lg text-gray-400'>Welcome to</p>
                <h1 className='text-5xl font-bold text-text mt-6 mb-8'>E Books</h1>
                <p className='text-2xl text-text text-center'>Log In or create an account</p>
                <div className='w-full flex flex-col gap-2 py-8'>
                    <button className='w-full h-12 rounded-md border border-gray-600 shadow-sm flex gap-2 items-center justify-center font-medium' 
                    onClick={() => login()} disabled={isLoading}>
                        {
                            isLoading ? <Loader2 className='animate-spin'/> :
                            <div className='flex gap-2'>
                                <Image width={28} height={28} src={'/google.png'} alt='Google icon'/>
                                <p>Continue with google</p>
                            </div>
                        }

                    </button>
                </div>
                <p className='text-xs text-gray-400 text-center'>
                    By continuing, you agree to our Terms of Use and Privacy Policy.
                </p>
                <div className='w-5/6 h-[1px] bg-gray-600/60 shadow-sm mt-6 opacity-70' />
                <Link href='/' className='ml-auto text-sm text-gray-400 text-center mt-6'>Back to homepage?</Link>
            </div>
        </div>
    </div>
  )
}

export default Page