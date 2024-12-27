"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"

export const ThemeContext= createContext<{
    theme: 'light' | 'dark',
    setTheme: Dispatch<SetStateAction<'light' | 'dark'>>
}>({
    theme: "light",
    setTheme: () => null
})

const ThemeContextProvider = ({children}: {
    children: ReactNode
}) => {


    const [theme, setTheme] = useState<'light' | 'dark'>('dark')

    return <ThemeContext value={
        {
            theme: theme,
            setTheme
        }
    }>
        <div className={`${theme} min-h-screen flex-1 bg-primary`}>
            {children}
        </div>
    </ThemeContext>

}

export default ThemeContextProvider