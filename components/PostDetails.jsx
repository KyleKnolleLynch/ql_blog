import { Fragment } from 'react'
import Image from 'next/image'
import moment from 'moment'

const PostDetails = ({ post: { title, featuredImage, author, createdAt, body } }) => {

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>)
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>)
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>)
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className='text-xl font-semibold mb-4'>
          {modifiedText.map((item, i) => <Fragment key={i}>{item}</Fragment>)}
        </h3>
      case 'paragraph':
        return <p key={index} className='mb-8'>
          {modifiedText.map((item, i) => <Fragment key={i}>{item}</Fragment>)}
        </p>
      case 'heading-four':
        return <h4 key={index} className='text-md font-semibold mb-4'>
          {modifiedText.map((item, i) => <Fragment key={i}>{item}</Fragment>)}
        </h4>
      case 'image':
        return (
          <Image
            key={index}
            src={obj.src}
            alt={obj.title}
            width={obj.width}
            height={obj.height}
          />
        )
      default:
        return modifiedText
    }
  }

  return (
    <article className='shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
      <figure className='relative overflow-hidden shadow-md py-64 mb-4'>
        <Image
          src={featuredImage.url}
          alt={title}
          layout='fill'
          objectFit='cover'
          priority
          className='shadow-lg rounded-t-lg lg:rounded-lg'
        />
      </figure>

      <div className='px-3 lg:px-0'>
        <p className='text-gray-400 pb-2 text-right'>
          <small>
            Article by <span className='author font-semibold'>{author.name}</span>
            {' '}on <time dateTime={new Date(createdAt).toISOString()}>{moment(createdAt).format('MMM DD, YYYY')}</time>
          </small>
        </p>
        <h1 className='text-3xl md:text-4xl lg:text-5xl pb-8'>{title}</h1>
        <div className='body-content'>
          {body.raw.children.map((typeObj, i) => {
            const children = typeObj.children.map((item, itemIdx) => getContentFragment(itemIdx, item.text, item))

            return getContentFragment(i, children, typeObj, typeObj.type)
          })}
        </div>
      </div>

      <style jsx>{`
                article {
                    background-color: var(--clr-gray-100);
                }
                .author {
                    color: var(--clr-primary);
                }
                .body-content {
                  font-size: 1.1rem;
                }
            `}</style>
    </article>
  )
}
export default PostDetails