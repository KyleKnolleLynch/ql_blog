import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'

const PostCard = ({ post }) => {
    const { title, snippet, featuredImage, author, createdAt, slug } = post
    const formattedDate = new Date(createdAt).toLocaleDateString()
    const dateTime = new Date(createdAt).toISOString()
    console.log(author.avatar)
    

    return (
        <article className='shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
            <div className='relative overflow-hidden shadow-md pb-80 mb-6'>
                <Image
                    src={featuredImage.url}
                    alt={title}
                    layout='fill'
                    objectFit='cover'
                    className='shadow-lg rounded-t-lg lg:rounded-lg'
                />
            </div>
            <Link href={`/posts/${slug}`}>
                <div className='cursor-pointer px-2 lg:px-0 pb-3 hover:opacity-70 transition-opacity' role="navigation" aria-label={title}>
                    <h1 className='text-2xl md:text-4xl pb-2'>{title}</h1>
                    <p className='md:text-xl'>{snippet}</p>
                </div>
            </Link>
            <div className='block lg:flex items-center'>
                {/* <img
                    src={author.photo.url}
                    alt={author.name}
                    width='30px'
                    height='30px'
                    className='rounded-full'
                /> */}

                <p>
                    <small className='text-gray-400 md:text-sm px-2 lg:px-0'>
                        Article by <span className='author font-semibold'>{author.name}</span>
                        {' '}on <time dateTime={dateTime}>{formattedDate}</time>
                    </small>
                </p>
            </div>
            <style jsx>{`
                .author {
                    color: var(--clr-primary);
                }
            `}</style>
        </article>
    )
}
export default PostCard