import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { getCategories } from '../services'


const Header = () => {
    const [categories, setCategories] = useState([])
    const [theme, setTheme] = useState('light')

    // HANDLE GLOBAL COLOR THEME CHANGE
    const changeTheme = () => {
        theme === 'light' ? saveTheme('dark') : saveTheme('light')
    }

    // SET CURRENT THEME IN STATE AND LOCAL STORAGE AND APPLY IT
    const saveTheme = theme => {
        setTheme(theme)
        localStorage.setItem('theme', theme)
        document.documentElement.setAttribute('data-theme', theme)
    }

    // GET THEME FROM LOCAL STORAGE IF IT EXISTS AND APPLY IT ON RENDER/LOAD
    useEffect(() => {
        const STORED_THEME = localStorage.getItem('theme')

        if (STORED_THEME) {
            setTheme(STORED_THEME)
            document.documentElement.setAttribute('data-theme', STORED_THEME)
        }
    }, [])



    // DISPLAY CATEGORIES ON PAGE LOAD
    useEffect(() => {
        let mounted = true

        if (mounted) {
            getCategories().then(res => setCategories(res))
        }

        return () => mounted = false
    }, [])

    return (
        <header className='container mx-auto flex items-center py-3 px-8 sm:px-5 text-gray-100 relative z-10 after:border-b after:absolute after:bottom-0 after:inset-x-0'>
            <nav aria-label='Home'>
                <Link href='/'><a className='text-3xl md:text-4xl font-bold'>QL Blog</a></Link>
            </nav>

            <nav className='hidden md:flex md:justify-evenly flex-wrap gap-x-3 ml-auto' aria-label='Article categories'>
                {categories?.map(cat => (
                    <Link key={cat.slug} href={`/category/${cat.slug}`}><a className='font-semibold'>{cat.name}</a></Link>
                ))}
            </nav>
            <div className='ml-auto md:ml-10 lg:ml-20'>
                {theme === 'light' ? (
                    <button type='button' onClick={changeTheme} className='cursor-pointer outline-none'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon inline-block"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    </button>
                ) : (
                    <button type='button' onClick={changeTheme} className='cursor-pointer outline-none'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun inline-block"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    </button>
                )}

            </div>

            <style jsx>{`
                header::after {
                    border-color: var(--clr-secondary);
                }
            `}</style>
        </header>
    )
}
export default Header