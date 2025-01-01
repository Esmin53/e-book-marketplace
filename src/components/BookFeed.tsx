"use client"

import { Loader2, Search } from 'lucide-react'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import debounce from "lodash.debounce"

const BookFeed = () => {
    const [books, setBooks] = useState< {
        _id: string
        title: string
        author: string
        price: number
    }[]>([])
    const [q, setQ] = useState<string >("")
    const [isLoading, setIsLoading] = useState<boolean >(false)
    const [page, setPage] = useState<number >(0)
    const [hasMore, setHasMore] = useState(true)

    const lastBookRef = useRef<HTMLDivElement | null>(null);
    
    const observer = useRef<IntersectionObserver | null>(null);

    const getBooks = async (query: string, p: number) => {
        setIsLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard/books?q=${query}&page=${p}`) 
    
            const data = await response.json()

            if (p === 0) {
                setBooks(data); 
            } else {
                setBooks(prev => [...prev, ...data]); 
            }
    
            setHasMore(data.length > 0);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQ(newQuery);
        setPage(0); 
        handleSearch(newQuery);
    };

      const handleSearch = useCallback(
        debounce((query: string) => {
            getBooks(query, 0)
        }, 300), 
        []
    );


    useEffect(() => {
        if (observer.current) observer.current.disconnect();
    
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isLoading && hasMore) {
                setPage((prev) => {
                    const nextPage = prev + 1;
                    getBooks(q, nextPage);
                    return nextPage;
                });
            }
        });
    
        if (lastBookRef.current) {
            observer.current.observe(lastBookRef.current);
        }
    
        return () => observer.current?.disconnect();
    }, [q, isLoading, hasMore]);
    
    useEffect(() => {
        if(typeof window !== 'undefined')
            if (books.length === 0) getBooks("", 0)
            
    }, [])

  return (
    <div className='flex-1 flex flex-col gap-1'>
        <div className='w-full h-12  mb-3 flex items-center justify-between'>
            <div className='flex-1 h-full flex items-center'>
                <input  placeholder='Search by title or author name' type='string' value={q} onChange={onChange}
                className='flex-1 max-w-xl h-full rounded-tl-sm rounded-bl-sm shadow-sm bg-secondary border-t border-l border-b border-border/40 outline-none px-2'/>
                <button className='h-[2.945rem] w-12 bg-accentBlue rounded-tr-sm rounded-br-sm shadow-sm flex items-center justify-center border border-accentBlue/40'>
                    <Search />
                </button>
            </div>
            <div className='w-64 h-full bg-emerald-700'>

            </div>
        </div>
        <div className='w-full flex gap-1.5'>
            <div className='w-12 h-12 bg-secondary shadow border border-border/35 rounded-sm flex items-end justify-center pb-2'>
                <p className='text-sm'>Num</p>
            </div>
            <div className='w-2/4 h-12 bg-secondary shadow border border-border/35 rounded-sm flex flex-col items-start justify-center p-2'>
                <p className='text-xs font-medium'>Id</p>
                <p className='text-base'>Title</p>
            </div>
            <div className='flex-1 h-12 bg-secondary shadow border border-border/35 rounded-sm flex items-end justify-start p-2'>
                <p className='text-sm'>Author</p>
            </div>
            <div className='w-24 h-12 bg-secondary shadow border border-border/35 rounded-sm flex items-end justify-start p-2'>
                <p className='text-sm'>Price</p>
            </div>
        </div>

            {books.map(({_id, author, title, price}, index) => {
                console.log(index, books.length)
                if(index + 1 === books.length) {
                    return <div key={_id} ref={lastBookRef}>
                        <Link href={`/dashboard/manage-books/${_id}`} className='w-full flex gap-1.5' key={_id}>
                            <div className='w-12 h-12 bg-secondary shadow border border-border/35 rounded-sm flex items-end justify-center pb-2'>
                                <p className='text-sm'>{index + 1}</p>
                            </div>
                            <div className='w-2/4 h-12 bg-secondary shadow border border-border/35 rounded-sm flex flex-col items-start justify-center p-2'>                                    <p className='text-xs text-text/70'>{_id}</p>
                                <p className='text-base'>{title}</p>
                            </div>
                            <div className='flex-1 h-12 bg-secondary shadow border border-border/35 rounded-sm flex items-end justify-start p-2'>
                                <p className='text-base'>{author}</p>
                            </div>
                            <div className='w-24 h-12 bg-secondary shadow border border-border/35 rounded-sm flex items-end justify-start p-2'>
                                <p className='text-base'>$ {price}</p>
                            </div>
                        </Link> 
                    </div>
                }


                return <div className='w-full flex gap-1.5' key={_id}>
                            <div className='w-12 h-12 bg-secondary shadow border border-border/35 rounded-sm flex items-end justify-center pb-2'>
                                <p className='text-sm'>{index + 1}</p>
                            </div>
                            <div className='w-2/4 h-12 bg-secondary shadow border border-border/35 rounded-sm flex flex-col items-start justify-center p-2'>                                    <p className='text-xs text-text/70'>{_id}</p>
                                <p className='text-base'>{title}</p>
                            </div>
                            <div className='flex-1 h-12 bg-secondary shadow border border-border/35 rounded-sm flex items-end justify-start p-2'>
                                <p className='text-base'>{author}</p>
                            </div>
                            <div className='w-24 h-12 bg-secondary shadow border border-border/35 rounded-sm flex items-end justify-start p-2'>
                                <p className='text-base'>$ {price}</p>
                            </div>
                        </div>   
            })}
            {isLoading ? <div className='w-full h-10 flex items-center justify-center my-auto'>
                <Loader2 className='w-7 h-7 animate-spin text-accentBlue' />
            </div> : null}
    </div>
  )
}

export default BookFeed