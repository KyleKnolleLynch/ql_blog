import Image from "next/image"

const Author = ({ author: { name, avatar, bio } }) => {

  return (
    <article className='text-center mb-8 p-10 rounded-lg bg-black/30 text-gray-100 relative'>
      <figure className='absolute inset-x-0 -top-12'>
        <Image
          src={avatar.url}
          alt={name}
          width={100}
          height={100}
          objectFit='cover'
          unoptimized
          className='rounded-full'
        />
      </figure>
      <div className='py-10'>
        <h2 className='text-2xl pb-2'>{name}</h2>
        <p className='text-lg'>{bio}</p>
      </div>
    </article>
  )
}
export default Author