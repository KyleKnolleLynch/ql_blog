import Image from "next/image"

const Background = () => {
    return (
        <div className='min-h-screen isolate fixed'>
            <div className='relative min-h-screen w-screen'>
                {/* <div className='image-wrapper absolute top-0 right-0 bottom-0 left-0'> */}
                    <Image
                        src='/fern_bg.jpg'
                        alt='fern_bg'
                        layout='fill'
                        objectFit='cover'
                        quality='100'
                        priority />
                {/* </div> */}
            </div>

        </div>
    )
}
export default Background