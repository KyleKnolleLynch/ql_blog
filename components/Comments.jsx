import { useState, useEffect, useRef } from 'react'

const Comments = ({ slug }) => {
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)
  const commentRef = useRef()
  const nameRef = useRef()
  const emailRef = useRef()
  const storeDataRef = useRef()

  return (
    <article className='px-10 py-6 rounded'>
      <h2 className='text-xl font-semibold mb-8'>Leave a Comment</h2>
        <form>
          <div>
            <textarea name="" id="" className='w-full p-4 outline-none '></textarea>
          </div>
        </form>
      <style jsx>{`
        article {
          background-color: var(--clr-gray-100);
        }
      `}</style>
    </article>
  )
}
export default Comments