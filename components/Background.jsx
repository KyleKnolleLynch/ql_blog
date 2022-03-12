import Image from "next/image"

const Background = () => {
    return (
        <div className='min-h-screen isolate fixed'>
            <div className='relative min-h-screen w-screen'>
                <Image
                    src='/fern_bg.jpg'
                    alt='fern_bg'
                    layout='fill'
                    objectFit='cover'
                    quality='100'
                    priority />
            </div>

        </div>
    )
}
export default Background