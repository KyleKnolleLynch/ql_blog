import { useState, useEffect, useRef } from 'react'
import { submitComment } from '../services'

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMsg, setShowSuccessMsg] = useState(false)
  const commentRef = useRef()
  const nameRef = useRef()
  const emailRef = useRef()
  const storeDataRef = useRef()

  useEffect(() => {
    nameRef.current.value = window.localStorage.getItem('name')
    emailRef.current.value = window.localStorage.getItem('email')
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    setError(false)

    const { value: comment } = commentRef.current
    const { value: name } = nameRef.current
    const { value: email } = emailRef.current
    const { checked: storeData } = storeDataRef.current

    if (!comment || !name || !email) {
      setError(true)
      return
    }

    const commentObj = { name, email, comment, slug }

    if (storeData) {
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    } else {
      window.localStorage.removeItem('name', name)
      window.localStorage.removeItem('email', email)
    }

    submitComment(commentObj).then(res => {
      setShowSuccessMsg(true)
      setTimeout(() => {
        setShowSuccessMsg(false)
      }, 3000)
    })

  }

  return (
    <article className='px-10 py-6 rounded'>
      <h2 className='text-xl font-semibold mb-8'>Leave a Comment</h2>
      <form className='grid grid-cols-1 lg:grid-cols-2 gap-2' onSubmit={handleSubmit}>
        <div>
          <textarea
            name='comment'
            ref={commentRef}
            className='w-full p-4 outline-none rounded-lg focus:ring-2 focus:ring-gray-300 bg-gray-200 text-gray-700'
            placeholder='Comment'
          />
        </div>
        <div>
          <input
            type='text'
            name='name'
            ref={nameRef}
            className='w-full py-2 px-4 mb-4 outline-none rounded-lg focus:ring-2 focus:ring-gray-300 bg-gray-200 text-gray-700'
            placeholder='Name'
          />
          <label htmlFor="name" className='sr-only'>Name</label>
          <input
            type='email'
            name='email'
            ref={emailRef}
            className='w-full py-2 px-4 mb-4 outline-none rounded-lg focus:ring-2 focus:ring-gray-300 bg-gray-200 text-gray-700'
            placeholder='Email'
          />
          <label htmlFor="email" className='sr-only'>Email</label>
        </div>
        {error && <p className='text-red-600'><small>Please complete all fields</small></p>}
        <div className='lg:col-span-2 mb-4 flex items-center'>
          <input type="checkbox" ref={storeDataRef} id='storeData' name='storeData' value='true' className='cursor-pointer' />
          <label htmlFor="storeData" className='text-gray-500 cursor-pointer ml-2'>Remember my name and email</label>
        </div>

        <div className='mb-4 lg:col-span-2 flex items-center'>
          <button
            type='submit'
            className='text-lg font-semibold text-gray-100 px-6 py-2 outline-none rounded-2xl transition-colors'
          >
            Post Comment
          </button>
          {showSuccessMsg && <span className='text-xl font-semibold text-green-500 mx-auto'>Comment submitted for review!</span>}
        </div>
      </form>
      <style jsx>{`
          article {
            background-color: var(--clr-gray-100);
          }
          form button {
            background-color: var(--clr-primary);
          }
          form button:hover {
            background-color: var(--clr-secondary);
          }
        `}</style>
    </article>
  )
}
export default CommentsForm