import { useContext } from 'react'
import Link from 'next/link'

const cats = [
    { name: 'React', slug: 'react' },
    { name: 'JS', slug: 'js' },
    { name: 'Web Development', slug: 'web-dev' },
]

const Header = () => {
    return (
        <header className='container mx-auto flex items-center justify-between py-3 px-5 text-gray-100 relative z-10 after:border-b after:border-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0'>
            <nav aria-label='Home'>
                <Link href='/'><a className='text-3xl md:text-4xl'>QL Blog</a></Link>
            </nav>
            <nav className='hidden md:flex md:justify-evenly flex-wrap gap-x-3' aria-label='Article categories'>
                {cats?.map(cat => (
                    <Link key={cat.slug} href={`/category/${cat.slug}`}><a className='font-semibold'>{cat.name}</a></Link>
                ))}
            </nav>
        </header>
    )
}
export default Header