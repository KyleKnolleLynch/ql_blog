import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

const FeaturedPostCard = ({ post }) => {
    return (
        <article className='relative h-72'>
            <Image
                src={post.featuredImage.url}
                alt={post.title}
                layout='fill'
                objectFit='cover'
                className='rounded-lg isolate -z-10'
            />
            <div className="intro flex flex-col rounded-lg p-4 items-center justify-center relative h-full after:absolute after:inset-0  after:mix-blend-screen after:rounded-lg after:-z-10">
                <p className="text-white mb-4 text-shadow font-semibold text-xs">
                    <time dateTime={new Date(post.createdAt).toISOString()}>{format(new Date(post.createdAt), 'MM/dd/yyyy')}</time>
                </p>
                <p className="text-white mb-4 text-shadow font-semibold text-2xl text-center">{post.title}</p>

                <Link href={`/posts/${post.slug}`}>
                    <span className="cursor-pointer absolute w-full h-full" />
                </Link>
            </div>
            <style jsx>{`
                .intro::after {
                    background: linear-gradient(to bottom right, #777, #333, #222);
                }
            `}</style>
        </article>
    )
}
export default FeaturedPostCard