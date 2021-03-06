import Image from "next/image"

const Background = ({ bgImg }) => {
    // IMAGE WIDTH AND HEIGHT ALSO AVAILABLE IN THE bgImg PROPS OBJECT
    return (
        <div className='min-h-screen isolate fixed'>
            <div className='relative min-h-screen w-screen overflow-hidden'>
                {bgImg ? (
                    <Image
                        src={bgImg.url}
                        alt='background'
                        layout='fill'
                        objectFit='cover'
                        quality='100'
                        priority />
                ) : null}
            </div>
        </div>
    )
}

export default Background



