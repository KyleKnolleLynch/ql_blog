import { useState, useEffect } from 'react'
import { format } from 'date-fns'
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
              <li key={post.slug} className='flex items-center mb-5 relative'>
                <div className="flex-none w-16">
                  <Image
                    src={post.featuredImage.url}
                    alt={post.title}
                    width={50}
                    height={50}
                    className='rounded-full'
                    objectFit='cover'
                  />
                </div>
                <div className='ml-2 flex-grow'>
                  <p>{post.title}</p>
                  <small><time dateTime={new Date(post.createdAt).toISOString()}>{format(new Date(post.createdAt), 'MM/dd/yyyy')}</time></small>
                </div>
                <Link href={`/posts/${post.slug}`}><span className='absolute cursor-pointer w-full h-full' /></Link>
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