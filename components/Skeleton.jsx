const Skeleton = () => {
    return (
        <article className='skeleton-container shadow-lg rounded-lg p-1 lg:p-8 pb-20'>
            <div className='bg-gray-500 rounded-2xl py-20'></div>
            <div className='bg-gray-500 rounded-2xl max-w-md p-4 my-5'></div>
            <div className='bg-gray-500 rounded-2xl max-w-5xl my-5 py-2'></div>
            <div className='bg-gray-500 rounded-2xl max-w-5xl my-5 py-2'></div>
            <div className='bg-gray-500 rounded-2xl max-w-5xl my-5 py-2'></div>

            <style jsx>{`
            .skeleton-container {
                background-color: var(--clr-gray-100);
            }
        `}</style>
        </article>
    )
}
export default Skeleton