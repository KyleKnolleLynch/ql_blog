import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { getCategories } from '../services'


const Header = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        let mounted = true

        if (mounted) {
            getCategories().then(res => setCategories(res))
        }

        return () => mounted = false
    }, [])

    return (
        <header className='container mx-auto flex items-center justify-between py-3 px-5 relative z-10 after:border-b after:absolute after:bottom-0 after:left-0 after:right-0'>
            <nav aria-label='Home'>
                <Link href='/'><a className='text-3xl md:text-4xl font-bold'>QL Blog</a></Link>
            </nav>
            <nav className='hidden md:flex md:justify-evenly flex-wrap gap-x-3' aria-label='Article categories'>
                {categories?.map(cat => (
                    <Link key={cat.slug} href={`/category/${cat.slug}`}><a className='font-semibold'>{cat.name}</a></Link>
                ))}
            </nav>
            <style jsx>{`
                header {
                    color: var(--clr-gray-100);
                }

                header::after {
                    border-color: var(--clr-secondary);
                }
            `}</style>
        </header>
    )
}
export default Header