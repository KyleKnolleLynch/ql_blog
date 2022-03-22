import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Meta, Layout } from '../components'
import { getBackgroundImage } from '../services'

const NotFound = ({ backgroundImage }) => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 4000)
  }, [])

  return (
    <Layout bgImg={backgroundImage[0].node.bgImg}>
      <Meta
        title='404'
        robots='robots'
        robotsContent='follow, noarchive, noindex'
      />
      <section className='container p-3 pb-24 rounded-lg md:p-8 md:pb-48'>
        <h1 className='text-4xl md:text-6xl mb-2'>404</h1>
        <h2 className='text-xl md:text-2xl mb-6'>Oops! This page does not exist.</h2>
        <p className='md:text-lg'>You will be redirected back to the <span className='cursor-pointer underline'><Link href='/'>Homepage</Link></span> in <time dateTime='PT4S'>four seconds</time>.</p>
      </section>
      <style jsx>{`
        section {
          background-color: var(--clr-gray-100);
          color: var(--clr-gray-800);
        }
      `}</style>
    </Layout>
  )
}
export default NotFound

export async function getStaticProps() {
  const backgroundImage = await getBackgroundImage()

  return {
    props: { backgroundImage }
  }
}