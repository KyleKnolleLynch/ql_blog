import { useState, useEffect } from 'react'
import moment from 'moment'
import Link from 'next/link'
import Image from 'next/image'
import { getRelatedPosts, getRecentPosts } from '../services'

const SidebarWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    let mounted = true

    if (mounted) {
      if (slug) {
        getRelatedPosts(categories, slug).then(res => setRelatedPosts(res))
      } else {
        getRecentPosts().then(res => setRelatedPosts(res))

      }
    }

    return () => mounted = false
  }, [slug])

  console.log(relatedPosts)


  return (
    <article className='py-4 rounded'>
      <h2 className='text-center text-xl font-semibold'>{slug ? 'Featured Posts' : 'Related Posts'}</h2>
      {!relatedPosts ? (
        <small>No relavent posts found.</small>
      ) : (
        <nav className='p-3' aria-label={`${slug ? 'Related' : 'Featured'} posts`}>
          <ul>
            {relatedPosts.map(post => (
              <li key={post.title} className='my-5 cursor-pointer'>
                <Link href={`/posts/${post.slug}`}>
                  <div className='flex items-center'>
                    <Image src={post.featuredImage.url} alt={post.title} width='50px' height='50px' className='rounded-full' />
                    <div className='ml-5'>
                      <p>{post.title}</p>
                      <small><time dateTime={new Date(post.createdAt).toISOString()}>{moment(post.createdAt).format('MMM DD, YYYY')}</time></small>
                    </div>
                  </div>
                </Link>

              </li>
            ))}
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
export default SidebarWidget