import Image from "next/image"

const Background = () => {
    return (
        <div className='min-h-screen isolate fixed'>
            <div className='relative min-h-screen w-screen'>
                <Image
                    src='/bg_img.jpg'
                    alt='bg_img'
                    layout='fill'
                    objectFit='cover'
                    quality='100'
                    priority />
            </div>
        </div>
    )
}
export default Background