import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

const PostCard = ({ post }) => {
    const { title, snippet, featuredImage, author, createdAt, slug } = post

    return (
        <article className='shadow-lg rounded-lg p-0 lg:p-8 pb-11 mb-8 relative'>
            <figure className='relative overflow-hidden shadow-md pb-80 mb-7'>
                <Image
                    src={featuredImage.url}
                    alt={title}
                    layout='fill'
                    objectFit='cover'
                    className='shadow-lg rounded-t-lg lg:rounded-lg'
                />
            </figure>
            <div className='px-2 lg:px-0'>
                <h1 className='text-2xl md:text-4xl pb-3'>{title}</h1>
                <h2 className='md:text-xl pb-6'>{snippet}</h2>
                <p className='text-gray-400'>
                    <small>
                        Article by <span className='author font-semibold'>{author.name}</span>
                        {' '}on <time dateTime={new Date(createdAt).toISOString()}>{format(new Date(createdAt), 'MM/dd/yyyy')}</time>
                    </small>
                </p>
            </div>
            <Link href={`/posts/${slug}`}><span className='cursor-pointer absolute inset-0' role="navigation" aria-label={title} /></Link>
            <style jsx>{`
                article {
                    background-color: var(--clr-gray-100);
                }
                article h1,
                article h2 {
                    transition: 150ms opacity ease-in-out;
                }
                article:hover h1,
                article:hover h2 {
                    opacity: 0.7;
                }
                .author {
                    color: var(--clr-primary);
                }
            `}</style>
        </article>
    )
}
export default PostCard