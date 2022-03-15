import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'

const PostCard = ({ post }) => {
    const { title, snippet, featuredImage, author, createdAt, slug } = post

    return (
        <article className='shadow-lg rounded-lg p-0 lg:p-8 pb-11 mb-8'>
            <figure className='relative overflow-hidden shadow-md pb-80 mb-7'>
                <Image
                    src={featuredImage.url}
                    alt={title}
                    layout='fill'
                    objectFit='cover'
                    className='shadow-lg rounded-t-lg lg:rounded-lg'
                />
            </figure>
            <Link href={`/posts/${slug}`}>
                <div className='cursor-pointer px-2 lg:px-0 pb-6 hover:opacity-70 transition-opacity' role="navigation" aria-label={title}>
                    <h1 className='text-2xl md:text-4xl pb-3'>{title}</h1>
                    <p className='md:text-xl'>{snippet}</p>
                </div>
            </Link>
            <p className='text-gray-400 px-2 lg:px-0'>
                <small>
                    Article by <span className='author font-semibold'>{author.name}</span>
                    {' '}on <time dateTime={new Date(createdAt).toISOString()}>{moment(createdAt).format('MMM DD, YYYY')}</time>
                </small>
            </p>
            <style jsx>{`
                article {
                    background-color: var(--clr-gray-100);
                }
                .author {
                    color: var(--clr-primary);
                }
            `}</style>
        </article>
    )
}
export default PostCard