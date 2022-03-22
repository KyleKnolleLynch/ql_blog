import Head from 'next/head'
import { useState } from 'react'
import {
  Layout,
  PostCard,
  SidebarWidget,
  Categories,
  Skeleton,
} from '../components'
import { getPosts, getBackgroundImage } from '../services'
import FeaturedPosts from '../carousel/FeaturedPosts'

const Home = ({ posts, backgroundImage }) => {
  const [visible, setVisible] = useState(4)
  const [displayedPosts, setDisplayedPosts] = useState(posts)

  const showMorePosts = () => {
    visible < posts.length && setVisible(prev => prev + 4)
  }

  return (
    <Layout bgImg={backgroundImage[0].node.bgImg}>
      <Head>
        <title>QL Blog</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <FeaturedPosts />
      <div className='home-container grid grid-cols-1 gap-12 lg:grid-cols-12'>
        <section className='col-span-1 lg:col-span-8'>
          {!displayedPosts ? (
            <Skeleton />
          ) : (
            displayedPosts
              .slice(0, visible)
              .map(post => <PostCard key={post.node.title} post={post.node} />)
          )}
          {visible < displayedPosts.length && (
            <button
              type='button'
              onClick={showMorePosts}
              className='showMoreBtn mb-6 w-full rounded-lg py-2 font-semibold text-gray-100 lg:py-3 lg:text-lg'
            >
              Show More
            </button>
          )}
        </section>
        <section className='col-span-1 lg:col-span-4'>
          <div className='relative grid gap-y-10 lg:sticky lg:top-10'>
            <SidebarWidget />
            <Categories />
          </div>
        </section>
      </div>
      <style jsx>{`
        .home-container {
          color: var(--clr-gray-800);
        }
        .showMoreBtn {
          background-color: var(--clr-primary);
        }
      `}</style>
    </Layout>
  )
}

export async function getStaticProps() {
  const backgroundImage = await getBackgroundImage()
  const posts = (await getPosts()) || []

  return {
    props: { backgroundImage, posts },
  }
}

export default Home
