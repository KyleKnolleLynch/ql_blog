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


  return (
    <article className='px-10 py-6 rounded'>
      <h2 className='text-xl font-semibold mb-8'>{slug ? 'Featured Posts' : 'Related Posts'}</h2>
      {!relatedPosts ? (
        <p><small className='pb-4'>No relavent posts found.</small></p>
      ) : (
        <nav aria-label={`${slug ? 'Related' : 'Featured'} posts`}>
          <ul>
            {relatedPosts.map(post => (
              <Link href={`/posts/${post.slug}`}>
                <li key={post.title} className='flex items-center mb-5 cursor-pointer'>
                  <div className="flex-none w-16">
                    <Image src={post.featuredImage.url} alt={post.title} width='50px' height='50px' className='rounded-full' />
                  </div>
                  <div className='ml-5 flex-grow'>
                    <p>{post.title}</p>
                    <small><time dateTime={new Date(post.createdAt).toISOString()}>{moment(post.createdAt).format('MMM DD, YYYY')}</time></small>
                  </div>
                </li>
              </Link>
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