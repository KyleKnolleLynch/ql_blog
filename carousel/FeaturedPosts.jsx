import { useState, useEffect } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { FeaturedPostCard } from '../components'
import { getFeaturedPosts } from '../services'

const responsive = {
    xlDesktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 1024, min: 768 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 768, min: 640 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 640, min: 0 },
        items: 1,
    }
}

const FeaturedPosts = () => {
    const [featuredPostsArr, setFeaturedPostsArr] = useState([])
    const [dataLoaded, setDataLoaded] = useState(false)

    useEffect(() => {
        getFeaturedPosts().then(res => {
            setFeaturedPostsArr(res)
            setDataLoaded(true)
        })
    }, [])

    const customLeftArrow = (
        <div className='absolute left-0 text-center py-3 cursor-pointer rounded-full bg-red-500 text-blue-500 w-12'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left h-6 w-full text-white"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </div>
    )

    const customRightArrow = (
        <div className='absolute right-0 text-center py-3 cursor-pointer rounded-full bg-white text-blue-600 w-6 h-6'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
    )

    return (
        <section className='mb-8'>
            <Carousel
             infinite 
             customLeftArrow={customLeftArrow} 
             customRightArrow={customRightArrow} 
             responsive={responsive} 
             itemClass='px-4'
             >

                {dataLoaded && featuredPostsArr.map(post => (
                    <FeaturedPostCard key={post.title} post={post} />
                ))}
            </Carousel>
        </section>
    )
}
export default FeaturedPosts