import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCategories } from '../services'

const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    let mounted = true

    if (mounted) {
      getCategories().then(res => setCategories(res))
    }

    return () => mounted = false
  }, [])

  return (
    <article className='px-10 py-6 rounded'>
      <h2 className='text-xl font-semibold mb-8'>Categories</h2>
      {!categories ? (
        <p><small className='pb-4'>No relavent categories found.</small></p>
      ) : (
        <nav aria-label='Categories'>
          <ul>
            {categories.map(category => (
              <li key={category.slug} className='mb-5 cursor-pointer'>
                <Link href={`/category/${category.slug}`}>
                  <p>{category.name}</p>
                </Link>
              </li>
            ))}
            <li className='mb-5 cursor-pointer'>
              <Link href='/'>
                  <p>View All</p>
                </Link>
            </li>
          </ul>
        </nav>
      )}
      <style jsx>{`
    article {
      background: var(--clr-gray-100);
    }
    `}</style>
    </article>
  )
}
export default Categories