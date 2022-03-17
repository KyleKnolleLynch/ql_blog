import { useState, useEffect } from 'react'
import moment from 'moment'
import parse from 'html-react-parser'
import { getComments } from '../services'

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments(slug).then(res => setComments(res))
  }, [])

  return (
    <>
      {comments.length > 0 && (
        <article className='px-10 pt-6 pb-12 mb-8 shadow-lg rounded'>
          <h2 className='text-xl font-semibold mb-8 border-b pb-4'>{comments.length}{' '}Comments</h2>
          {comments.map(comment => (
            <div key={comment.createdAt} className='mb-6 pb-4 border-b border-gray-200'>
              <p>
                <span className='font-semibold'>{comment.name}</span><small className='ml-2'>posted on {moment(comment.createdAt).format('MMM DD, YYYY')}</small>
              </p>
              <p className='whitespace-pre-line text-gray-500 w-full'>{comment.comment}</p>
            </div>
          ))}
        </article>
      )}
      <style jsx>{`
        article {
          background-color: var(--clr-gray-100);
        }
      `}</style>
    </>
  )
}
export default Comments